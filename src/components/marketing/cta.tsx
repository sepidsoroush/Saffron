import { Balancer } from "react-wrap-balancer";
import { GetStartedButton } from "./get-started-button";

const CallToAction = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2
        className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-black to-slate-600 inline-block text-transparent bg-clip-text"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>Meal Planning for busy people</Balancer>
      </h2>
      <p
        className="mt-4 mb-8 animate-fade-up leading-normal animate-fade-in text-balance text-lg tracking-tight  [--animation-delay:400ms] md:text-xl font-extralight bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 inline-block text-transparent bg-clip-text"
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
