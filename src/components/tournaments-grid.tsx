import type { Tournament } from "@/lib/api";
import { TournamentCard } from "@/components/tournament-card";

interface TournamentsGridProps {
  tournaments: Tournament[];
}

export function TournamentsGrid({ tournaments }: TournamentsGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((t, idx) => (
        <TournamentCard
          key={t.id}
          tournament={t}
          imagePriority={idx < 3}
        />
      ))}
    </div>
  );
}

