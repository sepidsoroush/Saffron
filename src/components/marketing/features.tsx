import { featuresInfo } from "@/lib/info";
import { FeatureCard } from "./feature-card";

export const Features = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {featuresInfo.map((item) => {
        return <FeatureCard key={item.title} info={item} />;
      })}
    </div>
  );
};
