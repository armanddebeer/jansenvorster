type TServiceBlock = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  afterBullets?: string[];
};

const SERVICES: TServiceBlock[] = [
  {
    title: "1. Eye Screening",
    paragraphs: [
      "An eye screening determines whether you may need spectacles, by identifying possible visual impairment or eye conditions that are likely to lead to vision loss.",
      "Jansen Vorster Optometrists offer visual screenings to children and adults to ensure early detection. Furthermore, the following screenings are available:",
    ],
    bullets: ["Driver’s license screenings", "Forklift Licence Screenings"],
    afterBullets: [
      "For any screenings, please contact our reception for availability with one of our optometrists to avoid disappointment.",
    ],
  },
  {
    title: "2. Eye Test / Examination",
    paragraphs: [
      "A comprehensive eye test (examination) is recommended every two years for adults and every year for contact lens wearers & children (7 to 18 years) to monitor ocular health.",
      "An eye test will typically consist of the following:",
    ],
    bullets: [
      "Case History",
      "Ocular health check including a glaucoma screening",
      "Fundus investigation – We are equipped with handheld fundus cameras to assist with assessing retinal health. As such many systemic diseases have ocular manifestations.",
      "Corneal Topography (if required) – Diagnosis of corneal disease i.e. Keratoconus and/or virtual fittings of contact lenses.",
      "Refraction – Determining the prescription for possible spectacles or contact lenses.",
      "Binocular Vision Testing",
      "Feedback on the obtained test results & advice on all possible corrective options available. This also includes referrals to eye specialists when required.",
      "Patient education on different lens attributes.",
      "Assistance in frame selection, lenses and quotations.",
    ],
  },
  {
    title: "3. Contact Lens Consultation",
    paragraphs: ["A contact lens consultation will typically consist of the following:"],
    bullets: [
      "Case History",
      "Assessment of tear function",
      "Conjunctival and corneal check",
      "Staining with fluorescein to assess eye health",
      "Discussion of options available",
      "Fitting of trial lenses",
      "Instruction on caring for your eyes and lenses",
      "A trial period to give you time to adapt to your lenses",
    ],
  },
  {
    title: "4. Hard Contact Lenses",
    paragraphs: [],
    bullets: [
      "The need for hard contact lenses will be determined during a contact lens consultation",
      "This service is mainly provided from the Melkbosstrand branch",
      "A thorough discussion will take place before ordering a trial set of lenses",
      "Multiple consultations might be necessary in order to finalise the final lens fitting",
    ],
  },
  {
    title: "5. On-Site Lens Laboratory",
    paragraphs: [
      "Jansen Vorster Optometrists are fortunate to have an on-site optical laboratory at the Melkbosstrand practice where our technician/optical dispenser is available to provide the following services:",
    ],
    bullets: [
      "Fitting of spectacle lenses",
      "Spectacle maintenance and repairs",
      "Personal assistance with specific lens and frame selection",
    ],
  },
  {
    title: "6. Low Vision",
    paragraphs: [
      "Low Vision is our leading area of expertise.",
      "We supply a wide range of optical magnifiers from Eschenbach and Schweizer. All magnifiers are available at the Melkbosstrand practice for anyone to view.",
      "We can also fit and supply Bioptics, also known as Bioptic telescopes, which is a term for a pair of vision-enhancement lenses with telescopes that have extreme magnification. Bioptic telescopes are used to improve distance vision for people with impaired eyesight.",
    ],
  },
];

/**
 * Services page body matching the live Elementor text-editor content.
 */
export function ServicesContent() {
  return (
    <section className="w-full bg-white py-8 pb-12 sm:py-10 sm:pb-16">
      <div className="jv-container max-w-[900px]">
        <h1 className="mb-4 font-[family-name:var(--font-roboto)] text-[26px] font-semibold text-black uppercase sm:text-[34.16px]">
          OUR SERVICES
        </h1>
        <p className="mb-6 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#555]">
          Jansen Vorster Optometrists offers the following services.
        </p>

        {SERVICES.map((service, index) => (
          <div key={service.title}>
            {index > 0 ? <hr className="my-8 border-0 border-t border-[#ddd]" /> : null}
            <h2 className="mb-3 font-[family-name:var(--font-poppins)] text-[15px] font-bold text-black">
              {service.title}
            </h2>
            {service.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-3 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#555]"
              >
                {p}
              </p>
            ))}
            {service.bullets?.length ? (
              <ul className="mb-3 space-y-1 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#555]">
                {service.bullets.map((b) => (
                  <li key={b.slice(0, 50)}>– {b}</li>
                ))}
              </ul>
            ) : null}
            {service.afterBullets?.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-3 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#555]"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
