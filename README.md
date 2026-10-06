# Culture Glow (CultureGlow24)

The marketing and ordering website for CultureGlow24, an Ethiopian ("Habesha") restaurant,
coffee, and lifestyle brand. It presents the menu, shop products, catering packages, gallery,
and contact/catering enquiry forms, and drives customers to WhatsApp for ordering. Built and
operated by Techally Consult on behalf of the CultureGlow24 client.

## Status

- **Version**: `0.1.0` (see `package.json`). Releases are release-candidate tags
  (`vX.Y.Z-rc.N`) cut automatically on every push to `main`; see
  [Deployment](#deployment).
- **Environment in use**: `dev`, deployed to the `dev` namespace of the Techally Consult
  Kubernetes cluster from the `culture-glow-web` image. No staging or production environment
  exists yet in this repository.
- **Team lead**: see `CODEOWNERS` (or ask in the project's Slack/Teams channel) for the current
  owner. This README does not hardcode a name so it doesn't go stale.

## Architecture

Culture Glow is a single Next.js 16 application (App Router, React 19, TypeScript) with no
separate backend service. It is server-rendered/statically generated and deployed as one
Docker image.

```
Browser
  │
  ▼
Next.js app (App Router, standalone output)
  ├─ Static/marketing pages: /, /about, /shop, /shop/[slug], /menu, /catering, /gallery, /contact
  ├─ API routes (Route Handlers):
  │    /api/contact    → validates + rate-limits + sends email via Resend
  │    /api/catering   → same, for catering enquiries
  │    /healthz         → liveness/readiness probe for Kubernetes
  └─ Content layer (see below)
        │
        ├─ Contentful (optional, Phase 1 — Home/Shop/Menu copy + Products/Menu catalogue)
        └─ Local fallback: content/*.json (client-editable) + src/lib/content, src/lib/data
```

**Content layer.** The app always reads marketing copy and catalogue data from **Contentful**
(`src/lib/contentful/`). Local JSON/TypeScript (`content/*.json`, `src/lib/content/`,
`src/lib/data/`) is used only as a fallback when Contentful is empty or errors.

`src/lib/contentful/queries.ts` always uses the Contentful store. Contentful content and
`NEXT_PUBLIC_*` values are baked into the Docker image at `next build` and cannot be changed
by editing a running Deployment — see [CONTENTFUL.md](./CONTENTFUL.md) and the comments in
`Dockerfile` and `.env.local.example`.

**External integrations:**

- **Contentful** — CMS for Home/Shop/Menu page copy and the Product/Menu catalogue (Phase 1
  only; About/Catering/Gallery/Contact remain TypeScript-only for now). See
  [CONTENTFUL.md](./CONTENTFUL.md).
- **Resend** — transactional email for the Contact and Catering forms (`src/app/api/contact`,
  `src/app/api/catering`).
- **MapLibre GL + OpenStreetMap tiles** — the location map on the Contact page
  (`src/components/contact/LocationMap`, `MapEmbed`).
- **TikTok / Instagram embeds** — social proof sections on the Home and Gallery pages
  (allow-listed in the Content-Security-Policy in `next.config.ts`).
- **Google Analytics** (optional) — enabled by setting `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **WhatsApp** — the primary ordering channel; the WhatsApp number is a public, build-time
  value (`NEXT_PUBLIC_WHATSAPP_NUMBER`).

There is no database. Persistent state lives in Contentful, with `content/*.json` as the
offline/error fallback.
## Requirements

| Tool | Version |
| --- | --- |
| Node.js | 22.x (matches the `node:22-alpine` image used in `Dockerfile`) |
| npm | Bundled with Node 22. **npm is the package manager this repo builds with** — `Dockerfile` and CI run `npm ci`. A `pnpm-lock.yaml` is also present; if you use `pnpm` locally, keep `package-lock.json` in sync or expect CI/Docker builds to diverge from your local install. |
| Docker | Any recent version, only needed to build/run the production image locally |

There is no local database, queue, or other infrastructure dependency — the app talks to
Contentful and Resend over HTTPS when those integrations are enabled.

## Setup

```bash
git clone https://github.com/Techally-Consult/culture-glow.git
cd culture-glow
cp .env.local.example .env.local   # request real Resend/Contentful values through the password manager
npm install
npm run dev
```

The app is now running at `http://localhost:3000`. Set `CONTENTFUL_SPACE_ID` and
`CONTENTFUL_DELIVERY_TOKEN` in `.env.local` so pages pull live CMS data. If those are
missing or Contentful errors, the app falls back to `content/*.json` / `src/lib/content/*`.

To seed or edit content in Contentful, follow [CONTENTFUL.md](./CONTENTFUL.md) (bootstrap the
content model, then seed entries and assets). That guide must be run from your own machine —
the sandbox this repo may be opened in cannot reach Contentful.
## Environment variables

All variables are documented inline in [`.env.local.example`](./.env.local.example); copy it to
`.env.local` and fill in real values. Summary:

| Variable | Required | When it's read | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No (has a placeholder default) | Build time | WhatsApp number used by "Order Now" links. Baked into the client bundle. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Build time | Google Analytics measurement ID. Baked into the client bundle. |
| `RESEND_API_KEY` | Yes, for the forms to work | Runtime, inside `/api/contact` and `/api/catering` | Resend API key used to send enquiry emails. |
| `CONTACT_FORM_RECIPIENT_EMAIL` | Yes, for `/api/contact` | Runtime | Recipient address for the Contact form. |
| `CATERING_FORM_RECIPIENT_EMAIL` | Yes, for `/api/catering` | Runtime | Recipient address for the Catering form. |
| `CONTENTFUL_SPACE_ID` | Yes (for live CMS) | Build time | Contentful space to read from. |
| `CONTENTFUL_ENVIRONMENT` | No (defaults to `master`) | Build time | Contentful environment name. |
| `CONTENTFUL_DELIVERY_TOKEN` | Yes (for live CMS) | Build time | Read-only Content Delivery API token. |
| `CONTENTFUL_PREVIEW_TOKEN` | No | Build/runtime | Preview API token, for draft content (Phase 2 preview mode). |
| `CONTENTFUL_MANAGEMENT_TOKEN` | Only for `scripts/contentful/*` | Used only by the bootstrap/seed scripts, never by the Next.js app itself | Write-scoped Content Management API token. Rotate it in Contentful if it is ever exposed (e.g. pasted into chat). |

Build-time vs runtime matters for the Kubernetes deployment: everything marked "Build time"
above is baked into the Docker image and can only be changed by rebuilding and redeploying, not
by editing the running Deployment. Only the runtime variables are backed by a Kubernetes
Secret. See the full explanation at the top of `.env.local.example` and in `Dockerfile`.

Never commit `.env.local` or real secrets. If a secret is committed or pasted somewhere insecure
(including into an AI chat), treat it as compromised and rotate it immediately.

## Running tests

There is currently no automated test suite in this repository (no `test` script in
`package.json`, no `*.test.*`/`*.spec.*` files). Available checks are linting and type checking:

```bash
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

Run both before opening a pull request. Adding real tests (unit/integration/e2e) is open work —
follow the Testing standard in the engineering handbook when that work is picked up.

## Project structure

```
culture-glow/
├── src/
│   ├── app/                 # Next.js App Router: one folder per route
│   │   ├── page.tsx              # Home
│   │   ├── about/, shop/, shop/[slug]/, menu/, catering/, gallery/, contact/
│   │   ├── api/contact/, api/catering/   # Route Handlers backing the forms
│   │   └── healthz/              # Kubernetes liveness/readiness probe
│   ├── components/          # UI, grouped by page/section (home/, shop/, about/, ui/, ...)
│   ├── hooks/                # Shared React hooks
│   ├── lib/
│   │   ├── content/               # TypeScript fallback copy, one file per page
│   │   ├── data/                  # TypeScript fallback catalogue (menu, products, social)
│   │   ├── contentful/            # Contentful client, store, mappers, rich text renderer
│   │   ├── rate-limit.ts          # In-memory rate limiter for the form API routes
│   │   ├── logger.ts              # Minimal structured logger for API routes
│   │   └── utils.ts
│   └── styles/               # Shared CSS not expressed as Tailwind utilities
├── content/                 # Client-editable JSON: source of truth for products, menu, and
│                             # page copy while Contentful is disabled — see content/README.md
├── scripts/contentful/      # bootstrap.ts (content model) and seed.ts (entries + assets).
│                             # Excluded from the Docker build context; requires a write-scoped
│                             # Contentful Management token. Run locally only, see CONTENTFUL.md
├── public/                  # Static assets: images (assets/), icons, robots.txt, sitemap.xml
├── .github/workflows/       # CI/CD pipeline (deploy-dev.yml)
├── Dockerfile                # Multi-stage build producing the standalone runtime image
├── next.config.ts            # Image config and the Content-Security-Policy header
├── components.json           # shadcn/ui configuration
├── AGENTS.md / CLAUDE.md     # Instructions for AI coding agents working in this repo
└── CONTENTFUL.md             # Step-by-step guide to bootstrapping and seeding Contentful
```

## Deployment

- **Trigger**: every push to `main` runs `.github/workflows/deploy-dev.yml`.
- **Versioning**: the workflow computes a release-candidate tag from the most recent `v*.*.*`
  git tag plus the number of commits since it (`vX.Y.(Z+1)-rc.N`). With no tag yet in the repo,
  it falls back to `v0.0.0` as the anchor so the pipeline still works. To take control of the
  version, push an anchor tag: `git tag v0.1.0 && git push origin v0.1.0`.
- **Build**: the workflow builds the Docker image from `Dockerfile` and pushes it to
  `ghcr.io/techally-consult/culture-glow-web`, tagged with both the computed version and the
  commit SHA. Build args (WhatsApp number, GA ID, Contentful config) come from repo Variables
  and Secrets — see the comments in `deploy-dev.yml` for exactly which is which.
- **Rollout**: the workflow then checks out the separate `Techally-Consult/k8s-gitops` repo and
  updates `clusters/dev/apps/culture-glow-web/kustomization.yaml` with the new image tag. Flux
  picks up the change within about 5 minutes and rolls out the new image to the `dev` namespace.
  This repository does not contain the Kubernetes manifests themselves — they live in
  `k8s-gitops`.
- **Only one environment today**: `dev`. There is no staging or production pipeline configured
  in this repository yet.
- **Rollback**: revert or fix forward the offending commit on `main`, or manually set
  `images[0].newTag` back to a previous known-good tag in the `k8s-gitops` kustomization and
  push — Flux will reconcile to that tag.
- **Runtime secrets** (`RESEND_API_KEY`, the recipient emails, and the Contentful tokens used
  for preview/revalidation) are not part of this repository or the image; they live in
  Kubernetes Secrets (`culture-glow-secrets`, `culture-glow-contentful-secrets`) in the `dev`
  namespace and are managed outside this repo.

## Data handling

This project does not process health data. It does collect limited personal data through the
Contact and Catering forms (name, email address, free-text message) which is emailed via Resend
to the client's inbox and is not stored in a database by this application. Basic input
validation and per-IP rate limiting are applied in `src/app/api/contact` and
`src/app/api/catering` before any email is sent.

## Interoperability

This is a marketing/e-commerce-adjacent site, not a health-data or clinical system, so it does
not implement FHIR or similar interoperability profiles. Its external integrations are
commercial APIs (Contentful, Resend, MapLibre/OpenStreetMap, TikTok/Instagram embeds, Google
Analytics), documented in [Architecture](#architecture) above and, for Contentful specifically,
in [CONTENTFUL.md](./CONTENTFUL.md).

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Content edits in `content/*.json` don't show up | App always prefers Contentful. Local JSON only appears when Contentful is empty/errors or space/token env is missing. |
| Contentful edits don't show up | The entry must be **Published**, not just saved as a draft. There is no on-demand revalidation yet (Phase 2), so also try a hard refresh or restart `next dev` / rebuild. Confirm `CONTENTFUL_SPACE_ID` + `CONTENTFUL_DELIVERY_TOKEN` are set. |
| `/api/contact` or `/api/catering` returns 500 "Form is not fully configured yet" | `RESEND_API_KEY` or the relevant `*_RECIPIENT_EMAIL` variable is missing from `.env.local` (or from the Kubernetes Secret in a deployed environment). |
| Images from Contentful 404 in the browser | Contentful image domains must be allow-listed in `next.config.ts` under `images.remotePatterns`; this is already set up for `images.ctfassets.net`, but check first if you've changed the image config. |
| `npm run type-check` or `npm run lint` fails on a file you didn't touch | Run `npm install` again to make sure your local `node_modules` matches `package-lock.json`; divergence between the `npm` and `pnpm` lockfiles is a known rough edge (see [Requirements](#requirements)). |

## Contributing

See the [Techally Consult Engineering Handbook](https://github.com/Techally-Consult/techally-engineering-handbook).