import { CircleCheckBig } from "lucide-react";

export default function CompletedUnboarding() {
  return (
    <section className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
      <CircleCheckBig size={24} />
      <p className="my-4">Unboarding was successful</p>
    </section>
  );
}
