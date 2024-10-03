import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
  onConfirm: () => void;
  triggerText?: string;
  triggerIcon?: ReactNode;
  title: string;
  descriptionText: string;
  variant:
    | "link"
    | "default"
    | "ghost"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
};

const ConfirmAlertDialog = ({
  onConfirm,
  triggerText,
  triggerIcon,
  title,
  descriptionText,
  variant,
  className,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} className={cn(className, "px-2")}>
          {triggerText}
          {triggerIcon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{descriptionText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlertDialog;
