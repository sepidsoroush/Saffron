import { Dispatch, SetStateAction } from "react";

import AnimatedCheckIcon from "./animated-check-icon";
import { Button } from "@/components/ui/button";

type Props = {
  addedMealAmount: number;
  addedIngAmount: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CompletedOnboarding({
  addedMealAmount,
  addedIngAmount,
  setOpen,
}: Props) {
  const closeDrawerHandler = () => {
    setOpen(false);
  };
  return (
    <section className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
      <div className="h-[calc(100vh-180px)] flex flex-col justify-center items-center">
        {addedMealAmount !== 0 || addedIngAmount !== 0 ? (
          <AnimatedCheckIcon isVisible={true} initial={true} />
        ) : (
          <>
            <p className="w-3/4 text-base text-gray-600 font-medium text-center my-2">
              You didn't choose any recipe or ingredient from our sugestions to
              add :(
            </p>
            <p className="w-3/4 text-xs text-gray-500 text-center mt-2">
              Use + button in grocery list or meals tab to add tour favorite
              items.
            </p>
          </>
        )}

        {addedMealAmount === 0 ? null : (
          <p className="tetx-lg font-semibold">
            {addedMealAmount} Meal added to your meal list
          </p>
        )}
        {addedIngAmount === 0 ? null : (
          <p className="tetx-lg font-semibold">
            {addedIngAmount} Ingredient added to your ingredient list
          </p>
        )}
      </div>
      <Button variant="default" className="mb-4" onClick={closeDrawerHandler}>
        Done
      </Button>
    </section>
  );
}
