# Boosterrr: Portfolio Website

A single-page, animated portfolio for a freelance web developer serving US small businesses.
Plain HTML, CSS and vanilla JS (GSAP + ScrollTrigger + Lenis from a CDN). No build step.

## Files

| File | What it does |
|---|---|
| `index.html` | All content, SEO tags, schema markup |
| `styles.css` | Design system (colors/fonts at the top), layout, mockups |
| `script.js` | Animations, demo mockup content, form handling |

## Run it locally

Open `index.html` in a browser, or for a proper local server:

```bash
npx serve .
```

## Still to do before sending clients here

1. **Contact form:** connect a form service (see next section). Until then the form shows "Open in Gmail" and "My email app" buttons, which work but depend on the visitor.
2. **After you deploy:** add these to the `<head>` of `index.html` using your real live URL: `<link rel="canonical">`, `og:url`, and `og:image` (a 1200x630 PNG), and add `"url"` to the schema block.
3. **Testimonials:** the three cards are labelled "Sample". Replace them with real quotes, names and businesses **only with the client's permission**, then delete the `sample-badge` spans.
4. **Results section:** the numbers (95+, under 2s, +40%, 24h) are written as *targets*. Replace them with real client numbers once you have them.
5. **Demo cards:** they currently say "Get a site like this" and jump to the contact form. When a demo site is live, set its `href` and change the text to "View live demo".
6. **Socials:** LinkedIn, Instagram and X links are commented out in the footer. Un-comment and edit them when ready.

## Make the contact form work

A static website cannot send email by itself, because it has no server. It needs a small service to receive the form. Two free options:

**Formspree (already wired in)**
1. Create a free form at [formspree.io](https://formspree.io) with your email and copy its ID.
2. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` URL.
3. Deploy, send a test, and click the confirmation email.

**Web3Forms (alternative)**
1. Get a free access key at [web3forms.com](https://web3forms.com).
2. In `index.html`, set the form's `action` to `https://api.web3forms.com/submit`.
3. Add `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">` inside the form.

Spam: a hidden trap field (`_gotcha`) is already in the form. Bots that fill it are ignored.

Also keep `CONTACT_EMAIL` at the top of `script.js` set to your real email (used by the fallback buttons and error message).

## Change colors and fonts

Open `styles.css` and edit the `:root` block at the top.

- Accent color: `--accent` (bright) and `--accent-ink` (darker, used for text on light backgrounds). For electric blue try `#3b82f6` and `#1d4ed8`.
- Fonts: `--font-display` (Clash Display) and `--font-body` (Inter). They load from the `<link>` tags in `index.html`.

## Change the text and pricing

- All copy is in `index.html`, grouped by section comments (`1. HERO` … `10. FOOTER`).
- Prices are in the `.pricing-grid` block. Currently: Starter from $900, Growth from $2,200, Premium from $4,500, care plan from $99/month.
- The fake demo websites inside the browser/phone mockups are defined in the `SITES` object at the top of `script.js`.

## Deploy

**GitHub Pages / Netlify / Cloudflare Pages / Vercel** all work, since this is a static site.

Netlify (easiest): go to app.netlify.com/drop and drag the project folder in.

## Performance and accessibility notes

- No images are used, so the page is very light. Add real photos as WebP with `width`, `height` and `loading="lazy"`.
- `prefers-reduced-motion` turns off the loader, smooth scroll, scroll animations and marquee.
- Keyboard users get a skip link, visible focus rings and a native accessible FAQ (`<details>`).
- If a CDN is blocked, the page still works: it simply skips the animations.
- Run Lighthouse in Chrome DevTools after deploying and fix anything flagged for your final content.
