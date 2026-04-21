export interface Tournament {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface GetTournamentsParams {
    q?: string | undefined;
}

function getApiBase() {
    const base = process.env.NEXT_PUBLIC_TOURNAMENTS_API_BASE;
    if (!base) {
        throw new Error('Missing NEXT_PUBLIC_TOURNAMENTS_API_BASE. Set it in your environment (see README).');
    }
    return base.replace(/\/$/, '');
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
}

export async function getTournaments(params?: GetTournamentsParams) {
    const base = getApiBase();
    const q = params?.q?.trim();

    const url = new URL(`${base}/tournaments`);
    if (q) {
        url.searchParams.set('q', q);
    }

    return fetchJson<Tournament[]>(url.toString(), q ? { cache: 'no-store' } : { next: { revalidate: 60 } });
}

export async function getTournamentById(id: number) {
    const base = getApiBase();
    return fetchJson<Tournament>(`${base}/tournaments/${id}`, {
        next: { revalidate: 300 },
    });
}

