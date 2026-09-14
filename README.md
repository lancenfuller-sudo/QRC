# Flow Fund — marketing site (V1)

Premium multi-page static site for **Flow Fund** (`flowfund.ai`), an educational framework from **Quantum Ridge Capital LLC** (QRC).

This directory **supersedes** the earlier `/workspace/flowfund-landing/` waitlist concept. Deploy **this** folder as the site root.

- Brand wordmark: `flowfund` with quieter `.ai`
- Location: Viera / Orlando, Florida
- Contact: lfuller@quantumridgecapital.com
- Stack: pure HTML / CSS / JS — no build step

## Local preview

```bash
cd /workspace/flowfund-site
python3 -m http.server 4173
# open http://localhost:4173
```

Root-relative asset paths (`/assets/...`) need a local server; opening `index.html` via `file://` will break CSS/JS.

Typography loads from Google Fonts (Cormorant Garamond + Outfit). Offline, system serif/sans fallbacks still render. Visuals are CSS gradients + SVG (logo, waves, diagram) — no stock photos.

## Cloudflare Pages

1. Push this folder (or a repo whose root is this site) to GitHub/GitLab.
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(empty)*
   - **Output directory:** `/` (site root) — or `flowfund-site` if this folder lives in a monorepo
4. Or **Direct Upload**: drag this folder onto Pages.

Pages will issue a `*.pages.dev` URL immediately.

### Custom domain (DNS)

Point `flowfund.ai` (and `www` if desired) to Cloudflare Pages **when counsel clears public launch**. Until then, use the Pages preview URL. Typical setup: add the custom domain in Pages → follow Cloudflare DNS records for the zone.

## Forms → lfuller@quantumridgecapital.com

All forms use `data-form` + `/assets/js/site.js`:

1. Validate email + consent checkbox  
2. Persist payload to `localStorage` (`flowfund_<formName>`)  
3. Open a **mailto:** draft to `lfuller@quantumridgecapital.com` (conversation, walkthrough, home email capture)

**Before public launch**, wire a real endpoint:

- **Formspree:** uncomment the `fetch` block in `submitRemote()` in `assets/js/site.js`, set your form ID, and optionally remove the mailto branch  
- **Cloudflare Pages Function:** POST JSON to a Function that emails or stores submissions  
- Keep the same validate → persist → calm success UX

Forms:

| Form | Page | `data-form` |
|------|------|-------------|
| Email capture | Home | `email-capture` |
| Conversation | `/conversation/` | `conversation` |
| Walkthrough | `/tools/` | `walkthrough` |

## Compliance notes (non-negotiable)

- Educational framework only — **not** investment, tax, or legal advice  
- **Not** an offer of securities  
- **No** guaranteed returns or performance claims  
- QRC Florida RIA = **planned path / in formation** — **not currently registered**  
- **No** live login, trading, custody, or fake portfolio calculators  
- “Be water” = adaptability metaphor only — **not affiliated with Bruce Lee Estate**  
- Custodians / Microsoft 365 / Grok / Claude = descriptive only; AI research always human-reviewed; **no automated trading**  
- See `/disclosures/` for the full public list  

Counsel should review copy before broad advertising.

## Brand guardrail

Use only **Flow Fund** / `flowfund.ai`. Do not reuse any prior working titles, codenames, or alternate domains in copy, filenames, comments, alt text, or meta tags.

## Site map

| URL | Page |
|-----|------|
| `/` | Home |
| `/philosophy/` | Philosophy |
| `/framework/` | Flow Framework |
| `/steward/` | Steward Current |
| `/open/` | Open Current |
| `/qrc/` | Quantum Ridge Capital |
| `/tools/` | Flow Tools |
| `/insights/` | Insights index |
| `/insights/be-water-with-your-money/` | Essay |
| `/insights/the-vessel-is-not-a-pile/` | Essay |
| `/insights/ice-water-steam/` | Essay |
| `/conversation/` | Start a Flow Conversation |
| `/disclosures/` | Disclosures |

## Assets

- `assets/css/site.css` — shared styles  
- `assets/js/site.js` — nav + forms  
- `assets/img/logo.svg` — circular reservoir + single current  
- `assets/img/logo-mark.svg` — compact mark  

Primary CTA: **Start a Flow Conversation** · Secondary: **See the Flow Framework**
