import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  icon?: boolean;
};

export function GetStartedButton({ title, icon }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (user) {
      navigate("/schedule");
    } else {
      navigate("/login");
    }
  };

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={handleOnClick}
    >
      <span className="mr-1 font-light">{title}</span>
      {icon && <ArrowRight size={16} strokeWidth={1.5} />}
    </Button>
  );
}
