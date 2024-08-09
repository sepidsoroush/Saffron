import { featuresInfo } from "@/lib/info";
import { FeatureCard } from "./feature-card";

export const Features = () => {
  return (
    <div className="mx-auto px-6 text-center">
      {featuresInfo.map((item) => {
        return <FeatureCard key={item.title} info={item} />;
      })}
    </div>
  );
};
