import { Link } from "react-router-dom";
import { footerLinks, contactLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t w-full container mx-auto py-4 flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row justify-between items-center gap-4">
        {footerLinks.map((item) => (
          <Link
            to={item.href}
            key={item.title}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center gap-4">
        {contactLinks.map((link) => (
          <Link
            to={link.href}
            key={link.title}
            className="text-muted-foreground hover:text-primary"
          >
            {link.icon && <link.icon size={16} className="" />}
          </Link>
        ))}
      </div>
    </footer>
  );
}
