import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TournamentCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/9] w-full">
        <Skeleton className="absolute inset-0" />
      </div>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  );
}

