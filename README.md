# Fanta UI

A small collection of drop-in CSS themes — a fantasy-flavored Bootstrap+Tailwind hybrid, and three brand-inspired themes (Claude/Anthropic, Instagram, Facebook) — plus a tiny dependency-free JS helper for the interactive bits. No build step, no framework required. Copy a file in, link it, done.

<p>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="no dependencies" src="https://img.shields.io/badge/dependencies-0-brightgreen.svg">
  <img alt="pure css" src="https://img.shields.io/badge/CSS-pure-1572B6.svg?logo=css3&logoColor=white">
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-orange.svg">
</p>

## Table of contents

- [What's in here](#whats-in-here)
- [Quick start](#quick-start)
- [Using it in your project](#using-it-in-your-project)
  - [Plain HTML](#plain-html)
  - [React / Next.js](#react--nextjs)
  - [Vue / Nuxt](#vue--nuxt)
  - [Svelte / SvelteKit](#svelte--sveltekit)
  - [Angular](#angular)
  - [PHP (plain / Laravel / WordPress)](#php-plain--laravel--wordpress)
  - [Python (Flask / Django)](#python-flask--django)
  - [Static site generators](#static-site-generators-astro--hugo--jekyll)
- [Switching themes at runtime](#switching-themes-at-runtime)
- [Component cheatsheet](#component-cheatsheet)
- [fanta.js — interactive components](#fantajs--interactive-components)
- [Customizing a theme](#customizing-a-theme)
- [Suggested repo structure](#suggested-repo-structure)
- [Brand-inspired themes — please read](#brand-inspired-themes--please-read)
- [Contributing](#contributing)
- [Growing this project](#growing-this-project)
- [License](#license)

## What's in here

| File | What it is | Best for |
|---|---|---|
| `fanta.css` | Dark-first fantasy theme with a Bootstrap-shaped utility layer (`.container`/`.row`/`.col-*`, `.btn-*`, `.badge-*`) and Tailwind-style extras (color scales, `text-xs`→`text-6xl`, `sm:`/`md:`/`lg:` prefixes) | Apps, dashboards, dev tools — anything that wants dark mode by default |
| `fanta.js` | ~100-line vanilla JS companion for `fanta.css`'s dropdown, modal, offcanvas, tabs, accordion, and popover | Any project already using `fanta.css`'s interactive components |
| `claude-style.css` | Warm, editorial theme — cream background, ink text, one terracotta accent | Docs sites, blogs, calm technical products |
| `instagram-style.css` | White feed UI with the signature warm gradient used sparingly as an accent | Social/photo feeds, story rings, gallery apps |
| `facebook-style.css` | Light-grey feed on white cards, single blue accent | Social feeds, activity walls, comment threads |

Each CSS file is self-contained — you only need the one(s) you're using. `fanta.js` only matters if you're using `fanta.css`'s dropdown/modal/offcanvas/tabs/accordion/popover.

## Quick start

**Option A — download and self-host (recommended):**

```bash
curl -O https://raw.githubusercontent.com/<your-username>/<your-repo>/main/fanta.css
```

```html
<link rel="stylesheet" href="/path/to/fanta.css">
```

**Option B — CDN via jsDelivr**, once your repo is public (no build or publish step needed — jsDelivr serves straight from GitHub):

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/<your-username>/<your-repo>@main/fanta.css">
```

Pin to a tag instead of `@main` once you cut a release, so a future change to `main` can't break sites depending on you:

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/<your-username>/<your-repo>@v1.0.0/fanta.css">
```

**Option C — npm**, if you publish the package (see [Growing this project](#growing-this-project)):

```bash
npm install fanta-ui
```

```js
import "fanta-ui/fanta.css";
```

## Using it in your project

The stylesheets are plain CSS with no preprocessor and no custom syntax, so "using" one is really just "getting a `<link>` (or an `import`) into your build." Below is that one step for the frameworks and languages people ask about most.

### Plain HTML

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <link rel="stylesheet" href="fanta.css">
  <script src="fanta.js" defer></script>
</head>
<body>
  <button class="btn btn-primary">Hello</button>
</body>
</html>
```

### React / Next.js

Copy the CSS file into `src/styles/` (or `app/` in Next's App Router) and import it once, at the root:

```jsx
// Next.js: app/layout.jsx
import "./styles/fanta.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
```

```jsx
// Create React App / Vite: src/main.jsx
import "./styles/fanta.css";
```

`fanta.js` manipulates the DOM directly (`classList.toggle`), so in React it's usually simpler to reimplement dropdown/modal open-state with `useState` and just borrow the CSS classes (`.modal.show`, `.dropdown-menu.show`) — but if you want the file as-is, load it the same way as any other non-module script and keep using the `data-toggle` attributes in your JSX.

### Vue / Nuxt

```js
// Vue (Vite): src/main.js
import "./assets/fanta.css";
```

```js
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["~/assets/fanta.css"],
});
```

`fanta.js` can be dropped in `public/` and loaded via `app.head.script` in `nuxt.config.ts`, or reimplemented with Vue's reactive state the same way as the React note above.

### Svelte / SvelteKit

```js
// src/routes/+layout.svelte
<script>
  import "../fanta.css";
</script>
```

### Angular

```json
// angular.json
"styles": [
  "src/styles/fanta.css",
  "src/styles.css"
],
"scripts": [
  "src/styles/fanta.js"
]
```

### PHP (plain / Laravel / WordPress)

**Plain PHP:**

```php
<link rel="stylesheet" href="/assets/css/fanta.css">
```

**Laravel (Blade)**, put the file in `public/css/` and reference it with the `asset()` helper so it works regardless of your app's base URL:

```blade
<link rel="stylesheet" href="{{ asset('css/fanta.css') }}">
```

**WordPress**, enqueue it properly instead of hardcoding a `<link>` in `header.php`, so WordPress can manage caching/versioning for you:

```php
// functions.php
function fanta_enqueue_styles() {
    wp_enqueue_style('fanta-css', get_template_directory_uri() . '/css/fanta.css', [], '1.0.0');
}
add_action('wp_enqueue_scripts', 'fanta_enqueue_styles');
```

### Python (Flask / Django)

**Flask**, place the file in `static/css/` and reference it with `url_for` so paths stay correct if you ever change your static folder config:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/fanta.css') }}">
```

**Django**, place it under your app's `static/` directory and load the static template tag:

```html
{% load static %}
<link rel="stylesheet" href="{% static 'css/fanta.css' %}">
```

Remember to run `python manage.py collectstatic` before deploying.

### Static site generators (Astro, Hugo, Jekyll)

**Astro:**

```astro
---
import "../styles/fanta.css";
---
```

**Hugo**, drop the file in `static/css/` (Hugo copies `static/` as-is to the site root):

```html
<link rel="stylesheet" href="{{ "css/fanta.css" | relURL }}">
```

**Jekyll**, same idea — put it in the project root or an `assets/css/` folder, both are served as-is:

```liquid
<link rel="stylesheet" href="{{ "/assets/css/fanta.css" | relative_url }}">
```

## Switching themes at runtime

`fanta.css` and `claude-style.css` both support a manual light/dark override via `data-theme` on `<html>`, on top of `prefers-color-scheme`. A minimal toggle, framework-agnostic:

```js
function toggleTheme() {
  const html = document.documentElement;
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = next;
  localStorage.setItem("theme", next);
}

// on load, restore the saved preference
document.documentElement.dataset.theme = localStorage.getItem("theme") ?? "dark";
```

`instagram-style.css` and `facebook-style.css` are currently single-theme (matching how those products actually ship); they're straightforward to extend with the same `data-theme` pattern if you want a dark variant — see [Customizing a theme](#customizing-a-theme).

## Component cheatsheet

Class names aren't identical across the four themes — each mirrors its source's real component vocabulary rather than forcing one shared API onto all of them. Quick lookup for the most common pieces:

| Component | `fanta.css` | `claude-style.css` | `instagram-style.css` | `facebook-style.css` |
|---|---|---|---|---|
| Primary button | `.btn.btn-primary` | `.btn.btn-primary` | `.btn.btn-primary` / `.btn-gradient` | `.btn.btn-primary` |
| Card | `.card` | `.card` | `.post` | `.card` |
| Badge | `.badge.badge-*` | `.badge.badge-orange/blue/green` | — (use `.post-likes` pattern) | `.badge` |
| Alert | `.alert.alert-*` | `.alert.alert-*` | — | `.alert.alert-*` |
| Grid | `.row` + `.col-1`…`.col-12` | `.row` + `.col-4/6/8/12` | `.app-shell` (2-col) | `.fb-shell` (3-col) |
| Nav bar | `.navbar` | `.navbar` | `.ig-navbar` | `.fb-navbar` |

For the full list, the CSS files are commented and organized by section — search the file for the component name.

## fanta.js — interactive components

`fanta.css` ships several components that need JS to open/close (same split Bootstrap uses — CSS for looks, JS for state). `fanta.js` covers all of them via `data-*` attributes, no setup required:

```html
<button data-toggle="dropdown" data-target="#menu">Menu</button>
<div class="dropdown-menu" id="menu">…</div>

<button data-toggle="modal" data-target="#confirm">Open</button>
<div class="modal" id="confirm">…</div>

<button data-dismiss="modal">Close</button>
```

Supported `data-toggle` values: `dropdown`, `modal`, `offcanvas`, `tab`, `accordion`, `popover`. Escape key and backdrop clicks close modals/offcanvas/dropdowns automatically.

## Customizing a theme

Every theme is built on CSS custom properties declared once at the top (`:root { ... }`). Override just the variables you care about in your own stylesheet, loaded *after* the theme file — you don't need to fork or edit the theme itself:

```css
<link rel="stylesheet" href="fanta.css">
<link rel="stylesheet" href="my-overrides.css">
```

```css
/* my-overrides.css */
:root {
  --gradient-start: #ff6b6b;
  --gradient-end: #ffd93d;
  --radius-lg: 0.5rem;
}
```

This keeps you on a clean upgrade path — pulling a newer version of the theme file later won't clobber your customizations.

## Suggested repo structure

If you're packaging these together as one repository, a layout like this keeps it navigable and is what most people expect from a CSS library repo:

```
fanta-ui/
├── fanta.css
├── fanta.js
├── claude-style.css
├── instagram-style.css
├── facebook-style.css
├── examples/
│   ├── fanta-demo.html
│   ├── claude-style-demo.html
│   ├── instagram-style-demo.html
│   └── facebook-style-demo.html
├── docs/
│   └── (this file, or split per-theme if it grows)
├── LICENSE
└── README.md
```

Publishing the `examples/` folder via GitHub Pages gives visitors a live preview link for the README — genuinely one of the highest-leverage things you can add (see below).

## Brand-inspired themes — please read

`claude-style.css`, `instagram-style.css`, and `facebook-style.css` are independent, fan-made themes built from each company's *publicly documented* brand colors. They are not official Anthropic, Meta, or Instagram assets, don't include any logo or wordmark, and aren't endorsed by those companies. Worth stating clearly in your repo's own README and `LICENSE`/`NOTICE` file too — it protects you and sets the right expectation for anyone who finds the repo. A short note like this at the top of each theme file (already included) is good practice:

```css
/* Independent, brand-inspired theme. Not an official [Company] asset. */
```

## Contributing

If you're opening this repo up to contributors:

- Keep each theme self-contained — a PR to `fanta.css` shouldn't need to touch `instagram-style.css`.
- Match the existing section-comment structure (`/* == N. SECTION NAME == */`) so the file stays scannable.
- New components should include a snippet in the matching `examples/*-demo.html` file, not just the CSS.
- Open an issue before a large restructure (e.g. renaming class conventions) so it can be discussed first.

## Growing this project

A few things that genuinely move the needle for a small open-source CSS repo, roughly in order of effort-to-payoff:

1. **A live demo link at the top of the README.** GitHub Pages is free — publish the `examples/` folder and link it right under the title. People star what they can see working in one click, not what they have to clone first.
2. **A screenshot or short GIF** of the themes in the README itself (GitHub renders images inline). This is usually the single biggest lift for a visual project like this one.
3. **Accurate topics/tags on the repo** (`css`, `css-framework`, `dark-theme`, `tailwindcss`, `bootstrap`) — this is how people find it via GitHub search and explore pages.
4. **A changelog and version tags**, even a simple `CHANGELOG.md` — signals the project is maintained, which matters more to potential stargazers than people expect.
5. **Respond to issues and PRs promptly** for the first few months — early contributors are disproportionately likely to also star and share.
6. **Share it where the people who'd use it already are** — relevant subreddits, a CSS-focused Discord, Hacker News's "Show HN," dev.to/Hashnode write-up walking through *why* you built it. A short post explaining the fantasy-theme-meets-Bootstrap-meets-Tailwind angle is a more interesting hook than the repo alone.

There isn't a shortcut past "make it easy to see what this does and easy to try it" — the above is just that, in order.

## License

MIT — see `LICENSE`. (If you keep the brand-inspired themes in the same repo, consider a short `NOTICE` file reiterating the disclaimer above, separate from the license itself.)
