import Balancer from "react-wrap-balancer";
import { FeatureInfo } from "@/types/common-ui";

type Props = {
  info: FeatureInfo;
};

export const FeatureCard = ({ info }: Props) => {
  return (
    <div className="max-w-[310px]">
      <img
        src={info.image}
        alt={info.title}
        className="h-28 rounded-xl object-fill mx-auto "
      />
      <h2 className="mb-2 text-2xl text-center font-bold">
        <Balancer>{info.title}</Balancer>
      </h2>
      <p className="mb-4 text-slate-500 text-center text-lg">
        <Balancer>{info.description}</Balancer>
      </p>
    </div>
  );
};
