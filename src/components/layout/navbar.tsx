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
    <nav className="hidden md:flex flex-col gap-2 py-2">
      <div className="flex flex-row justify-start items-center p-2">
        <Cookie size={20} />
        <span className="text-lg font-semibold ml-1">Bite Board</span>
      </div>
      <Separator />
      {NAVBAR.map((item) => (
        <NavbarItem key={item.title} link={item} />
      ))}
      <Separator />
      <div className="flex flex-col">
        <NewItem onClick={newItemHandler} title="New Ingredient" />
        <NewItem onClick={newMealHandler} title="New Meal" />
      </div>
    </nav>
  );
};

export default Navbar;
