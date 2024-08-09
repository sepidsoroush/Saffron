import Balancer from "react-wrap-balancer";
import { FeatureInfo } from "@/types/common-ui";

type Props = {
  info: FeatureInfo;
};

export const FeatureCard = ({ info }: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <img
        src={info.image}
        alt={info.title}
        className="h-28 rounded-xl object-fill"
      />
      <h2
        className="animate-fade-up font-urban font-extrabold leading-normal tracking-tight text-2xl md:text-3xl md:leading-loose bg-gradient-to-r from-slate-900 to-slate-600 text-transparent bg-clip-text"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>{info.title}</Balancer>
      </h2>
      <p
        className="mt-4 mb-8 md:w-1/2 animate-fade-up leading-normal animate-fade-in text-lg md:text-xl tracking-tight  [--animation-delay:400ms] font-extralight bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 text-transparent bg-clip-text"
        style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
      >
        <Balancer>{info.description}</Balancer>
      </p>
    </div>
  );
};
