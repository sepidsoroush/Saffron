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
        "group flex md:flex-row items-center justify-center md:justify-between rounded-full py-[6px] px-4 hover:text-accent bg-accent-neutral-400",
        location.pathname === link.href
          ? "bg-accent-foreground md:bg-transparent text-accent"
          : "transparent text-neutral-400"
      )}
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-row justify-start items-center relative">
          {location.pathname === link.href ? (
            <link.iconfill width={30} height={30} className="md:mr-2" />
          ) : (
            <link.icon width={30} height={30} className="md:mr-2" />
          )}

          {link.title === "Grocery list" &&
          location.pathname !== link.href &&
          essentialItems !== 0 ? (
            <span className="px-1 py-[1px] rounded-full border-2 border-white bg-orange-500 text-white text-[8px] text-center absolute -right-1.5 -top-1.5 md:hidden">
              {essentialItems > 9 ? "+9" : essentialItems}
            </span>
          ) : null}
        </div>
        <span className="text-[10px] md:text-sm font-light md:font-medium hidden md:block">
          {link.title}
        </span>
      </div>
      {link.title === "Grocery list" ? (
        <Badge className="ml-1 hidden bg-orange-600 md:flex">
          {essentialItems}
        </Badge>
      ) : null}
    </Link>
  );
};

export default NavbarItem;
