import React from "react";

import { FormTitle } from "@/components/meals/form-title";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications: React.FC = () => {
  return (
    <>
      <FormTitle backLink="/setting" title="Notifications" className="px-4" />

      <Link
        to="/setting/notifications/reminders"
        className="flex items-center space-x-4 rounded-md border p-4 m-2"
      >
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            Meal plan reminders
          </p>
        </div>

        <div className="flex items-center space-x-1 m-2">
          <p className="text-sm text-muted-foreground leading-none">Disabled</p>
          <ChevronRight size={20} color="gray" />
        </div>
      </Link>
      <div className="flex items-center space-x-4 rounded-md border p-4 m-2">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">What's new updates</p>
          <p className="text-xs text-muted-foreground">
            Get notified when we release new recipes
          </p>
        </div>
        <Switch />
      </div>
    </>
  );
};

export default Notifications;
