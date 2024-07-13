export default {};
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import MealForm from "./meal-form";
// import { Plus } from "lucide-react";

// const NewMeal: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="gap-1 w-full">
//           <Plus size={18} />
//           <span className="text-base font-light">New Meal</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent aria-describedby={undefined}>
//         <DialogHeader>
//           <DialogTitle>Add new meal</DialogTitle>
//         </DialogHeader>
//         <MealForm actionType="create" onOpenChange={setOpen} />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default NewMeal;
