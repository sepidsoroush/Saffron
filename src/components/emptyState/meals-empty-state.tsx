import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DinnerFill,
  PizzaFill,
  SoupPotFill,
  FriedEggFill,
  ElectricCookerFill,
  Birthday2Fill,
} from "@/components/shared/icons";

const icons = [
  () => <DinnerFill width={40} height={40} />,
  () => <PizzaFill width={40} height={40} />,
  () => <SoupPotFill width={40} height={40} />,
  () => <FriedEggFill width={40} height={40} />,
  () => <ElectricCookerFill width={40} height={40} />,
  () => <Birthday2Fill width={40} height={40} />,
];

export default function EmptyStateMeals() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = icons[currentIconIndex];

  return (
    <section className="h-[calc(100vh-160px)] w-full flex place-content-center overflow-hidden">
      <div className="w-2/3 flex flex-col justify-center items-center space-y-3">
        <div className="text-neutral-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIconIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentIcon />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-center">
          <p className="text-base text-neutral-600 font-medium mb-1">
            No meals
          </p>
          <p className="text-xs text-neutral-500 font-medium">
            Add your favorite dish or try our recommended cuisines!
          </p>
        </div>
      </div>
    </section>
  );
}
