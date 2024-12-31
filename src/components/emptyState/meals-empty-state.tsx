import { DinnerFill } from "../shared/icons";

export default function EmptyStateMeals() {
  return (
    <section className="h-[calc(100vh-160px)] w-full flex place-content-center">
      <div className="w-1/2 flex flex-col justify-center items-center space-y-3">
        <div className="text-neutral-300">
          <DinnerFill width={40} height={40} />
        </div>
        <div>
          <p className="text-base text-neutral-600 font-medium text-center mb-1">
            No meals
          </p>
          <p className="text-xs text-neutral-500 font-medium text-center">
            Add your favorite dish or try our recommended cuisines!
          </p>
        </div>
      </div>
    </section>
  );
}
