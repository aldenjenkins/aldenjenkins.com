# aldenjenkins.com

Source for [aldenjenkins.com](https://aldenjenkins.com), built with [Hugo](https://gohugo.io).

## Setup

1. [Install Hugo (extended)](https://gohugo.io/installation/) — v0.154.5 or newer.
2. `git clone https://github.com/aldenjenkins/aldenjenkins.com.git && cd aldenjenkins.com`
3. `hugo server -D` to run locally with drafts enabled.

## Structure

```
aldenjenkins.com/
├── hugo.toml            # site config, menu, params
├── content/
│   ├── _index.md        # homepage front matter
│   ├── contact.md        # contact page
│   ├── success.md        # form-submission success page
│   └── blog/              # blog posts (draft: true posts are excluded from production builds)
├── layouts/
│   ├── index.html        # homepage (portfolio) template
│   ├── 404.html
│   ├── _default/
│   │   ├── single.html   # blog post template
│   │   ├── list.html     # blog index (/blog/) template
│   │   ├── contact.html
│   │   └── success.html
│   └── partials/          # shared head/nav/footer includes
├── assets/scss/           # Sass source, compiled via Hugo Pipes
└── static/                # images, compiled CSS/JS, favicon, robots.txt, CNAME, etc. — served as-is
```

## Common commands

- `hugo server -D` — local dev server with live reload, including drafts
- `hugo` or `hugo --minify` — production build to `public/`
- `hugo new content/blog/my-post.md` — scaffold a new post

## Content notes

- Blog post permalinks are `/blog/<filename>/` (configured in `hugo.toml` under `[permalinks]`), matching the site's original URL structure.
- Feed is served at `/feed.xml` (RSS 2.0); sitemap and robots.txt are handled by Hugo's built-ins plus a static `static/robots.txt`.
- Posts with `draft: true` in front matter are excluded from `hugo`/`hugo --minify` builds and only appear with `hugo server -D` or `hugo -D`.
