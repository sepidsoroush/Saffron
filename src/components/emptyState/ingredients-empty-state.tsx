import { FishFill } from "@/components/shared/icons";

export default function EmptyStateIngredients() {
  return (
    <section className="h-[calc(100vh-160px)] w-full flex place-content-center overflow-hidden">
      <div className="w-2/3 flex flex-col justify-center items-center space-y-3">
        <div className="text-neutral-300">
          <FishFill width={40} height={40} />
        </div>
        <div className="text-center">
          <p className="text-base text-neutral-600 font-medium mb-1">
            Empty list
          </p>
          <p className="text-xs text-neutral-500 font-medium">
            Missing ingredients show up here
          </p>
        </div>
      </div>
    </section>
  );
}
