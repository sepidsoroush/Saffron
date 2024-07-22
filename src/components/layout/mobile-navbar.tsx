import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";

import { NAVBAR } from "@/lib/info";

const MobileNavbar = () => {
  return (
    <nav className="grid grid-cols-4 gap-2 p-2 w-full">
      <Separator className="hidden md:inline" />
      {NAVBAR.map((item) => (
        <NavbarItem key={item.title} link={item} />
      ))}
    </nav>
  );
};

export default MobileNavbar;
