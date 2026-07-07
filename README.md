# Checkout.com — Merchant Onboarding Site

Static, public onboarding guide for **crypto (MCC 6051)** and **iGaming (MCC 7995)** merchants.
English first; a **中文** version follows once the English content is approved.

## Stack
Plain HTML/CSS/JS — no framework, no build step. Deploys to **GitHub Pages** on push to `main`.

## Pages
```
index.html              Home — banner + onboarding team (hover to copy email)
preparation.html        Documents, licensing, requirements
payin.html              Accepting payments + live Flow demo (iframe)
payout.html             Sending funds (card payouts / bank transfers)
fraud-management.html   3DS, risk rules, monitoring
faq.html                Common onboarding questions
```

## Files
```
css/styles.css   Brand tokens + layout
js/main.js       Mobile nav toggle + team email copy-to-clipboard
assets/          Logos (see assets/README.md)
```

The header/nav and footer are duplicated per page (self-contained, no JS dependency for
navigation). The five nav items are stable; content is what changes per page.

## Content status
Section copy is **first-draft skeleton** with `Draft` notes marking where Esteban's detailed
onboarding docs slot in. Edit the HTML directly.

## Local preview
```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Deploy
Push to `main`. In repo **Settings → Pages**, set Source = **GitHub Actions**.

## TODO before launch
- [ ] Replace draft copy with Esteban's onboarding content
- [ ] Confirm brand hex (`#006CFF`) against brand guidelines
- [ ] Confirm the Flow demo embeds publicly (X-Frame-Options / CSP)
- [ ] Approve English → build 中文 version
