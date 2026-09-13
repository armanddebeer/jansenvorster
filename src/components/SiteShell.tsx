import { CookieConsent } from "@/components/CookieConsent";
import { GetInTouchModal } from "@/components/GetInTouchModal";
import { GetInTouchProvider } from "@/components/GetInTouchProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type TSiteShellProps = {
  children: React.ReactNode;
};

/**
 * Shared chrome for all pages — header, footer, cookie notice, Get in Touch dialog.
 */
export function SiteShell({ children }: TSiteShellProps) {
  return (
    <LocaleProvider>
      <GetInTouchProvider>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <GetInTouchModal />
        <CookieConsent />
      </GetInTouchProvider>
    </LocaleProvider>
  );
}
