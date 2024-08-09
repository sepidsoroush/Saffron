import CallToAction from "@/components/marketing/cta";
import { SiteFooter } from "@/components/marketing/site-footer";
import { MarketingNavbar } from "@/components/marketing/marketing-navbar";

export default function MarketingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <MarketingNavbar />
      <section className="flex-1 space-y-4">
        <CallToAction />
      </section>
      <SiteFooter />
    </div>
  );
}
