import React, { useState } from "react";
import { motion } from "framer-motion";
import { cuisineInfo } from "@/types/constants";
import CloudinaryImage from "@/components/shared/cloudinary-image";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const toggleCuisineSelection = (cuisine: string) => {
    const allSelected = selectedCuisines.includes(cuisine);
    if (allSelected) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  return (
    <div className="flex flex-col justify-between overflow-y-auto overflow-x-hidden">
      <div className="mt-[22px] mb-7">
        <div className="font-bold text-[28px] mb-[6px]">Pick cuisines</div>
        <div className="text-sm font-light leading-4 break-words">
          Let's head to flavor town!
        </div>
      </div>
      <div className="px-0.5 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {cuisineInfo.map((item) => (
          <CuisineCard
            key={item.id}
            item={item}
            isCuisineSelected={selectedCuisines.includes(item.name)}
            toggleCuisineSelection={toggleCuisineSelection}
          />
        ))}
      </div>
      <button
        className={cn(
          "w-full h-[50px] mt-12 mb-4 rounded-2xl shadow-button",
          selectedCuisines.length === 0
            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            : "bg-orange-400 text-black cursor-pointer"
        )}
        disabled={selectedCuisines.length === 0}
        onClick={() => console.log(selectedCuisines)}
      >
        <span className="font-medium text-[17px]"> Get started</span>
      </button>
    </div>
  );
}

interface CuisineCardProps {
  item: {
    id: number;
    name: string;
    description: string;
    images: string[];
    rotations: number[];
  };
  isCuisineSelected: boolean;
  toggleCuisineSelection: (cuisine: string) => void;
}

const CuisineCard: React.FC<CuisineCardProps> = ({
  item,
  isCuisineSelected,
  toggleCuisineSelection,
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-xl min-h-[118px] w-full grid grid-cols-2 gap-1 p-4 cursor-pointer",
        isCuisineSelected ? "bg-orange-100" : "bg-neutral-100"
      )}
      onClick={(e) => {
        e.stopPropagation();
        toggleCuisineSelection(item.name);
      }}
      whileTap={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-start justify-between">
        <div>
          <div className="text-lg font-bold text-neutral-800">{item.name}</div>
          <div className="text-xs text-neutral-500">{item.description}</div>
        </div>
        <Checkbox
          checked={isCuisineSelected}
          className={cn(
            "border-0 bg-white w-[30px] h-[30px] data-[state=checked]:bg-orange-400 data-[state=checked]:text-black",
            isCuisineSelected ? "" : "shadow-checkbox"
          )}
          id={`cuisine-${item.name}`}
        />
      </div>
      <div className="h-auto flex flex-row items-center justify-end">
        <div
          className="overflow-hidden min-w-14 h-16 translate-x-8 shadow-combined border-[2px] border-white rounded-md z-0"
          style={{ rotate: `${item.rotations[0]}deg` }}
        >
          <CloudinaryImage
            imageNameOrUrl={`app/cuisines/${item.images[0]}`}
            width={500}
            height={500}
            className="object-cover h-full"
          />
        </div>
        <div
          className="overflow-hidden min-w-16 h-20 translate-x-4 shadow-combined border-[2px] border-white rounded-md z-10"
          style={{ rotate: `${item.rotations[1]}deg` }}
        >
          <CloudinaryImage
            imageNameOrUrl={`app/cuisines/${item.images[1]}`}
            width={500}
            height={500}
            className="object-cover h-full"
          />
        </div>
        <div
          className="overflow-hidden min-w-14 h-14 shadow-combined border-[2px] border-white rounded-md z-20"
          style={{ rotate: `${item.rotations[2]}deg` }}
        >
          <CloudinaryImage
            imageNameOrUrl={`app/cuisines/${item.images[2]}`}
            width={500}
            height={500}
            className="object-cover h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
