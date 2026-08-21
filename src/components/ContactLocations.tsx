import type { TLocation } from "@/lib/site-data";

type TContactLocationsProps = {
  locations: TLocation[];
};

/**
 * Two-column branch contact info + embedded Google Maps.
 */
export function ContactLocations({ locations }: TContactLocationsProps) {
  return (
    <section className="w-full bg-white pb-12 pt-4 sm:pb-16">
      <div className="jv-container">
        <h1 className="mb-4 font-[family-name:var(--font-roboto)] text-[26px] font-semibold text-black uppercase sm:text-[34.16px]">
          CONTACT US
        </h1>
        <hr className="mb-8 border-0 border-t border-[#ddd] sm:mb-10" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {locations.map((loc) => (
            <article key={loc.name} className="min-w-0">
              <h2 className="mb-3 font-[family-name:var(--font-poppins)] text-[16px] font-bold text-black uppercase">
                {loc.name}
              </h2>
              <p className="mb-2 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#777]">
                Tel:{" "}
                <a href={`tel:${loc.tel.replaceAll(" ", "")}`} className="hover:text-jv-accent">
                  {loc.tel}
                </a>
              </p>
              <p className="mb-2 break-words font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#777]">
                Address: {loc.address}
              </p>
              <p className="mb-4 break-words font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#777]">
                <span className="font-bold text-black">Email:</span>{" "}
                <a href={`mailto:${loc.email}`} className="text-[#777] hover:text-jv-accent">
                  {loc.email}
                </a>
              </p>
              <h3 className="mb-2 font-[family-name:var(--font-poppins)] text-[15px] font-bold text-black">
                Business Hours
              </h3>
              {loc.hours.map((line) => (
                <p
                  key={line}
                  className="font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-[#777]"
                >
                  {line}
                </p>
              ))}
              <hr className="my-6 border-0 border-t border-[#ddd]" />
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eee] sm:aspect-[710/280]">
                <iframe
                  title={`${loc.name} map`}
                  src={loc.mapSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
