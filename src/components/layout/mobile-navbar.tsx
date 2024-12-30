import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";

import { NAVBAR } from "@/lib/site";

const MobileNavbar = () => {
  return (
    <div className="grid grid-cols-3 md:gap-2 gap-9 p-2 mb-2.5">
      <Separator className="hidden md:inline" />
      {NAVBAR.filter((item) => item.title !== "Setting").map((item) => (
        <NavbarItem key={item.title} link={item} />
      ))}
    </div>
  );
};

export default MobileNavbar;
