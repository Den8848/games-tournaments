# Games / Tournaments feature (Next.js App Router )

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui

## Setup

### Requirements

- Node.js **>= 20** (recommended **22 LTS**)

### 1) Install

```bash
npm i
```

### 2) Configure environment

Copy `.env.example` to `.env` and set:

- `NEXT_PUBLIC_TOURNAMENTS_API_BASE`

Expected value (typicode json-server):

- `https://my-json-server.typicode.com/<owner>/<repo>`

Endpoints used by the app:

- `GET /tournaments`
- `GET /tournaments?q=<term>`
- `GET /tournaments/<id>`

### 3) Run

```bash
npm run dev
```

Open `http://localhost:3000` (redirects to `/tournaments`).

## Notes (implementation decisions)

- **Modal routing**: I use **Parallel Routes** with an intercepting segment to open the tournament page as a native `<dialog>` on top of the list. The same tournament is also available by a direct URL.
    - Modal over list: `app/tournaments/@modal/(.)[id]`
    - Direct page: `app/tournaments/[id]`
- **Why Parallel + Intercepting Routes**: this pattern scales well for real products, because it keeps URLs real (shareable, back/forward works), while the UI can still show a modal over the list.
- **Server-side search**: the search input updates the `q` query param and the list page fetches data again on the server. This keeps the search shareable by URL and avoids client-side filtering.
- **Why query params for search**: it makes search state part of the URL. You can copy the link, refresh, or use browser navigation and get the same results.
- **Loading UX**: the list uses `app/tournaments/loading.tsx` to show skeleton cards during navigation and search.
- **Why skeletons**: they reduce layout shift and make navigation feel faster while data is loading.
- **Business logic in hooks/helpers**: when a component starts to handle a lot of side effects (URL sync, debounce, scroll locking), I move that logic into a small hook or helper function. This keeps UI components easier to read, test, and reuse.
    - Search logic: `src/hooks/use-query-param-search.ts`
    - Scroll locking: `src/hooks/use-body-scroll-lock.ts` + `src/helpers/utils/lock-body-scroll.ts`
- **Why we lock background scroll for modals**: it prevents the page behind the dialog from moving, which feels more stable and avoids accidental scroll on the background content.
- **Theme**: dark/light mode is applied by toggling the `dark` class on the `<html>` element. The choice is stored in `localStorage` and also supports system theme.

