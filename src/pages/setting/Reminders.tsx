import { useReminder } from "@/context/ReminderContext";
import { FormTitle } from "@/components/meals/form-title";
import { Switch } from "@/components/ui/switch";
import WeeklyReminder from "@/components/setting/weekly-reminder";
import TimeReminder from "@/components/setting/time-reminder";

const Reminders = () => {
  const { isReminderEnabled, toggleReminder } = useReminder();

  return (
    <>
      <FormTitle backLink="/setting/notifications" title="Reminders" />
      <div className="flex items-center justify-between py-2">
        <p className="text-sm font-medium leading-none">
          Remind me to make a meal plan
        </p>
        <Switch checked={isReminderEnabled} onClick={() => toggleReminder()} />
      </div>

      <TimeReminder isDisabled={!isReminderEnabled} />
      <WeeklyReminder isDisabled={!isReminderEnabled} />
    </>
  );
};

export default Reminders;
