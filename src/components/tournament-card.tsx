import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tournament } from "@/lib/api";

interface TournamentCardProps {
  tournament: Tournament;
  imagePriority?: boolean;
}

export function TournamentCard({
  tournament,
  imagePriority,
}: TournamentCardProps) {
  return (
    <Link
      href={`/tournaments/${tournament.id}`}
      className="group block cursor-pointer"
      scroll={false}
    >
      <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 hover:bg-muted/40 hover:ring-2 hover:ring-primary/30">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={tournament.imageUrl}
            alt={tournament.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            priority={imagePriority}
            loading={imagePriority ? "eager" : "lazy"}
            fetchPriority={imagePriority ? "high" : "auto"}
          />
        </div>
        <CardHeader className="space-y-0">
          <CardTitle className="text-base leading-6 line-clamp-2">
            {tournament.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
