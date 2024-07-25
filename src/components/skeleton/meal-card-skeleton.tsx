import { Skeleton } from "@/components/ui/skeleton";

export function MealCardSkeleton() {
  return (
    <div className="flex flex-row my-4">
      <Skeleton className="h-[125px] w-[180px] mr-4 rounded-xl" />
      <div className="space-y-2 my-2">
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
