import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/common-ui";

type Props = {
  link: NavItem;
};

const NavbarItem = ({ link }: Props) => {
  const location = useLocation();

  return (
    <Link
      to={link.href}
      className={cn(
        "group flex flex-col md:flex-row items-center justify-center md:justify-start rounded-md py-2 md:px-4 hover:bg-accent hover:text-accent-foreground md:w-full spacy-y-4",
        location.pathname === link.href ? "bg-accent" : "transparent"
      )}
    >
      {link.icon && <link.icon size={18} className="mb-1 md:mr-2" />}
      <span className="text-xs md:text-sm font-light md:font-medium">
        {link.title}
      </span>
    </Link>
  );
};

export default NavbarItem;
