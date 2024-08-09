import { Link } from "react-router-dom";
import { Button } from "../ui/button";

import { Cookie } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useAuth } from "@/hooks/useAuth";

export const MarketingNavbar = () => {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-30 flex h-16 w-full items-center gap-10 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
      <Link to="/" className="flex items-center space-x-2">
        <Cookie />
        <span className="inline-block font-urban text-xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
      {!user ? (
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/login">
            <Button className="relative rounded-lg">Sign In</Button>
          </Link>
        </div>
      ) : null}
    </nav>
  );
};
