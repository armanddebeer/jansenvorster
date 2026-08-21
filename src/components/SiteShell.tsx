import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FOOTER, NAV_LINKS } from "@/lib/site-data";

type TSiteShellProps = {
  children: React.ReactNode;
};

/**
 * Shared chrome for all pages — header + copyright footer.
 */
export function SiteShell({ children }: TSiteShellProps) {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />
      <main className="flex-1">{children}</main>
      <SiteFooter {...FOOTER} />
    </>
  );
}
