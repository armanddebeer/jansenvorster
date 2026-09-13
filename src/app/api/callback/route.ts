import { CallbackEmail } from "@/components/CallbackEmail";
import { emailForPractice } from "@/lib/enquiry";
import type { TCallbackRequest, TCallbackResponse } from "@/types/callback";
import { PREFERRED_TIMES } from "@/types/callback";
import { Resend } from "resend";

const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sends an enquiry to the selected practice via Resend.
 * Requires RESEND_API_KEY and RESEND_FROM (or RESEND_FROM_EMAIL).
 */
export async function POST(request: Request) {
  try {
    let body: Partial<TCallbackRequest>;
    try {
      body = (await request.json()) as Partial<TCallbackRequest>;
    } catch {
      return jsonResponse({ ok: false, message: "Invalid request." }, 400);
    }

    const name = trimField(body.name);
    const phone = trimField(body.phone);
    const email = trimField(body.email);
    const practice = trimField(body.practice);
    const preferredTime = trimField(body.preferredTime);
    const message = trimField(body.message, MAX_MESSAGE_LENGTH);

    if (!name || !phone || !email || !practice || !preferredTime || !message) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Please fill in your name, phone, email, preferred practice, preferred time, and message.",
        },
        400
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return jsonResponse(
        { ok: false, message: "Please enter a valid email address." },
        400
      );
    }

    if (!(PREFERRED_TIMES as readonly string[]).includes(preferredTime)) {
      return jsonResponse(
        { ok: false, message: "Please choose a preferred time from the list." },
        400
      );
    }

    const to = emailForPractice(practice);
    if (!to) {
      return jsonResponse(
        { ok: false, message: "Please choose Atlantis, Melkbosstrand or Milnerton." },
        400
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return jsonResponse(
        {
          ok: false,
          message: "Email service is not configured. Please try again later.",
        },
        503
      );
    }

    const from = process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL;
    if (!from) {
      console.error("RESEND_FROM / RESEND_FROM_EMAIL is not configured");
      return jsonResponse(
        {
          ok: false,
          message: "Email service is not configured. Please try again later.",
        },
        503
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Website enquiry for ${practice} from ${name}`,
      react: CallbackEmail({
        name,
        phone,
        email,
        practice,
        preferredTime,
        message,
      }),
      text: [
        "New website enquiry",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Practice: ${practice}`,
        `Preferred time: ${preferredTime}`,
        `Message: ${message}`,
      ].join("\n"),
      tags: [{ name: "category", value: "callback" }],
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonResponse(
        {
          ok: false,
          message: "Could not send your request. Please try again shortly.",
        },
        500
      );
    }

    return jsonResponse({
      ok: true,
      message: `Thank you. We have emailed the ${practice.toLowerCase()} practice and will be in touch.`,
    });
  } catch (err) {
    console.error("Callback API error:", err);
    return jsonResponse(
      { ok: false, message: "Something went wrong. Please try again." },
      500
    );
  }
}

/**
 * Trims a form field and caps length so a single submission cannot flood the inbox.
 */
function trimField(value: string | undefined, max = MAX_FIELD_LENGTH) {
  const trimmed = value?.trim() ?? "";
  if (trimmed.length > max) {
    return trimmed.slice(0, max);
  }
  return trimmed;
}

/**
 * JSON response helper that keeps the callback payload typed.
 */
function jsonResponse(payload: TCallbackResponse, status = 200) {
  return Response.json(payload, { status });
}
