# Embtec Konzultz — website

The website for **Embtec Konzultz**, a computer training school and business centre on
Ogunfayo Rd, Eputu Town, Ibeju-Lekki, Lagos.

Live: https://victorezekiel905-wq.github.io/embtec/

## Stack

Hand-coded HTML, CSS and vanilla JavaScript. No build step, no frameworks, no dependencies.

```
index.html          Home: programmes, the lab, services, reviews, enrolment, FAQ, contact
courses.html        Full curriculum for each programme
contact.html        Enquiry form (opens WhatsApp with the message pre-filled) + map
404.html            Self-contained not-found page for GitHub Pages
assets/css/style.css
assets/js/main.js   Mobile menu, scroll reveals, hero typing demo, WhatsApp form
assets/img/         Logo, campus photos, app icons, social share image
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

GitHub Pages publishes the `main` branch automatically. Push to `main` and the site
updates within a minute or two.

## Updating content

- **Phone / WhatsApp:** search for `2348029596214` and `0802 959 6214`.
- **Courses:** each programme is a `<section class="course">` in `courses.html`.
- **Photos:** add images to `assets/img/` (WebP, around 680px wide or larger) and reference them in `index.html`.
- **Custom domain:** if you add one, update the `canonical`/`og:url` tags, `robots.txt` and `sitemap.xml`.
