import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  backLink?: string;
  onClick?: () => void;
  actionTitle?: string;
  className?: string;
  mobileActionComponent?: React.ReactNode;
  desktopActionComponent?: React.ReactNode;
};

export function Header({
  backLink,
  children,
  className,
  mobileActionComponent,
  desktopActionComponent,
}: Props) {
  return (
    <div
      className={cn(
        (className =
          "flex flex-row items-center justify-between w-full top-0 z-10 bg-background transition-all h-[72px] "),
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
      <div className="flex flex-row space-x-4">
        {mobileActionComponent && (
          <div className="block md:hidden">{mobileActionComponent}</div>
        )}
        {desktopActionComponent && (
          <div className="hidden md:block">{desktopActionComponent}</div>
        )}
      </div>
    </div>
  );
}
