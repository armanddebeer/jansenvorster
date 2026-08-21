import type { TBrandLogo, TFeatureItem, TNavLink } from "@/types/site";

export const NAV_LINKS: TNavLink[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "BRANDS", href: "/brands" },
  { label: "WHY CHOOSE US", href: "/why-choose-us" },
  { label: "OUR SERVICES", href: "/services" },
  { label: "CONTACT US", href: "/contact-us" },
];

export const FEATURES: TFeatureItem[] = [
  {
    title: "ONE YEAR GUARANTEE",
    description: "A one-year guarantee on all manufacturer errors.",
    icon: "handshake",
  },
  {
    title: "PENSIONERS PACKAGES",
    description: "Special pensioner packages available (T&C’s apply).",
    icon: "user",
  },
  {
    title: "ONSITE LABORATORY",
    description: "Fitting lab and technician available at our Melkbosstrand branch.",
    icon: "microscope",
  },
  {
    title: "MEDICAL AIDS",
    description: "We are contracted with most Medical Aid service providers.",
    icon: "stethoscope",
  },
];

/** Homepage brand grid (20 logos). */
export const HOME_BRANDS: TBrandLogo[] = [
  { name: "Arnette", src: "/images/brands/arnette.png" },
  { name: "CAT", src: "/images/brands/cat.png" },
  { name: "Cube", src: "/images/brands/cube.png" },
  { name: "Etnia Barcelona", src: "/images/brands/etnia.png" },
  { name: "Emporio Armani", src: "/images/brands/ea.png" },
  { name: "eco", src: "/images/brands/eco.png" },
  { name: "Guess", src: "/images/brands/guess.png" },
  { name: "Jeep", src: "/images/brands/jeep.png" },
  { name: "Moonstone", src: "/images/brands/moonstone.png" },
  { name: "K'Nex", src: "/images/brands/knex.png" },
  { name: "Oakley", src: "/images/brands/oakley.png" },
  { name: "Polo Ralph Lauren", src: "/images/brands/polo.png" },
  { name: "WOOW", src: "/images/brands/woow.png" },
  { name: "Ray-Ban", src: "/images/brands/rayban.png" },
  { name: "Silhouette", src: "/images/brands/silhouette.png" },
  { name: "Sightique", src: "/images/brands/sightique.png" },
  { name: "Vogue", src: "/images/brands/vogue.png" },
  { name: "Moleskine", src: "/images/brands/moleskine.png" },
  { name: "William Morris", src: "/images/brands/william-morris.png" },
  { name: "Ted Baker London", src: "/images/brands/ted-baker.png" },
];

/** About / Brands page grid (18 logos — matches live Elementor pages). */
export const PAGE_BRANDS: TBrandLogo[] = [
  { name: "Arnette", src: "/images/brands/arnette.png" },
  { name: "CAT", src: "/images/brands/cat.png" },
  { name: "Cube", src: "/images/brands/cube.png" },
  { name: "Dolce & Gabbana", src: "/images/brands/dolce-gabbana.png" },
  { name: "Emporio Armani", src: "/images/brands/ea.png" },
  { name: "eco", src: "/images/brands/eco.png" },
  { name: "Guess", src: "/images/brands/guess.png" },
  { name: "Jeep", src: "/images/brands/jeep.png" },
  { name: "Moonstone", src: "/images/brands/moonstone.png" },
  { name: "Nike Vision", src: "/images/brands/nike.png" },
  { name: "Oakley", src: "/images/brands/oakley.png" },
  { name: "Oliviero Contini", src: "/images/brands/oliviero.png" },
  { name: "Play", src: "/images/brands/play.png" },
  { name: "Ray-Ban", src: "/images/brands/rayban.png" },
  { name: "Silhouette", src: "/images/brands/silhouette.png" },
  { name: "Sightique", src: "/images/brands/sightique.png" },
  { name: "Tokyotek", src: "/images/brands/tokyotek.png" },
  { name: "Vogue", src: "/images/brands/vogue.png" },
];

export const BRANDS_INTRO =
  "We stock various well-known brands that are personally selected by the Jansen Vorster team. Our main goal is to spend sufficient time with each patient to ensure the correct style of frame is selected. dispensing of spectacles and contact lenses. We strive to walk the extra mile with all of our patients.";

export const ABOUT_PARAGRAPHS = [
  "Jansen Vorster Optometrists is owned and managed by two qualified optometrists namely Mr. Frederik Jansen and Mrs. Mandre Vorster. We operate from two practices that are situated in Melkbosstrand and Atlantis Cape Town respectively.",
  "We are passionate about eyes and understand that your eyes are an integral part of connecting you to the visual world. We will therefore take every measure to ensure that your eyes are well taken care of. With over twenty-five years of combined experience, we offer a wide range of services, from eye examinations to fitting and dispensing of spectacles and contact lenses. We strive to walk the extra mile with all of our patients.",
];

export type TLocation = {
  name: string;
  tel: string;
  address: string;
  email: string;
  hours: string[];
  mapSrc: string;
};

export const LOCATIONS: TLocation[] = [
  {
    name: "ATLANTIS",
    tel: "021 572 6436",
    address: "Shop 51 Atlantis City Centre, Atlantis, Cape Town, 7349",
    email: "atlantis@jansenvorster.co.za",
    hours: [
      "Monday – Thursday: 09h00-18h00",
      "Friday: 09h00-18h00",
      "Saturday: 09h00-17h00",
      "Sunday’s & Public Holidays: Closed",
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.604013474499!2d18.490657815145465!3d-33.56366338074165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dccec41438be6bf%3A0xe3c754976e014592!2sAtlantis+City+Centre!5e0!3m2!1sen!2sza!4v1557824809493!5m2!1sen!2sza",
  },
  {
    name: "MELKBOSSTRAND",
    tel: "021 553 2153",
    address: "c/o 6th Avenue and Otto du Plessis, Melkbosstrand, 7441",
    email: "melkbos@jansenvorster.co.za",
    hours: [
      "Monday – Thursday: 08h30-17h30",
      "Friday: 08h00-17h00",
      "Saturday: 08h00-12h00",
      "Sunday’s & Public Holidays: Closed",
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.143259246101!2d18.439805215149892!3d-33.73111148069448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dccf4bae4877435%3A0xdd6cadb7037783e8!2s6th+Ave+%26+Otto+du+Plessis+Dr%2C+Melkbosstrand%2C+Cape+Town%2C+7441!5e0!3m2!1sen!2sza!4v1557824198500!5m2!1sen!2sza",
  },
];

export const FOOTER = {
  year: "2021",
  brandName: "Jansen & Vorster",
  floatingLabel: "Ciberbuy.com",
  floatingHref: "https://ciberbuy.com",
  privacyHref: "https://jansenvorster.co.za/privacy-policy",
  cookieHref: "https://jansenvorster.co.za/cookie-policy",
};
