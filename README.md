# Checkout.com — Merchant Onboarding Site

Static, public onboarding guide for **crypto (MCC 6051)** and **iGaming (MCC 7995)** merchants.
English by default with a **中文** toggle. Includes a live Flow payment demo embedded via iframe.

## Stack
Plain HTML/CSS/JS — no framework, no build step. Deploys to **GitHub Pages** on push to `main`.

## Structure
```
index.html          Page shell + sections (data-i18n keys)
css/styles.css      Brand tokens + layout
js/i18n.js          Language engine (EN/中文, localStorage)
i18n/en.json        English strings
i18n/zh.json        Chinese strings
assets/             Logo + brand assets (see assets/README.md)
.github/workflows/  GitHub Pages deploy
```

## Content model
**Unified** — one set of onboarding content covering both verticals, with inline
`crypto` / `iGaming` notes where requirements differ. See the `.note` blocks in `index.html`.

> ⚠️ Section copy is **placeholder** pending Esteban's onboarding docs. Edit `i18n/*.json`
> (both languages) to update text — the HTML holds only fallback English.

## Local preview
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
(Serve over HTTP, not `file://`, so `fetch()` for the i18n JSON works.)

## Deploy
Push to `main`. In repo **Settings → Pages**, set Source = **GitHub Actions**.

## TODO before launch
- [ ] Replace placeholder logo with official Checkout.com assets (`assets/README.md`)
- [ ] Confirm brand hex values against brand guidelines
- [ ] Replace placeholder section copy with Esteban's onboarding content (EN + 中文)
- [ ] Confirm the Flow demo URL / any embed restrictions
