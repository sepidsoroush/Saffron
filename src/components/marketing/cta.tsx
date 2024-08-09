import { Balancer } from "react-wrap-balancer";
import { GetStartedButton } from "./get-started-button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="mx-auto px-6 text-center flex flex-col items-center place-content-center h-[calc(100vh-80px)]">
      <div className="group inline-flex h-7 translate-y-[-1rem] animate-fade-in items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black backdrop-blur-[12px]">
        <p className="mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50 animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(100px)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] bg-gradient-to-r from-neutral-100 via-black/80 via-50% to-neutral-100 dark:from-neutral-900 dark:via-white/80 dark:to-neutral-900 inline-flex items-center justify-center">
          <span>✨ Introducing Bite Board</span>
          <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </p>
      </div>
      <h1
        className="py-6 md:mx-24 animate-fade-up font-urban font-extrabold leading-none md:leading-tight tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-black to-slate-600 text-transparent bg-clip-text"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>Meal Planning for busy people</Balancer>
      </h1>
      <p
        className="mt-4 mb-8 md:w-1/2 text-center animate-fade-up leading-normal animate-fade-in text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight  [--animation-delay:400ms] font-extralight bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 text-transparent bg-clip-text"
        style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
      >
        <Balancer>
          Custom meal plans, personalized recipes and grocery lists to help you
          save time and eat better.
        </Balancer>
      </p>
      <div
        className="flex animate-fade-up justify-center space-x-2"
        style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
      >
        <GetStartedButton />
      </div>
    </div>
  );
};

export default CallToAction;
