import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold tracking-tighter">Marketing page</h1>
      <Button
        variant="link"
        onClick={() => {
          navigate("/schedule");
        }}
      >
        Getting started
      </Button>
    </section>
  );
}
