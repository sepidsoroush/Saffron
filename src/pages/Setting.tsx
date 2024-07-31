import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggleMenu";
import { Header } from "@/components/layout/header";
import ConfirmAlertDialog from "@/components/shared/confirm-alert";
import { LogOut } from "lucide-react";

import supabase from "@/config/supabaseConfig";

export default function Setting() {
  const [userEmail, setUserEmail] = useState<string | undefined>("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };

    fetchUser();
  }, []);

  const logoutHandler = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col space-y-2 mt-[72px]">
      <Header>Settings</Header>
      <Card className="flex flex-row justify-between items-center px-4 py-2 m-2">
        <Label>User</Label>
        <div className="text-gray-600">{userEmail}</div>
      </Card>
      <Card className="flex flex-row justify-between items-center px-4 py-2 m-2">
        <Label>Log out</Label>
        <ConfirmAlertDialog
          onConfirm={logoutHandler}
          triggerIcon={<LogOut className="h-[1.2rem] w-[1.2rem]" />}
          title="Log out of Bite Board?"
          descriptionText="You can always log back in at any time."
          variant="ghost"
        />
      </Card>

      <Card className="flex flex-row justify-between items-center px-4 py-2 m-2">
        <Label>Theme</Label>
        <ModeToggle />
      </Card>
    </div>
  );
}
