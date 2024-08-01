import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

function NewItemButton({ onClick }: Props) {
  return (
    <Button
      variant="default"
      className="group flex items-center justify-center md:justify-start rounded-full p-2 text-sm font-medium w-12 h-12 bg-lime-600 hover:bg-lime-600/90 shadow-xl"
      onClick={onClick}
    >
      <Plus size={18} strokeWidth={3} />
    </Button>
  );
}

export default NewItemButton;
