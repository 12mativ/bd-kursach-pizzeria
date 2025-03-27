import { Skeleton } from "../../components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full h-full">
      <Skeleton className="h-[50px] w-[200px] " />
      <div className="flex gap-3 flex-wrap">
        <Skeleton className="h-[250px] w-[200px]" />
        <Skeleton className="h-[250px] w-[200px]" />
        <Skeleton className="h-[250px] w-[200px]" />
        <Skeleton className="h-[250px] w-[200px]" />
        <Skeleton className="h-[250px] w-[200px]" />
      </div>
    </div>
  );
}
