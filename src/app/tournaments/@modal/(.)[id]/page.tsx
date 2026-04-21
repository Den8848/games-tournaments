import { notFound } from "next/navigation";

import { TournamentDetails } from "@/components/tournament-details";
import { TournamentDialog } from "@/components/tournament-dialog";
import { getTournamentById } from "@/lib/api";

export const dynamic = "force-dynamic";

interface TournamentModalPageParams {
  id: string;
}

interface TournamentModalPageProps {
  params: Promise<TournamentModalPageParams>;
}

export default async function TournamentModalPage({
  params,
}: TournamentModalPageProps) {
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
    <TournamentDialog title={tournament.title}>
      <TournamentDetails tournament={tournament} />
    </TournamentDialog>
  );
}

