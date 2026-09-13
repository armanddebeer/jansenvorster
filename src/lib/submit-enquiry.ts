import type { TCallbackRequest, TCallbackResponse } from "@/types/callback";

/**
 * Posts an enquiry to the server-side Resend route.
 */
export async function submitEnquiry(
  values: TCallbackRequest
): Promise<TCallbackResponse> {
  const res = await fetch("/api/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return (await res.json()) as TCallbackResponse;
}
