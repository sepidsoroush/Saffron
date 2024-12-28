import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";

import { NAVBAR } from "@/lib/site";

const MobileNavbar = () => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 w-full border-t">
      <Separator className="hidden md:inline" />
      {NAVBAR.filter((item) => item.title !== "Setting").map((item) => (
        <NavbarItem key={item.title} link={item} />
      ))}
    </div>
  );
};

export default MobileNavbar;
