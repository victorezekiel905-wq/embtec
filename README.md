# Embtec Konzultz website

Website for **Embtec Konzultz**, a computer school and business centre on Ogunfayo Road,
Eputu Town, Ibeju-Lekki, Lagos.

Live: https://victorezekiel905-wq.github.io/embtec/

## How it's built

A plain static website: HTML, CSS and JavaScript. No framework, no build step, nothing to
install. `index.html` is the first page.

```
index.html      Home (video hero, courses, why Embtec, lab gallery, enrolment, reviews, services)
about.html      About, approach, the lab, location
courses.html    Full outline for each course
services.html   Cybercafé, printing and photocopy, financial advisory
contact.html    Enquiry form (opens WhatsApp with the message filled in), map, FAQ
404.html        Shown for broken links (self-contained on purpose)
assets/css/style.css
assets/js/main.js    Header, mobile menu, hero video, animations, enquiry form
assets/img/          Logo, lab photos, course and service photos, icons, share image
assets/video/        Hero video (wide for desktop, tall for phones) and poster frames
```

Fonts: Clash Display (headlines) and Satoshi (text), loaded from Fontshare.
The hero video is cut from Embtec's own Instagram reels. Course and service photos marked as
stock come from Unsplash (free for commercial use).

## Viewing it locally

Double-click `index.html`, or serve the folder:

```bash
npx serve .
```

## Publishing

GitHub Pages publishes the `main` branch. Push to `main` and the live site updates within a
minute or two.

## Updating content

- **Phone and WhatsApp:** search the HTML files for `2348029596214` and `0802&nbsp;959&nbsp;6214`.
- **Courses:** each course is a `<section class="detail">` in `courses.html`, and a card on the home page.
- **Colours:** set once at the top of `assets/css/style.css` (royal blue and gold from the logo,
  plus one accent per course).
