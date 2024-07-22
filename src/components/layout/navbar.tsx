import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import NewItem from "@/components/shared/new-Item";
import NavbarItem from "./navbar-item";

import { NAVBAR } from "@/lib/info";
import { Cookie } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const newItemHandler = () => {
    console.log("new ingredient");
  };

  const newMealHandler = () => {
    navigate("/meals/new");
  };

  return (
    <nav className="grid grid-cols-4 md:grid-cols-1 gap-2 py-2">
      <div className="hidden md:flex md:flex-row justify-start items-center  p-2">
        <Cookie size={20} />
        <span className="text-lg font-semibold ml-1">Bite Board</span>
      </div>
      <Separator className="hidden md:inline" />
      {NAVBAR.map((item) => (
        <NavbarItem key={item.title} link={item} />
      ))}
      <Separator className="hidden md:inline" />
      <div className="hidden md:flex md:flex-col">
        <NewItem onClick={newItemHandler} title="New Ingredient" />
        <NewItem onClick={newMealHandler} title="New Meal" />
      </div>
    </nav>
  );
};

export default Navbar;
