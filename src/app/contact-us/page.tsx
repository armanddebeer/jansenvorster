import type { Metadata } from "next";
import { CallbackForm } from "@/components/CallbackForm";
import { ContactLocations } from "@/components/ContactLocations";
import { SiteShell } from "@/components/SiteShell";
import { LOCATIONS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us - Jansen & Vorster",
  description:
    "Contact Jansen & Vorster Optometrists in Atlantis and Melkbosstrand, Cape Town.",
};

/**
 * Contact Us page with branch details, maps, and the Resend callback form.
 */
export default function ContactUsPage() {
  return (
    <SiteShell>
      <div className="pt-10">
        <ContactLocations locations={LOCATIONS} />
      </div>
      <CallbackForm />
    </SiteShell>
  );
}
