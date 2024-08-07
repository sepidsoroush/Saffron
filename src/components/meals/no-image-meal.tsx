import { CookingPot } from "lucide-react";

const NoImageMeal = () => {
  return (
    <div className="h-40 rounded-xl object-cover border border-gray-200 bg-gray-300 flex justify-center items-center">
      <CookingPot size={150} color="#ffffff" className="p-8" />
    </div>
  );
};

export default NoImageMeal;
