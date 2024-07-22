import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

type Props = {
  onClick: () => void;
  title: string;
};

function NewItem({ onClick, title }: Props) {
  return (
    <div className="flex flex-col fixed bottom-0 right-0 left-0">
      {/* <div className="h-2 w-full bg-gradient-to-t from-gray-100 to-transparent"></div> */}
      <div className="px-0 py-2 bg-gray-100">
        <Button
          variant="ghost"
          className="gap-1 justify-start"
          onClick={onClick}
        >
          <CirclePlus size={18} color="#059669" />
          <span className="text-base font-medium text-emerald-600">
            {title}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default NewItem;
