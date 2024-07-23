import { Separator } from "@/components/ui/separator";
import NavbarItem from "./navbar-item";

import { NAVBAR } from "@/lib/info";
import { Cookie } from "lucide-react";
import { Header } from "./header";

const Navbar = () => {
  return (
    <nav className="hidden md:flex flex-col gap-2">
      <Header>
        <div className="flex flex-row justify-start items-center">
          <Cookie size={20} />
          <span className="ml-2">Bite Board</span>
        </div>
      </Header>

      {NAVBAR.map((item) => (
        <NavbarItem key={item.title} link={item} />
      ))}
      <Separator />
    </nav>
  );
};

export default Navbar;
