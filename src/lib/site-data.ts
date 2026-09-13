import type { TBrandLogo, TFeatureItem, TNavLink } from "@/types/site";

export const NAV_LINKS: TNavLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about-us" },
  { key: "brands", href: "/brands" },
  { key: "whyChoose", href: "/why-choose-us" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact-us" },
];

export const FEATURES: TFeatureItem[] = [
  { id: "guarantee", icon: "handshake" },
  { id: "pension", icon: "user" },
  { id: "lab", icon: "microscope" },
  { id: "medical", icon: "stethoscope" },
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
  "We stock well-known brands, personally selected by the Jansen Vorster team. We take time with each patient to find the right frame.";

export const ABOUT_PARAGRAPHS = [
  "Jansen Vorster Optometrists is proudly owned and managed by two qualified optometrists, Mr Frederik Jansen and Mrs Mandre Vorster. We have three practices conveniently located in Melkbosstrand, Milnerton and Atlantis, Cape Town.",
  "We are passionate about eye care and understand the vital role your vision plays in connecting you to the world around you. That’s why we are committed to providing personalised, professional care and taking every measure to ensure that your eyes receive the attention they deserve.",
  "With more than 30 years of combined experience, we offer a comprehensive range of optometric services, including professional eye examinations, spectacle fitting & dispensing, and contact lens services.",
  "At Jansen Vorster Optometrists, we believe in going the extra mile for every patient. Our goal is not only to help you see better, but to ensure that you receive exceptional care in a welcoming and professional environment.",
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
  {
    name: "MILNERTON",
    tel: "021 552 4571",
    address: "Shop 2B, The Paddocks Centre, Racecourse Rd, Milnerton, Cape Town, 7441",
    email: "milnerton@jansenvorster.co.za",
    hours: [
      "Monday – Friday: 09h00-17h00",
      "Saturday: 09h00-13h00",
      "Public Holidays: 09h00-13h00",
      "Sunday: Closed",
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.5!2d18.5028064!3d-33.8621653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5c%3A0x0!2sThe+Paddocks+Shopping+Centre%2C+Racecourse+Rd%2C+Milnerton!5e0!3m2!1sen!2sza!4v1557824809493!5m2!1sen!2sza",
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
