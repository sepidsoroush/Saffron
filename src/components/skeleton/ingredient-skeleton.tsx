import { Skeleton } from "@/components/ui/skeleton";

export function IngredientSkeleton() {
  return (
    <div className="flex flex-row flex-nowrap items-center my-3">
      <Skeleton className="h-6 w-6 mr-2 rounded-full" />
      <Skeleton className="h-4 w-[180px]" />
    </div>
  );
}
