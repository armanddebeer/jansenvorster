"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EnquiryForm, type TEnquiryValues } from "@/components/EnquiryForm";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { useI18n } from "@/components/LocaleProvider";
import { useGetInTouch } from "@/components/GetInTouchProvider";

/**
 * Cream Get in Touch dialog. Does not navigate away; Escape or overlay closes it.
 */
export function GetInTouchModal() {
  const { open, closeModal } = useGetInTouch();
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    /**
     * Closes the dialog when the visitor presses Escape.
     */
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeModal();
    }

    window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setMessage("");
    }
  }, [open]);

  /**
   * Sends the enquiry to the chosen practice, then shows a short confirmation.
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
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={t.form.closeAria}
            className="absolute inset-0 bg-jv-ink/40"
            onClick={closeModal}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-in-touch-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                closeModal();
              }
            }}
            className="relative z-10 w-full max-h-[calc(100dvh-1.5rem)] max-w-[34rem] overflow-y-auto bg-jv-paper p-5 shadow-[0_18px_50px_rgba(28,25,23,0.18)] sm:p-6"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 text-[11px] uppercase tracking-[0.14em] text-jv-text transition-colors hover:text-jv-accent"
            >
              {t.form.close}
            </button>
            <p className="jv-kicker mb-1">{t.form.contactKicker}</p>
            <h2 id="get-in-touch-title" className="jv-display mb-1 text-[1.75rem] leading-tight sm:text-[2rem]">
              {t.form.getInTouch}
            </h2>
            <p className="mb-4 text-[13px] font-light leading-5 text-jv-text">
              {t.form.intro}
            </p>

            {status === "success" ? (
              <p className="text-[16px] text-jv-ink">{message}</p>
            ) : (
              <EnquiryForm
                compact
                status={status}
                errorMessage={message}
                submitLabel={t.form.send}
                onSubmitValues={onSubmitValues}
              />
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
