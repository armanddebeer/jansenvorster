type TImportantMessageProps = {
  title: string;
  body: string;
  email: string;
};

/**
 * Orange announcement banner matching Elementor section 2969eab.
 */
export function ImportantMessage({ title, body, email }: TImportantMessageProps) {
  return (
    <section className="w-full bg-jv-accent px-4 py-10 text-center text-white sm:py-[50px]">
      <div className="mx-auto max-w-[570px]">
        <h3 className="mb-2 font-[family-name:var(--font-roboto)] text-[20px] font-medium leading-tight text-white sm:text-[24px]">
          {title}
        </h3>
        <p className="break-words font-[family-name:var(--font-roboto)] text-[14px] font-normal leading-6 text-white sm:text-[16px] sm:leading-7">
          {body}{" "}
          <a
            href={`mailto:${email}`}
            className="text-white underline-offset-2 hover:underline"
            title={`mailto:${email}`}
          >
            {email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
