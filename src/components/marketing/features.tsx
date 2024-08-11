import { featuresInfo } from "@/lib/info";
import { FeatureCard } from "./feature-card";
import { GetStartedButton } from "./get-started-button";

export const Features = () => {
  return (
    <div className="py-8 px-6 sm:py-16 lg:px-6 lg:py-24 mx-auto max-w-screen-xl text-center ">
      <h2 className="mb-4 text-3xl max-w-[310px] mx-auto md:max-w-full tracking-tight font-extrabold text-primary-900">
        Here’s how it works
      </h2>
      <p className="text-primary-500 font-normal text-lg md:text-xl">
        Learn more about Bite Board
      </p>
      <div className="my-8 lg:my-12 gap-8 flex flex-col md:flex-row flex-wrap md:gap-12 justify-center content-center justify-items-center">
        {featuresInfo.map((item) => {
          return <FeatureCard key={item.title} info={item} />;
        })}
      </div>
      <p className="mt-4 mb-6 md:mb-10 md:max-w-3xl md:mx-auto text-center animate-fade-up leading-normal animate-fade-in text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight  [--animation-delay:400ms] font-extralight bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 text-transparent bg-clip-text">
        Ready to build your personalized meal plan?
      </p>
      <GetStartedButton title="Get started" />
    </div>
  );
};
