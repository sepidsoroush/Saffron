import { Camera2Fill } from "../shared/icons";

const NoImageMeal = () => {
  return (
    <div className="h-[60px] w-[60px] rounded-xl object-cover border-2 border-dashed border-neutral-200 bg-neutral-50 flex justify-center items-center text-neutral-300">
      <Camera2Fill width={30} height={30} />
    </div>
  );
};

export default NoImageMeal;
