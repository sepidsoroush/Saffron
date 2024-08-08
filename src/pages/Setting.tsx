import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import supabase from "@/config/supabaseConfig";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggleMenu";
import { Header } from "@/components/layout/header";
import ConfirmAlertDialog from "@/components/shared/confirm-alert";
import { LogOut } from "lucide-react";

export default function Setting() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col space-y-2 mt-[72px]">
      <Header>Settings</Header>
      <Card className="flex flex-row justify-between items-center px-4 py-2 m-2">
        <Label>User</Label>
        <div className="text-gray-600">{user?.email}</div>
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
