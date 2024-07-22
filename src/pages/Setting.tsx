import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggleMenu";

export default function Setting() {
  return (
    <section className="px-2 mt-2">
      <Card className="flex flex-row justify-between items-center px-4 py-2">
        <Label>Theme</Label>
        <ModeToggle />
      </Card>
    </section>
  );
}
