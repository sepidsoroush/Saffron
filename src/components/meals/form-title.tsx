import { Link } from "react-router-dom";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  backLink: string;
  action?: () => void;
  actionTitle?: string;
  className?: string;
};

export function FormTitle({
  title,
  backLink,
  action,
  actionTitle,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between max-w-full border-b h-[72px]",
        className
      )}
    >
      <Link
        to={backLink}
        className={cn(
          "flex flex-row justify-between items-center text-sm",
          action && actionTitle ? "" : "absolute"
        )}
      >
        <ChevronLeft size={14} />
        Back
      </Link>
      <div className="text-base font-medium w-full text-center">{title}</div>
      {action && actionTitle && (
        <Button
          variant="ghost"
          onClick={action}
          className="text-sm py-0 h-auto"
        >
          {actionTitle}
        </Button>
      )}
    </div>
  );
}
