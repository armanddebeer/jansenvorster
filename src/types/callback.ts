/**
 * Payload for the Request a Callback form / Resend API.
 */
export type TCallbackRequest = {
  name: string;
  phone: string;
  email?: string;
  assistance: string;
};

/**
 * JSON response from `/api/callback`.
 */
export type TCallbackResponse = {
  ok: boolean;
  message: string;
};
