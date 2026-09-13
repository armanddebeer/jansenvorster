/**
 * Payload for the Request a Callback / Get in Touch forms sent through Resend.
 */
export type TCallbackRequest = {
  name: string;
  phone: string;
  email: string;
  practice: string;
  preferredTime: string;
  message: string;
};

/**
 * JSON response from `/api/callback`.
 */
export type TCallbackResponse = {
  ok: boolean;
  message: string;
};

/** Preferred callback windows shown on the enquiry form. */
export const PREFERRED_TIMES = [
  "Morning (09h00–12h00)",
  "Afternoon (12h00–15h00)",
  "Late afternoon (15h00–17h00)",
  "Saturday morning",
] as const;
