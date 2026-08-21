"use client";

import { useState, type FormEvent } from "react";
import type { TCallbackResponse } from "@/types/callback";

/**
 * Request a Callback form — posts to `/api/callback` (Resend).
 */
export function CallbackForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  /**
   * Submits the form payload to the Resend-backed API route.
   */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          assistance: String(data.get("assistance") ?? ""),
        }),
      });

      const json = (await res.json()) as TCallbackResponse;
      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessage(json.message || "Could not send your request.");
        return;
      }

      setStatus("success");
      setMessage(json.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section className="w-full bg-[#efefef] px-4 py-12 sm:py-16">
      <div className="jv-container max-w-[900px]">
        <h2 className="mb-8 text-center font-[family-name:var(--font-roboto)] text-[24px] font-semibold uppercase tracking-wide text-jv-accent sm:mb-10 sm:text-[34px]">
          REQUEST A CALLBACK
        </h2>

        {status === "success" ? (
          <p className="text-center font-[family-name:var(--font-poppins)] text-[15px] text-black">
            {message}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto max-w-[760px]" noValidate>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <Field label="Your Name" required name="name" type="text" />
              <Field label="Phone Number" required name="phone" type="tel" />
              <Field label="Email (Optional)" name="email" type="email" />
              <Field
                label="What do you need assistance with?"
                required
                name="assistance"
                type="text"
              />
            </div>

            {status === "error" && message ? (
              <p className="mt-5 font-[family-name:var(--font-poppins)] text-[14px] text-[#c00]" role="alert">
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 inline-flex min-w-[120px] items-center justify-center border border-[#333] bg-white px-6 py-2.5 font-[family-name:var(--font-poppins)] text-[14px] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

type TFieldProps = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
};

/**
 * Labeled Gravity Forms–style text input.
 */
function Field({ label, name, type, required }: TFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-[family-name:var(--font-poppins)] text-[14px] font-normal text-[#333]">
        {label}
        {required ? <span className="text-[#c00]">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-[42px] w-full rounded-[3px] border border-[#7e8993] bg-white px-3 font-[family-name:var(--font-poppins)] text-[14px] text-black outline-none focus:border-jv-accent"
      />
    </label>
  );
}
