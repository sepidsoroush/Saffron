import CallToAction from "@/components/marketing/cta";
import { SiteFooter } from "@/components/marketing/site-footer";
import { MarketingNavbar } from "@/components/marketing/marketing-navbar";
import { Features } from "@/components/marketing/features";

export default function MarketingPage() {
  return (
    <main className="w-full md:ml-[220px] md:mb-0 flex-1 overflow-auto">
      <MarketingNavbar />

      <CallToAction />

      <Features />

      <SiteFooter />
    </main>
  );
}
