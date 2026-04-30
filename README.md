# darion-splash

Brand-Splash für [darion.ai](https://darion.ai/) — verweist auf [landing.darion-ai.de](https://landing.darion-ai.de/).

## Konzept

Single-Screen Brand-Anchor. Hero (Wordmark + Claim) + 3 Trust-Anker + 1 primärer CTA → `landing.darion-ai.de`.

Vollständiges Konzept: `darion-vault/Projects/darion-ai-splash-page-2026-04-30.md`

## Stack

- **[Astro](https://astro.build/)** v5 (zero-JS-Default)
- **[Cloudflare Pages](https://pages.cloudflare.com/)** als Host
- Inline-CSS, keine externen Abhängigkeiten
- Page-Weight ~52 KB total

## Lokal entwickeln

```bash
pnpm install
pnpm dev          # http://127.0.0.1:4321
pnpm build        # → dist/
pnpm preview      # serve dist/ lokal
```

## Build-Time Env-Vars

| Variable | Beispiel | Wirkung |
|---|---|---|
| `PUBLIC_PLAUSIBLE_HOST` | `plausible.darion.ai` | Wenn gesetzt, wird das Plausible-Snippet eingebunden. Ungesetzt = kein Tracking. |

In Cloudflare Pages: *Settings → Environment Variables → Production*.

## Kritisch: Matrix-Federation

`darion.ai` liefert Matrix Well-Known Discovery aus. Diese Endpoints **müssen** unverändert bleiben, sonst bricht die Synapse-Federation:

```
GET /.well-known/matrix/server  → {"m.server":"chat.darion.ai:443"}
GET /.well-known/matrix/client  → {"m.homeserver":{"base_url":"https://chat.darion.ai"}}
```

Die JSONs liegen als statische Files in `public/.well-known/matrix/` und der `_headers`-File setzt `Content-Type: application/json` + CORS.

**Vor jedem Deploy:** `curl <pages.dev>/.well-known/matrix/server` muss exakt obigen Wert liefern.

## Deployment

1. CF-Pages-Project mit GitHub-Repo verbinden
2. Build-Settings: `pnpm build`, Output: `dist`, Node 20+
3. Custom Domain: `darion.ai` + `www.darion.ai`
4. Pre-Cutover: Matrix-Well-Known auf `*.pages.dev` verifizieren
5. DNS-Cutover via CNAME
6. Post-Cutover: [federationtester.matrix.org](https://federationtester.matrix.org/) für `darion.ai` muss grün bleiben

## Lizenz

Proprietär — DARC Management.
