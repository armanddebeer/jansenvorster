import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMicroscope, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const ICON_MAP = {
  handshake: faHandshake,
  user: faUser,
  microscope: faMicroscope,
  stethoscope: faStethoscope,
} as const;

export type TFeatureIconName = keyof typeof ICON_MAP;

type TFeatureIconProps = {
  name: TFeatureIconName;
  className?: string;
};

/**
 * Feature icons matching Font Awesome classes used on the live Elementor site.
 */
export function FeatureIcon({ name, className }: TFeatureIconProps) {
  const icon: IconDefinition = ICON_MAP[name];
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={{ width: "1em", height: "1em" }}
      aria-hidden
    />
  );
}

/**
 * Mobile hamburger / close icons for the responsive nav.
 */
export function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {open ? (
        <path
          d="M1 1L21 15M21 1L1 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M0 1H22" stroke="currentColor" strokeWidth="2" />
          <path d="M0 8H22" stroke="currentColor" strokeWidth="2" />
          <path d="M0 15H22" stroke="currentColor" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
