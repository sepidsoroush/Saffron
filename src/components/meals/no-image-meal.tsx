import { Camera2Fill } from "../shared/icons";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function NoImageMeal({ className }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl object-cover border-2 border-dashed border-neutral-200 bg-neutral-50 flex justify-center items-center text-neutral-300",
        className
      )}
    >
      <Camera2Fill width={30} height={30} />
    </div>
  );
}

export default NoImageMeal;
