import { Link } from "react-router-dom";
import NewItem from "../shared/new-Item";
import { ChevronLeft } from "lucide-react";

type Props = {
  children: React.ReactNode;
  backLink?: string;
  onClick?: () => void;
  actionTitle?: string;
};

export function Header({ backLink, onClick, actionTitle, children }: Props) {
  return (
    <div className="flex flex-row items-center justify-between max-w-full p-4 sticky top-0 bg-background/60 backdrop-blur-xl transition-all border-b h-[72px]">
      {backLink ? (
        <Link
          to={backLink}
          className="flex flex-row justify-between items-center text-sm absolute"
        >
          <ChevronLeft size={14} />
          Back
        </Link>
      ) : null}

      <div className="text-2xl font-semibold w-full text-left">{children}</div>
      {onClick && actionTitle ? (
        <div className="text-right">
          <NewItem title={actionTitle} onClick={onClick} />
        </div>
      ) : null}
    </div>
  );
}
