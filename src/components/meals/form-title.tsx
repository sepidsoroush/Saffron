import { Link } from "react-router-dom";

import { ChevronLeft } from "lucide-react";

type Props = {
  title: string;
  backLink: string;
};

export function FormTitle({ title, backLink }: Props) {
  return (
    <div className="flex flex-row items-center justify-between max-w-full mb-4">
      <Link
        to={backLink}
        className="flex flex-row justify-between items-center text-sm absolute"
      >
        <ChevronLeft size={14} />
        Back
      </Link>
      <div className="text-base font-medium w-full text-center">{title}</div>
    </div>
  );
}
