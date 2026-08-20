# Opulent Echo Partners — website

Four static pages. No build step, no frameworks. Deploys to Azure Static Web Apps
on the free tier.

## Files

| File | Purpose |
|---|---|
| `index.html` | Home |
| `services.html` | Three practice areas + FAQ |
| `regulatory.html` | FDA, ISO 13485, CLIA, LDT, GMP, PHI |
| `about.html` | Firm background and approach |
| `contact.html` | Inquiry form and direct contact details |
| `style.css` | All styling — palette and fonts at the top |
| `site.js` | Mobile menu, scroll reveal, contact form handler |
| `staticwebapp.config.json` | Clean URLs and security headers |

**Note:** `reveal.js` from the earlier version has been replaced by `site.js`.
Delete `reveal.js` from the repository if it is still there.

## Before publishing — remaining edits

- `Wing Cheung` on `about.html`, if you present the business differently

The contact email `sales@opulentechopartners.com` is already set throughout.
Create that mailbox in the Microsoft 365 admin center once the domain is verified.

Then write the three bracketed paragraphs in `about.html`. That page carries the
credibility of the whole site, so it deserves real specifics — facilities,
volumes, years, credentials.

## Adding a photograph

`about.html` has a placeholder block with the class `bio__portrait`. Replace the
whole `<div class="bio__portrait">…</div>` with:

```html
<img class="bio__portrait" src="portrait.jpg" alt="Wing Cheung, Principal Consultant">
```

Upload `portrait.jpg` to the repository root alongside the HTML files. A
vertical 3:4 image around 900px tall works well.

## Contact form

No telephone number appears anywhere on the site; email and the inquiry form
are the only contact routes. The form opens the visitor's own email client with
the fields filled in. It works everywhere and requires no backend, but some visitors have no mail
client configured.

To use a real hosted form instead, create a free Formspree account and change
the button handler in `site.js`, or wrap the fields in:

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

and change the button to `type="submit"`.

## Deploy and update

The site is connected to Azure Static Web Apps. Any commit to the `main` branch
redeploys automatically in two to four minutes.

To update: repository → **Add file** → **Upload files** → drop in the changed
files → **Commit changes**. Uploading a file with an existing name replaces it.

## Connect the custom domain

1. Azure Portal → your Static Web App → **Custom domains** → **Add**
2. Azure supplies a CNAME (or TXT) record to create
3. Microsoft 365 admin center → **Settings** → **Domains** → your domain →
   **DNS records** → add the record Azure gave you
4. Wait for validation; the SSL certificate is issued automatically and free

Use `www.yourdomain.com` as the primary hostname.

**Do not remove the existing MX, TXT, or autodiscover records.** Those route
your Microsoft 365 email and are separate from the website records.

## Changing the palette

Open `style.css`. Everything derives from the `:root` block:

```css
--navy-900: #0B2545;   /* hero, footer, headings */
--blue-500: #1A6FB5;   /* buttons, links, accents */
--teal:     #0E8F86;   /* checkmarks, secondary accent */
--grey-50:  #F4F7FA;   /* alternating section background */
```


## Navigation labels

Menu items use industry terminology rather than generic labels:

| Page | Menu label |
|---|---|
| `index.html` | Overview |
| `services.html` | Capabilities |
| `regulatory.html` | Regulatory |
| `about.html` | Our Firm |
| `contact.html` | Contact Us |
