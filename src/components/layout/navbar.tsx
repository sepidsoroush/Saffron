import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";

import { NAVBAR, siteConfig } from "@/lib/site";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-2 overflow-hidden">
      <div className="text-2xl font-semibold text-left py-4">
        <div className="flex flex-row justify-start items-center pl-4">
          <img src="/favicon.png" alt="logo" loading="lazy" className="w-8" />
          <span className="ml-2 text-3xl">{siteConfig.name}</span>
        </div>
      </div>

      <div className="space-y-2">
        {NAVBAR.map((item) => (
          <NavbarItem key={item.title} link={item} />
        ))}
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
