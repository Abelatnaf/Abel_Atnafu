# abelatnafu.com

Abel Atnafu's personal portfolio. Plain HTML, CSS, and vanilla JavaScript —
no build step, no framework, no dependencies to keep up to date. Deploys
anywhere that can serve static files.

The homepage uses a dark technical theme (`assets/css/site.css`). It is
dark-only by design — there is no light mode and no theme toggle on that
page. `resume.html` and `blog/` still run on the older light/warm
stylesheet (`assets/css/style.css`) and have not been ported yet.

## Structure

```
index.html                        Homepage (Hero, About, Selected Work, Stack, Contact)
resume.html                       Printable résumé (button triggers browser print-to-PDF)
404.html                          Custom not-found page
blog/index.html                   Writing / post listing
blog/rebuilding-in-the-open.html  Sample post — shows the pattern for new posts
assets/css/site.css               Homepage design system (dark theme)
assets/js/site.js                 Mobile nav, scroll-spy, reveal animations
assets/css/style.css              Older light theme — still used by resume.html and blog/
assets/js/main.js                 Older script — still used by resume.html and blog/
assets/images/                    Favicon + social preview image
CNAME                             Custom domain for GitHub Pages (abelatnafu.com)
robots.txt / sitemap.xml          Basic SEO plumbing
```

## Content checklist

Placeholders are wrapped in `[brackets]` so they're easy to find — search
the repo for `[`. Nothing fabricated has been left un-bracketed.

**Homepage (`index.html`)**

- [ ] **About → Currently**: the one-line "what I'm working on now".
- [ ] **About → Based**: city and country.
- [ ] **Selected Work**: a one-line description for each of the three
      projects. The project names and their live URLs are real and
      verified; only the descriptions are placeholders.
- [ ] **Hero copy**: "Full-stack developer & freelancer" and "Available for
      select projects" are claims, not facts pulled from anywhere — confirm
      both still describe you before sharing the site.
- [ ] **Stack**: the four columns list a plausible stack. Trim anything you
      wouldn't want to be asked about in an interview.

**Résumé (`resume.html`)** — still on the old stylesheet, still carries its
original placeholders: Experience (three roles), Education, City/Country,
and the summary paragraph.

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
