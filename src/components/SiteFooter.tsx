import Link from "next/link";

type TSiteFooterProps = {
  year: string;
  brandName: string;
  floatingLabel: string;
  floatingHref: string;
  privacyHref: string;
  cookieHref: string;
};

/**
 * Visible copyright bar only — matches live site where the upper footer widget is collapsed (height 0).
 * Preserves original "Cooke" spelling for 1:1 fidelity.
 */
export function SiteFooter({
  year,
  brandName,
  floatingLabel,
  floatingHref,
  privacyHref,
  cookieHref,
}: TSiteFooterProps) {
  return (
    <footer className="w-full bg-jv-footer">
      <div className="flex min-h-[80px] items-center justify-center px-4 py-5 text-center">
        <p className="max-w-[720px] break-words font-[family-name:var(--font-poppins)] text-[12px] font-light leading-6 text-white/90 sm:text-[14px]">
          ©{year} {brandName}. Floating on{" "}
          <a
            href={floatingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            {floatingLabel}
          </a>
          .{" "}
          <Link href={privacyHref} className="text-white hover:underline">
            Privacy Policy
          </Link>
          .{" "}
          <Link href={cookieHref} className="text-white hover:underline">
            Cooke Policy
          </Link>
          .{" "}
          <Link href={cookieHref} className="text-white hover:underline">
            Cooke Settings
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
