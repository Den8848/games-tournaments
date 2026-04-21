import { notFound } from "next/navigation";

import { TournamentDetails } from "@/components/tournament-details";
import { TournamentDialog } from "@/components/tournament-dialog";
import { getTournamentById } from "@/lib/api";

export const dynamic = "force-dynamic";

interface TournamentPageParams {
  id: string;
}

interface TournamentPageProps {
  params: Promise<TournamentPageParams>;
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { id } = await params;
  const parsed = Number(id);
  if (!Number.isFinite(parsed)) {
    notFound();
  }

  let tournament;
  try {
    tournament = await getTournamentById(parsed);
  } catch {
    notFound();
  }

  return (
    <TournamentDialog title={tournament.title} closeHref="/tournaments">
      <TournamentDetails tournament={tournament} />
    </TournamentDialog>
  );
}

