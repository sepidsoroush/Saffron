import React from "react";
import { cuisineInfo } from "@/types/constants";
import CloudinaryImage from "@/components/shared/cloudinary-image";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col justify-between overflow-y-auto px-5 mb-[72px]">
      <div className="mt-[22px] mb-7">
        <div className="font-bold text-[28px] mb-[6px]">Pick cuisines</div>
        <div className="text-sm font-light leading-4 break-words">
          Let's head to flavor town!
        </div>
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {cuisineInfo.map((item) => (
          <CuisineCard key={item.id} item={item} />
        ))}
      </div>
      <button
        className={cn("w-full h-[50px] mt-12 mb-4 rounded-2xl bg-lime-200")}
      >
        <span className="font-medium text-[17px]"> Get started</span>
      </button>
    </div>
  );
}

interface CuisineCardProps {
  item: { id: number; name: string; description: string };
}

const CuisineCard: React.FC<CuisineCardProps> = ({ item }) => {
  return (
    <div className="bg-neutral-100 rounded-xl min-h-[118px] w-full grid grid-cols-2 gap-1 p-4">
      <div className="flex flex-col items-start justify-between col-span-1">
        <div>
          <div className="text-lg font-bold text-neutral-800">{item.name}</div>
          <div className="text-[13px] text-neutral-500">{item.description}</div>
        </div>
        <Checkbox className="shadow-checkbox border-0 bg-white w-[30px] h-[30px]" />
      </div>
      <div className="h-auto flex flex-row items-center justify-end">
        <div className="overflow-hidden w-[54px] h-[72px] rotate-6 shadow-combined border-[2px] border-white rounded-md">
          <CloudinaryImage
            imageNameOrUrl="app/jnnolhpitynbvgdxiizm"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="overflow-hidden w-[65px] h-[78px] shadow-combined border-[2px] border-white rounded-md z-5">
          <CloudinaryImage
            imageNameOrUrl="app/urswbl6jcraksqdit5v8"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="overflow-hidden w-[54px] h-[54px] -rotate-6 shadow-combined border-[2px] border-white rounded-md">
          <CloudinaryImage
            imageNameOrUrl="app/lkdfldikmnekm341rove"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
      </div>
    </div>
  );
};
