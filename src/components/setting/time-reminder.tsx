import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import TimePicker from "./time-picker";

type Props = {
  isDisabled: boolean;
};

const TimeReminder = ({ isDisabled }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleOpenChange = (state: boolean) => {
    if (!isDisabled) {
      setOpen(state);
    }
  };

  const handleTimeSet = (hour: number, minute: number) => {
    const formattedTime = `${hour < 10 ? `0${hour}` : hour}:${
      minute < 10 ? `0${minute}` : minute
    }`;
    setSelectedTime(formattedTime);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <div
          className={`flex items-center justify-between p-4 m-4 rounded-md bg-slate-100 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <p className="text-sm font-medium leading-none">
            {selectedTime ? `at ${selectedTime}` : "Set a time"}
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
        <div className="h-96 mt-4">
          <TimePicker onTimeSet={handleTimeSet} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TimeReminder;
