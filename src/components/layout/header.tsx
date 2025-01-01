import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  backLink?: string;
  onClick?: () => void;
  actionTitle?: string;
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
        "flex flex-row items-center justify-between w-full top-0 z-10 bg-background transition-all h-[72px] mt-4",
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
      <div className="flex flex-row space-x-4">{actionComponent}</div>
    </div>
  );
}
