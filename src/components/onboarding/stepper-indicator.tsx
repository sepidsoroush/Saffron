import { Fragment, SetStateAction, Dispatch } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};
const StepperIndicator = ({ activeStep, setActiveStep }: Props) => {
  const changeStepHandler = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3].map((step) => (
        <Fragment key={step}>
          <button
            className={cn(
              "w-[40px] h-[40px] flex justify-center items-center m-[5px] border-[2px] rounded-full",
              step < activeStep && "bg-primary text-white",
              step === activeStep && "border-primary text-primary"
            )}
            onClick={() => {
              changeStepHandler(step);
            }}
          >
            {step >= activeStep ? step : <Check className="h-5 w-5" />}
          </button>
          {step !== 3 && (
            <Separator
              orientation="horizontal"
              className={cn(
                "w-[100px] h-[2px]",
                step <= activeStep - 1 && "bg-primary"
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
export default StepperIndicator;
