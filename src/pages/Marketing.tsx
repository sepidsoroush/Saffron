import CallToAction from "@/components/marketing/cta";
import { SiteFooter } from "@/components/marketing/site-footer";
import { MarketingNavbar } from "@/components/marketing/marketing-navbar";
import { Features } from "@/components/marketing/features";

export default function MarketingPage() {
  return (
    <main className="w-full  flex-1 overflow-y-auto overflow-x-hidden">
      <MarketingNavbar />
      <CallToAction />
      <Features />
      <SiteFooter />
    </main>
  );
}
