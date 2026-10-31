<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bangla News 24

Bengali news site on Next.js 16 App Router. UI copy is Bengali; code and comments are English.

## Project shape

- JavaScript/JSX only — no TypeScript source or tooling. `@/*` maps to `src/*` through `jsconfig.json`.
- `src/app` = App Router routes. `src/components` = shared UI. `src/lib` = API/auth helpers (`news.js`, `auth.js`, `auth-client.js`).
- `src/proxy.js` is the Next 16 auth proxy (the old `middleware` convention). It protects only `/news/:path*`; add new protected routes to its `matcher`.
- News data is fetched directly from `https://news-api-v2.vercel.app/api/...`. The base URL and fetch helper live in `src/lib/news.js` (`NEWS_API_BASE`, `fetchNewsApi`); do not hardcode the host elsewhere. There is no local API layer, so dev/build require network access.
- `src/lib/news.js` also owns `isArticle`, which excludes `type: "link"` entries and BBC `/live/` pages because neither has a renderable detail page. Card lists must use it.
- Global layout is data-dependent: `Header` -> `Navlinks` and `Marquee` fetch categories/news outside the page-level Suspense. Both use `fetchNewsApi`, which returns `null` on failure instead of throwing.
- Auth is Better Auth + MongoDB: `src/lib/auth.js` (database `banglanews`), `src/lib/auth-client.js`, catch-all handler at `src/app/api/auth/[...all]/route.js`. Required env: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_DB_URL`, `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`.
- `src/lib/auth-client.js` exports `signIn`, `signUp`, `signOut`, and `useSession` from the configured client; keep that single client and do not add a second bare `createAuthClient()`.
- `next.config.mjs` only allows remote images from `ichef.bbci.co.uk`. Add a `remotePatterns` entry before using another host with `next/image`.
- Article detail route: `src/app/news/[newsId]/page.jsx` (protected by `src/proxy.js`), with `error.jsx` and the shared `ErrorState`. Static pages: `/about`, `/contact`, `/privacy-policy`, `/terms`.

## Next 16 caching quirks

- `cacheComponents: true`, `partialPrefetching: true`, and `reactCompiler: true` are enabled. PPR is the default: pages render a static shell and stream dynamic content; keep data-dependent components inside `<Suspense>`.
- Do not add route segment configs (`dynamic`, `revalidate`, `fetchCache`); they error under Cache Components. Existing fetches use `next: { revalidate: 60 }`; for component/function-level caching use `'use cache'` plus `cacheLife`.
- `params` are async (`await params`). `src/app/news/[newsId]/page.jsx` also calls `connection()` to force request-time rendering.
- Client components cannot call `usePathname()` outside `<Suspense>` during prerender; `MobileNav` avoids it deliberately.

## Commands and verification

- `npm install` (npm + `package-lock.json`; do not switch package managers).
- `npm run dev` — Next dev server with Turbopack.
- `npm run lint` — full-repo ESLint. Focus with `npx eslint src/components/NewsCard.jsx`.
- `npm run build` then `npm start` — production build/run. The build renders pages from the live news API, so it needs network access. Port 3000 may already be in use; `npm start -- -p 3001` works.
- No test suite or typecheck script exists. Do not assume `npm test` works.
- To test `/news/:id` locally with curl, first create a session via `POST /api/auth/sign-up/email` and pass the `better-auth.session_token` cookie; unauthenticated requests redirect to `/sign-up`.
- If `next build` finishes route generation and then stops with `SecurityFatalError`, that is Next's security-advisory gate, not an app build failure; follow its upgrade command or retry.

## Conventions

- Use `next/link` and `next/image`; do not introduce plain `<img>` for news images.
- Styling mixes Tailwind 4, daisyUI 5 (`card`, `card-body`, `bg-base-100`), and HeroUI 3 components (for example `Button` uses `onPress`, not `onClick`). `globals.css` wires all three; there is no `tailwind.config`.
- Files in `src/app` mix `.js` and `.jsx`; match the neighboring file's extension and style.
- The managed `nextjs-agent-rules` block above (and any `nextjs-agent-feedback` block added by `next dev`) must be kept and committed, not removed.
