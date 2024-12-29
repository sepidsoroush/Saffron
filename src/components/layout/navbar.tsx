import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";
import { Header } from "./header";

import { NAVBAR, siteConfig } from "@/lib/site";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-2 overflow-hidden">
      <Header className="md:w-[220px] border-r pl-4">
        <div className="flex flex-row justify-start items-center">
          <img src="/favicon.png" alt="logo" loading="lazy" className="w-8" />
          <span className="ml-2">{siteConfig.name}</span>
        </div>
      </Header>

      <div className=" space-y-2">
        {NAVBAR.map((item) => (
          <NavbarItem key={item.title} link={item} />
        ))}
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
