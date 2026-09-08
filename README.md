# abelatnafu.com

Abel Atnafu's personal portfolio. Plain HTML, CSS, and vanilla JavaScript —
no build step, no framework, no dependencies to keep up to date. Deploys
anywhere that can serve static files.

## Structure

```
index.html                        Homepage (About, Experience, Work, Writing, Contact)
resume.html                       Printable résumé (button triggers browser print-to-PDF)
404.html                          Custom not-found page
blog/index.html                   Writing / post listing
blog/rebuilding-in-the-open.html  Sample post — shows the pattern for new posts
assets/css/style.css              Design system (colors, type, components)
assets/js/main.js                 Theme toggle, mobile nav, scroll-spy, reveal animations
assets/images/                    Favicon + social preview image
CNAME                             Custom domain for GitHub Pages (abelatnafu.com)
robots.txt / sitemap.xml          Basic SEO plumbing
```

## Content checklist

The structure, design, and copy are done — a handful of specifics still need
your real information. Every placeholder is wrapped in `[brackets]` so
they're easy to find (search the repo for `[` ). Nothing fabricated or
guessed has been left un-bracketed.

- [ ] **`index.html` → About**: the "Currently" line.
- [ ] **`index.html` / `resume.html` → Experience**: three job entries (title, company, dates, bullets).
- [ ] **`resume.html` → Education**: degree, school, dates.
- [ ] **`index.html` → Selected Work**: three project cards (name, description, tech tags, and swap the `#work` placeholder hrefs for real repo/live links).
- [ ] **Skills / Toolbox**: the language and framework tags are a common starter set — edit to match your real stack (`index.html` and `resume.html`, search for `toolbox-group`).
- [ ] **`resume.html`**: `[City, Country]` in the contact line, and the summary paragraph.
- [ ] **Socials**: only Email and GitHub are wired up (both confirmed real). Add LinkedIn/X/etc. in the `.contact-links` block in `index.html` once you have the URLs.
- [ ] Skim `blog/rebuilding-in-the-open.html` — it's real, publishable copy, but read it once and make it sound like you.

The bio paragraphs, hero tagline, and "principles" list are already
written in a real voice — read through them and adjust to taste, but
they're not placeholders.

## Preview locally

No build step — just serve the folder and open it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to abelatnafu.com (GitHub Pages)

1. **Push this repo to GitHub** (already done if you're reading this on GitHub).
2. **Enable Pages**: repo → Settings → Pages → Build and deployment → Source:
   "Deploy from a branch" → branch `main` (or whichever branch you keep live), folder `/ (root)`.
3. **Custom domain**: still in Settings → Pages, enter `abelatnafu.com` under
   "Custom domain" and save (this repo already includes a `CNAME` file with
   that value, so GitHub should detect it automatically). Check "Enforce HTTPS"
   once the certificate is issued.
4. **DNS**: at your domain registrar, point `abelatnafu.com` at GitHub Pages:
   - Four `A` records on the apex (`@`) to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Optionally a `CNAME` record for `www` → `<your-github-username>.github.io`
     if you also want `www.abelatnafu.com` to work.
   - DNS propagation can take anywhere from a few minutes to a few hours.

If you'd rather deploy to Vercel or Netlify instead of GitHub Pages, this
being a plain static site means you can point either at this repo with zero
config (no build command, output directory = repo root) — just remove or
ignore the `CNAME` file, since domain config lives in their dashboards
instead.

## Design notes

- **Fonts**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display
  serif), [Archivo](https://fonts.google.com/specimen/Archivo) (body),
  [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels/meta).
- **Theme**: light/dark tokens live in `assets/css/style.css` under `:root`
  and `:root[data-theme="dark"]`. The toggle in the header persists the
  choice to `localStorage`; with no explicit choice it follows the OS theme.
- **No dependencies**: everything is hand-rolled — no icon fonts, no JS
  libraries, no CSS framework.
