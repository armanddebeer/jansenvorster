"use client";

import { useState } from "react";
import { EnquiryForm, type TEnquiryValues } from "@/components/EnquiryForm";
import { useI18n } from "@/components/LocaleProvider";
import { submitEnquiry } from "@/lib/submit-enquiry";

/**
 * Request a Callback form — posts to `/api/callback` (Resend).
 */
export function CallbackForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  /**
   * Sends the detailed callback request to the selected practice.
   */
  async function onSubmitValues(values: TEnquiryValues) {
    setStatus("loading");
    setMessage("");

    try {
      const json = await submitEnquiry(values);
      if (!json.ok) {
        setStatus("error");
        setMessage(json.message || t.form.errorGeneric);
        return;
      }

      setStatus("success");
      setMessage(json.message);
    } catch {
      setStatus("error");
      setMessage(t.form.errorNetwork);
    }
  }

  return (
    <section className="w-full bg-jv-paper px-4 py-20 sm:py-24">
      <div className="jv-container max-w-[760px]">
        <p className="jv-kicker mb-4 text-center">{t.form.appointments}</p>
        <h2 className="jv-display mb-12 text-center text-4xl sm:text-5xl">
          {t.form.callback}
        </h2>

        {status === "success" ? (
          <p className="text-center text-[16px] text-jv-ink">{message}</p>
        ) : (
          <EnquiryForm
            status={status}
            errorMessage={message}
            submitLabel={t.form.request}
            onSubmitValues={onSubmitValues}
          />
        )}
      </div>
    </section>
  );
}
