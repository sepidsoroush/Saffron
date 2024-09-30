import { useState } from "react";
import { useReminder } from "@/context/ReminderContext";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { Check, ChevronDown } from "lucide-react";

import { emptySchedule } from "@/types/constants";

type Props = {
  isDisabled: boolean;
};

const WeeklyReminder = ({ isDisabled }: Props) => {
  const [open, setOpen] = useState(false);
  const { selectedDay, setDay } = useReminder();

  const handleOpenChange = (state: boolean) => {
    if (!isDisabled) {
      setOpen(state);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <div
          className={`flex items-center justify-between p-4 m-4 rounded-md bg-slate-100 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className="text-sm font-medium leading-none">
            {selectedDay ? `on ${selectedDay}s` : "Set a day"}
          </p>
          <ChevronDown />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerTitle>
        <DrawerDescription>
          <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
        </DrawerDescription>
        <div className="divide-y divide-gray-100">
          {emptySchedule.map((item) => (
            <div
              key={item.day_id}
              onClick={() => {
                setDay(item.day);
                setOpen(false);
              }}
              className="flex flex-row justify-start py-3 px-4"
            >
              <div className="w-8">
                {selectedDay === item.day ? <Check /> : null}
              </div>
              <div className="">{item.day}</div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WeeklyReminder;
