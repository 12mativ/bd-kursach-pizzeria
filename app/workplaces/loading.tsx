import { Skeleton } from "../../components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex gap-3 flex-wrap">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-[300px]" />
        ))}
      </div>
    </div>
  );
} 