import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "@/config/supabaseConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmAlertDialog from "@/components/shared/confirm-alert";
import { Settings1Fill, ExitLine, AiLine } from "@/components/shared/icons";
import { siteConfig } from "@/lib/site";

export default function Settings() {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const openDialogHandler = () => {
    setDrawerOpen(false);
    setDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <DropdownMenuTrigger className="outline-none text-neutral-400 focus:text-orange-500 hover:text-orange-500">
          <Settings1Fill width={24} height={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="focus:bg-white">
            <Link
              to="/onboarding"
              className="flex flex-row justify-between items-center text-neutral-400 space-x-2.5"
            >
              <AiLine width={24} height={24} />
              <div className="text-neutral-700">Curated meals</div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus:bg-white"
            onClick={openDialogHandler}
          >
            <div className="flex flex-row justify-between items-center text-neutral-400 space-x-2.5">
              <ExitLine width={24} height={24} />
              <div className="text-neutral-700 ">Log out</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmAlertDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        title={`Log out of ${siteConfig.name}?`}
        descriptionText="You can always log back in at any time."
        onConfirm={logoutHandler}
      />
    </>
  );
}
