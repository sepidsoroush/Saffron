import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
  const isActive = location.pathname === link.href;

  return (
    <Link
      to={link.href}
      className={cn(
        "relative group flex md:flex-row items-center justify-center md:justify-between rounded-full py-[6px] px-4 hover:text-accent",
        isActive
          ? "bg-accent-foreground md:bg-transparent text-accent"
          : "bg-transparent text-neutral-400"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="navbar-item-highlight"
          className="absolute inset-0 bg-accent-foreground md:bg-transparent rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <div className="flex items-center justify-center relative z-10">
        <div className="flex flex-row justify-start items-center relative">
          {isActive ? (
            <link.iconfill width={30} height={30} className="md:mr-2" />
          ) : (
            <link.icon width={30} height={30} className="md:mr-2" />
          )}
          {link.title === "Grocery list" &&
          !isActive &&
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
