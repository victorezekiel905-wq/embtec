# Embtec Konzultz website

The website for **Embtec Konzultz**, a computer school and business centre on
Ogunfayo Road, Eputu Town, Ibeju-Lekki, Lagos.

Live: https://victorezekiel905-wq.github.io/embtec/

## How it's built

A plain static website: HTML, CSS and a small amount of JavaScript. There is no framework,
no build step and nothing to install. `index.html` is the first page.

```
index.html            Home page
courses.html          Course outlines
contact.html          Enquiry form (opens WhatsApp with the message filled in) and map
404.html              Page shown for broken links (self-contained on purpose)
assets/css/style.css  All styles
assets/js/main.js     Mobile menu, WhatsApp shortcut, enquiry form
assets/img/           Logo, lab photos (several sizes each), icons, share image
```

Fonts come from Google Fonts: Newsreader (headlines), Archivo (text) and
JetBrains Mono (the code sample).

## Viewing it locally

Double-click `index.html`, or serve the folder so links behave exactly as they do online:

```bash
npx serve .
```

## Publishing

GitHub Pages publishes the `main` branch. Push to `main` and the live site updates within
a minute or two.

## Updating content

- **Phone and WhatsApp:** search the HTML files for `2348029596214` and `0802&nbsp;959&nbsp;6214`.
- **Courses:** each course is a `<section class="course">` in `courses.html`. The short list on
  the home page is the `course-index` list in `index.html`.
- **Photos:** each photo is saved at several widths (for example `workstations-900.webp`,
  `-1400`, `-2000`) and the browser picks the right one. Add new photos the same way.
- **Custom domain:** if you add one, update the `canonical` and `og:` tags, `robots.txt` and
  `sitemap.xml`.
