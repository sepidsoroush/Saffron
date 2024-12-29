import { Link, useNavigate } from "react-router-dom";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  backLink?: string;
  backLinkId?: number;
  action?: () => void;
  actionTitle?: string;
  className?: string;
};

export function FormTitle({
  title,
  backLink,
  backLinkId,
  action,
  actionTitle,
  className,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between max-w-full h-[72px]",
        className
      )}
    >
      {backLink ? (
        <Link
          to={backLink}
          state={backLinkId ? { id: backLinkId } : null}
          className={cn(
            "flex flex-row justify-between items-center text-sm",
            action && actionTitle ? "" : "absolute"
          )}
        >
          <ChevronLeft size={14} />
          Back
        </Link>
      ) : (
        <button
          className={cn(
            "flex flex-row justify-between items-center text-sm",
            action && actionTitle ? "" : "absolute"
          )}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={14} />
          Back
        </button>
      )}

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
