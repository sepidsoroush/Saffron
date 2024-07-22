import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggleMenu";
import { Header } from "@/components/layout/header";

export default function Setting() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>Settings</Header>

      <Card className="flex flex-row justify-between items-center px-4 py-2 m-2">
        <Label>Theme</Label>
        <ModeToggle />
      </Card>
    </div>
  );
}
