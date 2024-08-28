import { AnimatePresence, motion } from "framer-motion";

type Props = {
  initial: boolean;
  isVisible: boolean;
};

export default function AnimatedCheckIcon({ initial, isVisible }: Props) {
  return (
    <AnimatePresence initial={initial}>
      {isVisible && (
        <div className="w-[150px] h-[150px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="CheckIcon"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: isVisible ? "easeOut" : "easeIn",
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}
