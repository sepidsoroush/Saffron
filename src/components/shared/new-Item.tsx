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
      className="group flex items-center justify-center md:justify-start rounded-md p-2 text-sm font-medium  text-accent hover:bg-accent w-max md:w-full"
      onClick={onClick}
    >
      <CirclePlus size={18} />
      <span className="text-base font-medium ml-1">{title}</span>
    </Button>
  );
}

export default NewItem;
