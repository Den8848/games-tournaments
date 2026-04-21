import Image from "next/image";

import { JoinTournamentButton } from "@/components/join-tournament-button";
import type { Tournament } from "@/lib/api";

interface TournamentDetailsProps {
  tournament: Tournament;
}

export function TournamentDetails({ tournament: t }: TournamentDetailsProps) {

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={t.imageUrl}
          alt={t.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          unoptimized
          priority
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="pt-5 sm:pt-6">
        <p className="text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground whitespace-pre-line">
          {t.description}
        </p>
      </div>

      <div className="mt-5 sm:mt-6 border-t-2 border-foreground/20 dark:border-border/70" />

      <div className="pt-4 sm:pt-5 flex items-center justify-end">
        <JoinTournamentButton tournamentTitle={t.title} />
      </div>
    </div>
  );
}

