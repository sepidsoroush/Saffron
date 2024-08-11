import { Link } from "react-router-dom";
import { footerLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="w-full p-4 pt-12 flex flex-col justify-between items-center space-y-4">
      <Link
        to="/"
        className="inline-block text-2xl font-bold text-primary hover:text-muted-foreground"
      >
        {siteConfig.name}
      </Link>
      <p className="text-base text-gray-500">
        Get connected and start planning.
      </p>
      <ul className="flex flex-row justify-between items-center gap-4 pt-4">
        {footerLinks.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className="text-muted-foreground hover:text-primary"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500">
        <span>© 2024 Bite Board by</span>{" "}
        <Link
          to="https://github.com/sepidsoroush"
          className="inline-block text-muted-foreground hover:text-primary"
        >
          Sepideh Soroush
        </Link>
      </p>
    </footer>
  );
}
