import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import supabase from "@/config/supabaseConfig";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggleMenu";
import { Header } from "@/components/layout/header";
import ConfirmAlertDialog from "@/components/shared/confirm-alert";
import { LogOut, Bell } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { CloudDownload } from "lucide-react";

export default function Setting() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <Header>Settings</Header>
      <div className="space-y-2">
        {" "}
        <Card className="flex flex-row justify-between items-center px-4 py-2 min-h-14">
          <Label>User</Label>
          <div className="text-gray-600">{user?.email}</div>
        </Card>
        <Card className="flex flex-row justify-between items-center pl-4 pr-6 py-2 min-h-14">
          <Label>Theme</Label>
          <ModeToggle />
        </Card>
        <Card className="">
          <Link
            to="/onboarding"
            className="flex flex-row justify-between items-center px-4 py-2 min-h-14"
          >
            <Label>Recipe suggestions</Label>
            <CloudDownload size={20} className="m-2" />
          </Link>
        </Card>
        <Card className="">
          <Link
            to="/setting/notifications"
            className="flex flex-row justify-between items-center px-4 py-2 min-h-14"
          >
            <Label>Notifications</Label>
            <Bell size={20} className="m-2" />
          </Link>
        </Card>
        <Card className="flex flex-row justify-between items-center px-4 py-2 ">
          <Label>Log out</Label>
          <ConfirmAlertDialog
            onConfirm={logoutHandler}
            triggerIcon={
              <div className="pl-36">
                <LogOut className="h-[1.2rem] w-[1.2rem]" color="#dc2626" />
              </div>
            }
            title={`Log out of ${siteConfig.name}?`}
            descriptionText="You can always log back in at any time."
            variant="link"
          />
        </Card>
      </div>
    </div>
  );
}
