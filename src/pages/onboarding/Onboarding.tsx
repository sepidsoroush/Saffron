import { cuisineInfo } from "@/types/constants";
import React from "react";
import CloudinaryImage from "@/components/shared/cloudinary-image";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col justify-between overflow-y-auto px-5">
      <div className="mt-[22px] mb-7">
        <div className="font-bold text-[28px] mb-[6px]">Pick cuisines</div>
        <div className="text-sm font-light leading-4 break-words">
          Let's head to flavor town!
        </div>
      </div>
      <CuisineCard />
    </div>
  );
}

const CuisineCard: React.FC = () => {
  return (
    <div className="bg-neutral-100 rounded-xl min-h-[118px] w-full flex flex-row justify-center items-start p-4">
      <div className="">
        <div className="text-lg font-bold text-neutral-800">Iranian</div>
        <div className="text-[13px] font-medium text-neutral-500">
          Rice spices and warmth
        </div>
      </div>
      <div className="relative h-auto w-1/2">
        <div className="absolute overflow-hidden w-[54px] h-[72px] top-0 left-4 rotate-6 shadow-combined border-[2px] border-white rounded-md">
          <CloudinaryImage
            imageNameOrUrl="app/jnnolhpitynbvgdxiizm"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="absolute overflow-hidden w-[65px] h-[78px] top-2 left-12 bg-cover shadow-combined border-[2px] border-white rounded-md z-10">
          <CloudinaryImage
            imageNameOrUrl="app/urswbl6jcraksqdit5v8"
            width={600}
            height={600}
            className="object-cover h-full"
          />
        </div>
        <div className="absolute overflow-hidden w-[54px] h-[54px] top-0 right-0 bg-cover -rotate-6 shadow-combined border-[2px] border-white rounded-md">
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
