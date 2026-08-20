# Consulting site

Four static pages, no build step, no frameworks. Deploys to Azure Static Web Apps
on the free tier.

## Files

| File | What it is |
|---|---|
| `index.html` | Home |
| `services.html` | Services and FAQ |
| `about.html` | Background and fit |
| `contact.html` | Email, phone, what to include |
| `style.css` | All styling — colors live at the top |
| `reveal.js` | Small scroll-fade effect |
| `staticwebapp.config.json` | Clean URLs (`/services` instead of `/services.html`) |

## Before you publish — find and replace

Every placeholder is in square brackets. Search each file for `[` and replace:

- `[Practice Name]` — your business name
- `[Your Name]` — your name
- `[Your City]`, `[State]`
- `hello@yourdomain.com` — appears in headers, footers, and buttons
- `(555) 123-4567` and the `tel:+15551234567` link
- The bracketed paragraphs in `about.html` — those need real writing, not a swap

## Deploy

1. Create a GitHub account, then a new **public** repository.
2. Upload these files to the repository root (GitHub's web uploader is fine —
   drag the files into the "Add file → Upload files" screen).
3. Go to the Azure Portal → **Create a resource** → **Static Web App**.
4. Pick the free plan, sign in to GitHub, and select your repository and the
   `main` branch.
5. For build details, choose **Custom**:
   - App location: `/`
   - Api location: *(leave empty)*
   - Output location: *(leave empty)*
6. Create it. Azure adds a workflow file to your repo and deploys in a few
   minutes, giving you a URL like `polite-sand-01234.azurestaticapps.net`.

Every future push to `main` redeploys automatically.

## Connect your domain

1. In your Static Web App → **Custom domains** → **Add**.
2. Azure gives you a CNAME (or TXT) record to create.
3. Add that record in the Microsoft 365 admin center under **Settings → Domains
   → your domain → DNS records**.
4. Wait for validation. The SSL certificate is issued automatically and free.

Use `www.yourdomain.com` as the primary and let the root redirect to it — root
domains need an ALIAS/APEX record that not every DNS host supports.

Your Microsoft email keeps working throughout. Do not delete the existing MX,
TXT, or `autodiscover` records — those are email, and they are separate from the
website records.

## Changing colors

Open `style.css`. The first block sets every color used on the site:

```css
--paper:   #E9EBE4;  /* background */
--ink:     #1F231D;  /* text */
--pine:    #2E4739;  /* buttons and links */
--mustard: #9A6F16;  /* small highlights */
```

Change those five values and the whole site follows.

## Adding a working contact form later

Static sites cannot process form submissions on their own. Two easy options:

- **Formspree** or **Netlify Forms** — paste one line into the HTML, free tier
  handles low volume.
- **Azure Functions** — add an `api/` folder; Static Web Apps wires it up
  automatically. More work, no third party.

Until then, the mailto link on the contact page works everywhere.
