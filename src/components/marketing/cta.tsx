import { Balancer } from "react-wrap-balancer";
import { GetStartedButton } from "./get-started-button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="mx-auto px-6 text-center flex flex-col items-center place-content-center min-h-[calc(100vh-80px)]">
      <p className="text-xs mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50 inline-flex items-center justify-center">
        <span>✨ Introducing Bite Board</span>
        <ArrowRight size={12} />
      </p>
      <div className="max-w-3xl mx-auto">
        <h1
          className="py-6 md:mx-24 animate-fade-up font-extrabold leading-none md:leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-black to-slate-600 text-transparent bg-clip-text"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>Meal Planning for busy people</Balancer>
        </h1>
      </div>
      <p
        className="mt-4 mb-6 md:mb-10 md:max-w-3xl md:mx-auto text-center animate-fade-up leading-normal animate-fade-in text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight  [--animation-delay:400ms] font-extralight bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 text-transparent bg-clip-text"
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
        <GetStartedButton title="Get started for free" icon />
      </div>
    </div>
  );
};

export default CallToAction;
