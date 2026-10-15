# Launch Checklist — NeauralStack Labs Website

Everything below needs an **owner decision or action** before the site goes live.
Search the codebase for `TODO(owner)` to find every marked spot.

## Blocking (site should not launch without these)

- [ ] **Confirm the production domain** and replace `https://neauralstacklabs.example/`
      in: canonical URLs, OG/Twitter tags (6 HTML files), `robots.txt`, `sitemap.xml`.
- [ ] **Confirm the contact email** — currently `ferroshes@gmail.com` in `js/main.js`
      and all `mailto:` links. Change if a dedicated business address is preferred.
- [ ] **Review the privacy draft** on `contact.html` (marked "draft — pending owner
      confirmation"). Approve the wording or replace it. Consider adding a real
      privacy policy page.
- [ ] **Review FAQ answers** on `contact.html` — two answers contain explicit owner
      notes (data protection, post-delivery support). Confirm the actual policies and
      rewrite those answers honestly.
- [ ] **Generate the OG share image**: export `assets/og-image.svg` to a 1200×630 PNG
      (e.g. `rsvg-convert -w 1200 -h 630 assets/og-image.svg -o assets/og-image.png`
      or open the SVG in a browser and screenshot at 1200×630), save as
      `assets/og-image.png`, and confirm the OG tags point to it.

## Strongly recommended before launch

- [ ] **Test the contact form end-to-end** in at least two browsers: submit it and
      confirm the email client opens with a correctly prefilled message.
- [ ] **Check mobile layout** on a real phone (nav menu, hero, form).
- [ ] **Proofread all copy** — especially service descriptions, which the owner can
      narrow or expand (`services.html`).
- [ ] **Team profiles**: seven members are listed on `about.html` with roles assigned
      during the build (CEO Khan Ibrahim at top; Rehan, Muhammad Ahtisham, Haris
      Rafique, Laiq Ahmed, Ahtisham ul haq, Muhammad Sajeel). **Confirm each role
      title is correct** and replace them if the members use different ones.
- [ ] **Five member Fiverr URLs missing** — cards for Rehan, Muhammad Ahtisham, Haris
      Rafique, Laiq Ahmed, and Ahtisham ul haq show "Fiverr profile — pending".
      When supplied, convert their cards to `<a>` links (a TODO comment in
      `about.html` shows exactly how). Known profiles: Khan Ibrahim →
      `fiverr.com/sellers/ibrahim5665`, Muhammad Sajeel → `fiverr.com/shadowx0101`.
- [ ] **Fiverr links are external** (`target="_blank" rel="noopener noreferrer"`) —
      confirm `fiverr.com/sellers/ibrahim5665` is the correct agency/seller URL.

## Optional / post-launch

- [ ] Add a privacy policy page and link it from the footer.
- [ ] Replace the mailto form with a form service (Formspree/Netlify Forms) if
      mailto proves too clunky for visitors — markup is already portable.
- [ ] Publish real client case studies on `work.html` (cards are designed to accept
      repository / live-demo / write-up links; the "pending" labels are intentionally
      non-clickable and must be replaced, not left live).
- [ ] Add analytics only if explicitly desired and privacy-reviewed (none is present
      by design).
- [ ] Set up a favicon PNG / Apple touch icon if a PNG version is wanted
      (SVG favicon already works in all modern browsers).

## Do not do

- [ ] Do not add fake testimonials, client logos, metrics, or team credentials.
- [ ] Do not present the three demonstration cards as client work.
- [ ] Do not add API keys or secrets to any frontend file.
