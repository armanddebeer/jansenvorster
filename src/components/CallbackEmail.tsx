type TCallbackEmailProps = {
  name: string;
  phone: string;
  email: string;
  assistance: string;
};

/**
 * HTML email body for a “Request a Callback” submission sent through Resend.
 */
export function CallbackEmail({
  name,
  phone,
  email,
  assistance,
}: TCallbackEmailProps) {
  return (
    <div>
      <h2>New callback request</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Assistance needed:</strong>
      </p>
      <p>{assistance}</p>
    </div>
  );
}
