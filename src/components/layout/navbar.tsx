// import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
// import NewItem from "@/components/shared/new-Item";
import NavbarItem from "./navbar-item";

import { NAVBAR } from "@/lib/info";
import { Cookie } from "lucide-react";
import { Header } from "./header";

const Navbar = () => {
  // const navigate = useNavigate();

  // const newItemHandler = () => {
  //   console.log("new ingredient");
  // };

  // const newMealHandler = () => {
  //   navigate("/meals/new");
  // };

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
      {/* <div className="flex flex-col px-2">
        <NewItem onClick={newItemHandler} title="New Ingredient" />
        <NewItem onClick={newMealHandler} title="New Meal" />
      </div> */}
    </nav>
  );
};

export default Navbar;
