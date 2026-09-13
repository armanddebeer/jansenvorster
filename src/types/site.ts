/**
 * Shared content types for the Jansen & Vorster homepage clone.
 */

export type TNavLink = {
  key: "home" | "about" | "brands" | "whyChoose" | "services" | "contact";
  href: string;
};

export type TFeatureItem = {
  id: "guarantee" | "pension" | "lab" | "medical";
  icon: "handshake" | "user" | "microscope" | "stethoscope";
};

export type TBrandLogo = {
  name: string;
  src: string;
};
