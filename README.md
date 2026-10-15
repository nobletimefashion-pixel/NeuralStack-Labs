# NeauralStack Labs — Official Website

Production-ready static website for **NeauralStack Labs**, a technology services agency
specializing in applied AI/ML engineering, intelligent automation, networking, and
software development.

Light corporate theme with a mega-menu navigation, a rotating hero slider, and a
scripted chat assistant. No framework, no build step, no backend, no recurring
infrastructure cost.

## Run locally

Any static file server works. From this directory:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with Node (if installed):

```bash
npx serve .
```

> Opening `index.html` directly via `file://` also works for browsing, but serving over
> HTTP is recommended so relative paths and browser security behave like production.

## Project structure

```
index.html          Home: hero slider, services, process, selected work, CTA
services.html       Full service details (4 services, anchor-linked)
approach.html       How we work (5 stages) + why work with us
work.html           Technical demonstrations (3, clearly labeled)
about.html          Team: 7 members with roles + Fiverr links
contact.html        FAQ + project inquiry form (mailto-based)
css/tokens.css      Design tokens (colors, type, spacing, motion)
css/base.css        Reset, typography, layout utilities
css/components.css  All UI components (nav, cards, forms, footer…)
js/main.js          Mega-menu nav, scroll reveal, year stamp, contact form
js/hero-slider.js   Home page hero slider (autoplay, pause, reduced-motion)
js/chatbot.js       Scripted assistant (services, budgets, contact)
assets/             Logo, favicon, Open Graph image source
robots.txt          Crawler rules
sitemap.xml         Sitemap
vercel.json         Static-deployment config for Vercel
LAUNCH_CHECKLIST.md Every owner action still required
```

## Configure before launch

All placeholders are marked with `TODO(owner)` in the source. The main ones:

| What | Where | Current value |
|---|---|---|
| Production domain | `<link rel="canonical">`, OG/Twitter tags in every `.html`; `robots.txt`; `sitemap.xml` | `https://neuralstack-labs.vercel.app` |
| Contact email | `js/main.js` (`CONTACT_EMAIL`), `mailto:` links in every page, `contact.html` form `action` | `ferroshes@gmail.com` |
| OG image PNG | Export `assets/og-image.svg` to a 1200×630 PNG, update OG tags | referenced as `assets/og-image.png` (does not exist yet) |
| Fiverr links | Footer + contact page (`ibrahim5665`); team cards on `about.html` | added — 5 member cards still lack Fiverr URLs (marked "pending") |
| Team roles | `about.html` team grid | assigned by build — owner should confirm each title |
| Budget ranges | `js/chatbot.js` → `CONFIG.budgetRanges` | placeholder planning bands — owner must confirm real numbers |
| Privacy policy | `contact.html` (draft note marked "pending owner confirmation") | draft only |
| Legal pages | footer (comment marks the spot) | none |

### Changing the contact email

1. `js/main.js` — update `var CONTACT_EMAIL = "…";`
2. Replace `mailto:ferroshes@gmail.com` in all six HTML files (form `action` + footer/contact links).

## How the contact form works (and its limits)

The form is a **mailto flow**: on submit, JavaScript validates the fields and opens the
visitor's own email application with a prefilled message to the configured address.
Nothing is stored or transmitted by the website itself.

- **Fallback:** if JavaScript is disabled or the mail client does not open, a visible
  "Email us directly" link (`mailto:`) always works.
- **Limits:** the visitor must have a configured email application. Some webmail-only
  setups handle `mailto:` poorly. For a server-backed alternative (e.g. Formspree,
  Netlify Forms), swap the `<form>` handler in `contact.html` and remove the mailto logic
  in `js/main.js` — the markup is already standard and portable.

## Chat assistant (scripted, not AI)

`js/chatbot.js` powers a small "Ask NeauralStack" widget on every page. It is a
**deterministic keyword matcher** — no AI API, no network calls, no data leaves the
browser. It answers: services, budget ranges, timelines, process, team, and contact,
and hands off to a human for anything it does not recognise.

**Owner edit:** update `CONFIG.budgetRanges` in `js/chatbot.js` with your real
indicative numbers. The ranges are always shown with a "planning range only, quoted
after discovery" disclaimer — keep it that way.

## Hero slider (home page only)

`js/hero-slider.js` rotates four slides (AI/ML, automation, networking, programming),
each with a "Learn More" CTA to the matching service anchor. Autoplay pauses on
hover/focus and is disabled entirely under `prefers-reduced-motion`. Without JS the
first slide stays visible.

## SEO & sharing

Every page has: unique title, meta description, canonical URL placeholder, Open Graph
and Twitter card tags, semantic heading hierarchy, and descriptive links. `robots.txt` and
`sitemap.xml` are included. No structured data with unverifiable facts has been added.

## Accessibility

Built to WCAG 2.2 AA practices: skip link, keyboard-operable mega-menu (hover on
desktop, tap on mobile, Escape closes), slider with pause and labeled controls,
chat assistant with `role="log"` announcements, visible focus states, labeled form
fields with inline error messages, `aria-current` nav state, sufficient contrast,
reduced-motion support, and semantic landmarks.

## Performance

- No external requests: no web fonts, no CDNs, no analytics, no trackers
- All illustrations are inline/local SVG; total CSS+JS is a few tens of KB uncompressed
- Minimal JavaScript (three small dependency-free files)

## Privacy & security

- No cookies, no analytics, no tracking of any kind
- No API keys or secrets in frontend code
- No password or payment collection
- The mailto flow does not claim to store or securely transmit anything
- Privacy wording on the contact page is a **draft** and is marked as requiring owner
  confirmation

## Deploying (Vercel)

The site is fully static — no build step, no install step. A `vercel.json` is included
that forces the correct static settings:

```json
{
  "framework": null,
  "buildCommand": null,
  "installCommand": null,
  "outputDirectory": "."
}
```

**Important:** in the Vercel dashboard, set **Framework Preset → Other** (not Python,
not Next.js). Build Command and Install Command: empty. Output Directory: `.`.
Then deploy — pages are served directly from the repo root.

After deployment, confirm the canonical/OG URLs in the HTML, `robots.txt`, and
`sitemap.xml` match the final domain (`https://neuralstack-labs.vercel.app` today;
update them if a custom domain is attached later).

Works on any static host: GitHub Pages, Cloudflare Pages, and Netlify also work —
build command: none; output directory: the repo root.
