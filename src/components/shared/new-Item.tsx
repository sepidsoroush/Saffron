import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

type Props = {
  onClick: () => void;
  title: string;
};

function NewItem({ onClick, title }: Props) {
  return (
    <Button
      variant="ghost"
      className="group flex items-center justify-center md:justify-start rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-max md:w-full"
      onClick={onClick}
    >
      <CirclePlus size={18} color="#059669" />
      <span className="text-base font-medium text-emerald-600 ml-1">
        {title}
      </span>
    </Button>
  );
}

export default NewItem;
