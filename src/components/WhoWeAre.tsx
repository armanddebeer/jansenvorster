type TWhoWeAreProps = {
  title: string;
  body: string;
};

/**
 * Centered intro block matching Elementor inner section 88ae1a5.
 */
export function WhoWeAre({ title, body }: TWhoWeAreProps) {
  return (
    <section className="w-full bg-white pt-[50px] pb-[30px]">
      <div className="jv-container max-w-[1120px] text-center">
        <h1 className="mb-[30px] font-[family-name:var(--font-roboto)] text-[28px] font-medium leading-[1.2] text-black uppercase sm:text-[34.16px] sm:leading-[40.992px]">
          {title}
        </h1>
        <p className="mx-auto max-w-[900px] px-[25px] font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-black">
          {body}
        </p>
      </div>
    </section>
  );
}
