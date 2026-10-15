# NeauralStack Labs — Official Website

Production-ready static website for **NeauralStack Labs**, a technology services agency
specializing in applied AI/ML engineering, intelligent automation, networking, and
software development.

No framework, no build step, no backend, no recurring infrastructure cost.

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
index.html          Home: hero, services, process, selected work, CTA
services.html       Full service details (4 services, anchor-linked)
approach.html       How we work (5 stages) + why work with us
work.html           Technical demonstrations (3, clearly labeled)
about.html          Team: 7 members with roles + Fiverr links
contact.html        FAQ + project inquiry form (mailto-based)
css/tokens.css      Design tokens (colors, type, spacing, motion)
css/base.css        Reset, typography, layout utilities
css/components.css  All UI components (nav, cards, forms, footer…)
js/main.js          Mobile nav, scroll reveal, year stamp, contact form
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

## SEO & sharing

Every page has: unique title, meta description, canonical URL placeholder, Open Graph
and Twitter card tags, semantic heading hierarchy, and descriptive links. `robots.txt` and
`sitemap.xml` are included. No structured data with unverifiable facts has been added.

## Accessibility

Built to WCAG 2.2 AA practices: skip link, keyboard-operable mobile menu, visible focus
states, labeled form fields with inline error messages, `aria-current` nav state,
sufficient contrast, reduced-motion support, and semantic landmarks.

## Performance

- No external requests: no web fonts, no CDNs, no analytics, no trackers
- All illustrations are inline/local SVG; total CSS+JS is a few tens of KB uncompressed
- Minimal JavaScript (one file, no dependencies)

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
