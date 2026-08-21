import { CallbackEmail } from "@/components/CallbackEmail";
import type { TCallbackRequest, TCallbackResponse } from "@/types/callback";
import { Resend } from "resend";

const MAX_FIELD_LENGTH = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sends a callback request email via Resend.
 * Requires RESEND_API_KEY. Optional CALLBACK_TO_EMAIL / RESEND_FROM_EMAIL.
 */
export async function POST(request: Request) {
  try {
    let body: Partial<TCallbackRequest>;
    try {
      body = (await request.json()) as Partial<TCallbackRequest>;
    } catch {
      return jsonResponse(
        { ok: false, message: "Invalid request." },
        400
      );
    }

    const name = trimField(body.name);
    const phone = trimField(body.phone);
    const email = trimField(body.email);
    const assistance = trimField(body.assistance);

    if (!name || !phone || !assistance) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Please fill in your name, phone number, and what you need help with.",
        },
        400
      );
    }

    if (email && !EMAIL_PATTERN.test(email)) {
      return jsonResponse(
        { ok: false, message: "Please enter a valid email address." },
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

    const to = process.env.CALLBACK_TO_EMAIL ?? "melkbos@jansenvorster.co.za";
    const from = process.env.RESEND_FROM_EMAIL;

    if (!from) {
      console.error("RESEND_FROM_EMAIL is not configured");
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
      replyTo: email || undefined,
      subject: `Callback request from ${name}`,
      react: CallbackEmail({
        name,
        phone,
        email: email || "—",
        assistance,
      }),
      text: [
        "New callback request",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "—"}`,
        `Assistance needed: ${assistance}`,
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
      message: "Thank you. We will call you back shortly.",
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
 * Trims a form field and rejects values that exceed the length cap.
 */
function trimField(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (trimmed.length > MAX_FIELD_LENGTH) {
    return trimmed.slice(0, MAX_FIELD_LENGTH);
  }
  return trimmed;
}

/**
 * JSON response helper that keeps the callback payload typed.
 */
function jsonResponse(payload: TCallbackResponse, status = 200) {
  return Response.json(payload, { status });
}
