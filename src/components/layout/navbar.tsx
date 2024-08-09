import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";
import { Header } from "./header";

import { NAVBAR } from "@/lib/site";
import { Cookie } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="hidden md:flex flex-col gap-2 overflow-hidden">
      <Header className="md:w-[220px] border-r">
        <div className="flex flex-row justify-start items-center">
          <Cookie size={20} />
          <span className="ml-2">Bite Board</span>
        </div>
      </Header>

      <div className="mt-[72px]">
        {NAVBAR.map((item) => (
          <NavbarItem key={item.title} link={item} />
        ))}
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
