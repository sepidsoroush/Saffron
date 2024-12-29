import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  backLink?: string;
  className?: string;
  actionComponent?: React.ReactNode;
};

export function Header({
  backLink,
  children,
  className,
  actionComponent,
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
      {actionComponent ? (
        <div className="text-right hidden md:inline-block">
          {actionComponent}
        </div>
      ) : null}
    </div>
  );
}
