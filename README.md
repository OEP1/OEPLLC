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

## Contact form — REQUIRED SETUP

The form posts to Formspree, which emails each submission to you. Static sites
cannot send email themselves, so this step is needed before the form works.

Until then, the form falls back to opening the visitor's email client. Nothing
is lost, but it is a worse experience.

### Setup — about three minutes, free

1. Go to **formspree.io** and sign up using `sales@opulentechopartners.com`.
2. Create a new form, named something like "Website inquiries."
3. Copy the endpoint URL it gives you. It looks like
   `https://formspree.io/f/abcdwxyz`.
4. Open `site.js` and find, near the bottom:

   ```js
   var ENDPOINT = "";  // <-- paste here
   ```

5. Paste the URL between the quotes:

   ```js
   var ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```

6. Commit. Submissions now arrive in your inbox.
7. Formspree emails you once to confirm the address — click that link or
   nothing will arrive.

Free tier covers 50 submissions per month. **web3forms.com** works with the
same code if you ever need a higher limit.

### What the form already does

- Validates required fields and email format before sending
- Hidden honeypot field that catches most spam bots
- Disables the button while sending so nothing submits twice
- Replaces the form with a thank-you message on success
- Reveals a free-text box when "Other" is selected under Area of interest
- Falls back to email and shows your address if sending fails

### Testing

After deploying, submit a test inquiry and check that it arrives. Look in spam
the first time — form services often land there until marked safe.

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
