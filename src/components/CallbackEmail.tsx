type TCallbackEmailProps = {
  name: string;
  phone: string;
  email: string;
  practice: string;
  preferredTime: string;
  message: string;
};

/**
 * HTML email body for an enquiry sent through Resend.
 */
export function CallbackEmail({
  name,
  phone,
  email,
  practice,
  preferredTime,
  message,
}: TCallbackEmailProps) {
  return (
    <div>
      <h2>New enquiry from the website</h2>
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
        <strong>Practice:</strong> {practice}
      </p>
      <p>
        <strong>Preferred time:</strong> {preferredTime}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p>{message}</p>
    </div>
  );
}
