import { getTournaments } from "@/lib/api";
import { SearchBox } from "@/components/search-box";
import { TournamentsGrid } from "@/components/tournaments-grid";

export const dynamic = "force-dynamic";

interface TournamentsPageSearchParams {
  q?: string | undefined;
}

interface TournamentsPageProps {
  searchParams?: Promise<TournamentsPageSearchParams>;
}

export default async function TournamentsPage({ searchParams }: TournamentsPageProps) {
  const params = (await searchParams) ?? {};
  const tournaments = await getTournaments({ q: params.q });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Tournaments</h1>
          <p className="text-sm text-muted-foreground">
            Find tournaments instantly with server-side search.
          </p>
        </div>
        <SearchBox placeholder="Search tournaments..." />
      </div>

      {tournaments.length ? (
        <TournamentsGrid tournaments={tournaments} />
      ) : (
        <div className="rounded-lg border bg-card p-8 text-sm text-muted-foreground">
          No tournaments found.
        </div>
      )}
    </div>
  );
}

