# CultureGlow24 — off-site SEO checklist

Do these outside the codebase after deploy. Site assumes `https://cultureglow24.com`.

## Google Search Console

1. Add property for `https://cultureglow24.com` (URL-prefix or Domain).
2. Verify ownership (DNS TXT or HTML meta / file as prompted).
3. Submit sitemap: `https://cultureglow24.com/sitemap.xml`
4. Use URL Inspection on `/`, `/menu`, `/shop`, one product URL — request indexing if needed.
5. Check Coverage / Pages for soft-404s or excluded URLs (`/admin-help`, `/api/*` should stay out).

## Google Business Profile

1. Confirm business name spelling: **CultureGlow24** (match site + JSON-LD).
2. Set address to **Putney High St, London SW15 1SN** (or exact shopfront if different — then update site constants too).
3. Align map pin with site coords: **51.4613, -0.2159** (or update `BUSINESS_LAT` / `BUSINESS_LNG` in `src/lib/constants.ts` to the verified pin).
4. Confirm opening hours match the site / contact page (currently Mon–Fri 8–8, Sat 9–8, Sun 10–6 — placeholders until client signs off).
5. Categories: Ethiopian restaurant / African restaurant + retail if selling lifestyle.
6. Add photos, menu, and website link `https://cultureglow24.com`.
7. Ask happy customers to leave reviews (site already links `GOOGLE_REVIEW_URL`).

## After changes

- Re-fetch homepage in Search Console when NAP or hours change.
- Keep Contentful / static NAP in sync with GBP (address, phone, hours).
