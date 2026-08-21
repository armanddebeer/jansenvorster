/**
 * Shared content types for the Jansen & Vorster homepage clone.
 */

export type TNavLink = {
  label: string;
  href: string;
};

export type TFeatureItem = {
  title: string;
  description: string;
  icon: "handshake" | "user" | "microscope" | "stethoscope";
};

export type TBrandLogo = {
  name: string;
  src: string;
};
