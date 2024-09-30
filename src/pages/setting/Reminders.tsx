import { useState } from "react";

import { FormTitle } from "@/components/meals/form-title";
import { Switch } from "@/components/ui/switch";
import WeeklyReminder from "@/components/setting/weekly-reminder";
import TimeReminder from "@/components/setting/time-reminder";

const Reminders = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const activeReminderHandler = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <>
      <FormTitle
        backLink="/setting/notifications"
        title="Reminders"
        className="px-4"
      />
      <div className="flex items-center justify-between p-2 m-2">
        <p className="text-sm font-medium leading-none">
          Remind me to make a meal plan
        </p>
        <Switch onClick={activeReminderHandler} />
      </div>

      <TimeReminder isDisabled={isDisabled} />
      <WeeklyReminder isDisabled={isDisabled} />
    </>
  );
};

export default Reminders;
