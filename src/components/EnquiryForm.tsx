"use client";

import { type FormEvent, useId } from "react";
import { useI18n } from "@/components/LocaleProvider";
import { LOCATIONS } from "@/lib/site-data";
import { PREFERRED_TIMES } from "@/types/callback";
import { toDisplayHeading } from "@/lib/utils";

export type TEnquiryValues = {
  name: string;
  phone: string;
  email: string;
  practice: string;
  preferredTime: string;
  message: string;
};

type TEnquiryFormProps = {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  compact?: boolean;
  submitLabel?: string;
  onSubmitValues: (values: TEnquiryValues) => void | Promise<void>;
};

const FIELD_CLASS =
  "h-12 w-full border border-[#d8d2c8] bg-white px-3 text-[15px] text-jv-ink outline-none transition-colors focus:border-jv-accent";

const COMPACT_FIELD_CLASS =
  "h-9 w-full border border-[#d8d2c8] bg-white px-2.5 text-[13px] text-jv-ink outline-none transition-colors focus:border-jv-accent";

/**
 * Shared enquiry fields used by the page callback form and the Get in Touch dialog.
 */
export function EnquiryForm({
  status,
  errorMessage,
  compact = false,
  submitLabel,
  onSubmitValues,
}: TEnquiryFormProps) {
  const id = useId();
  const { t } = useI18n();

  const inputClass = compact ? COMPACT_FIELD_CLASS : FIELD_CLASS;
  const labelClass = compact
    ? "mb-1 block text-[11px] font-medium tracking-[0.04em] text-jv-ink"
    : "mb-2 block text-[13px] font-medium tracking-[0.04em] text-jv-ink";
  const actionLabel = submitLabel ?? t.form.send;

  /**
   * Collects and forwards the detailed enquiry payload.
   */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmitValues({
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      practice: String(data.get("practice") ?? ""),
      preferredTime: String(data.get("preferredTime") ?? ""),
      message: String(data.get("message") ?? ""),
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div
        className={
          compact
            ? "grid grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2"
            : "grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2"
        }
      >
        <Field
          id={`${id}-name`}
          label={t.form.name}
          name="name"
          type="text"
          required
          inputClass={inputClass}
          labelClass={labelClass}
        />
        <Field
          id={`${id}-phone`}
          label={t.form.phone}
          name="phone"
          type="tel"
          required
          inputClass={inputClass}
          labelClass={labelClass}
        />
        <Field
          id={`${id}-email`}
          label={t.form.email}
          name="email"
          type="email"
          required
          inputClass={inputClass}
          labelClass={labelClass}
        />
        <label className="block" htmlFor={`${id}-practice`}>
          <span className={labelClass}>
            {t.form.practice}
            <span className="text-jv-accent">*</span>
          </span>
          <select id={`${id}-practice`} name="practice" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {t.form.selectBranch}
            </option>
            {LOCATIONS.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {toDisplayHeading(loc.name)}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2" htmlFor={`${id}-time`}>
          <span className={labelClass}>
            {t.form.preferredTime}
            <span className="text-jv-accent">*</span>
          </span>
          <select
            id={`${id}-time`}
            name="preferredTime"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {t.form.selectTime}
            </option>
            {PREFERRED_TIMES.map((time) => (
              <option key={time} value={time}>
                {t.form.times[time]}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2" htmlFor={`${id}-message`}>
          <span className={labelClass}>
            {t.form.message}
            <span className="text-jv-accent">*</span>
          </span>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={compact ? 2 : 5}
            className={
              compact
                ? "h-14 w-full resize-none border border-[#d8d2c8] bg-white px-2.5 py-2 text-[13px] text-jv-ink outline-none transition-colors focus:border-jv-accent"
                : "w-full border border-[#d8d2c8] bg-white px-3 py-3 text-[15px] text-jv-ink outline-none transition-colors focus:border-jv-accent"
            }
          />
        </label>
      </div>

      {status === "error" && errorMessage ? (
        <p className="mt-3 text-[13px] text-[#c00]" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className={
          compact
            ? "jv-btn mt-4 h-10 min-h-10 px-4 text-[11px] disabled:opacity-60"
            : "jv-btn mt-8 disabled:opacity-60"
        }
      >
        {status === "loading" ? t.form.sending : actionLabel}
      </button>
    </form>
  );
}

type TFieldProps = {
  id: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
  inputClass: string;
  labelClass: string;
};

/**
 * Labelled text input matching the restyle.
 */
function Field({ id, label, name, type, required, inputClass, labelClass }: TFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className={labelClass}>
        {label}
        {required ? <span className="text-jv-accent">*</span> : null}
      </span>
      <input id={id} name={name} type={type} required={required} className={inputClass} />
    </label>
  );
}
