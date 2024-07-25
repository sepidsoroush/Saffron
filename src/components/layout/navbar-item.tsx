import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { selectEssentialItemsLength } from "@/store/ingredients/ingredients.selector";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/common-ui";

type Props = {
  link: NavItem;
};

const NavbarItem = ({ link }: Props) => {
  const location = useLocation();
  const essentialItems = useAppSelector(selectEssentialItemsLength);

  return (
    <Link
      to={link.href}
      className={cn(
        "group flex flex-col md:flex-row items-center justify-center md:justify-between rounded-md py-2 md:px-4 hover:bg-accent hover:text-accent-foreground md:w-full spacy-y-4",
        location.pathname === link.href ? "bg-accent" : "transparent"
      )}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-row justify-start items-center">
          {link.icon && <link.icon size={20} className="mb-1 md:mr-2" />}
          {link.title === "Grocery list" && essentialItems !== 0 ? (
            <span className="h-1 w-1 rounded-full bg-red-600 -top-2 relative md:hidden"></span>
          ) : null}
        </div>
        <span className="text-[10px] md:text-sm font-light md:font-medium">
          {link.title}
        </span>
      </div>
      {link.title === "Grocery list" ? (
        <Badge className="ml-1 hidden md:flex self-end" variant="destructive">
          {essentialItems}
        </Badge>
      ) : null}
    </Link>
  );
};

export default NavbarItem;
