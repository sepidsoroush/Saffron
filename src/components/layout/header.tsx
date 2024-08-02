import { Link } from "react-router-dom";
import NewItem from "@/components/shared/new-Item";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  backLink?: string;
  onClick?: () => void;
  actionTitle?: string;
  className?: string;
};

export function Header({
  backLink,
  onClick,
  actionTitle,
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between w-full md:w-[calc(100vw-240px)] p-4 fixed top-0 z-10 bg-background/60 backdrop-blur-xl transition-all border-b h-[72px]",
        className
      )}
    >
      {backLink ? (
        <Link
          to={backLink}
          className="flex flex-row justify-between items-center text-sm absolute"
        >
          <ChevronLeft size={14} />
          Back
        </Link>
      ) : null}

      <div className="text-2xl font-semibold text-left">{children}</div>
      {onClick && actionTitle ? (
        <div className="text-right hidden md:inline-block">
          <NewItem title={actionTitle} onClick={onClick} />
        </div>
      ) : null}
    </div>
  );
}
