# Odinaka Udoezika Ernest — Portfolio Website

Personal portfolio for **Odinaka Udoezika Ernest**, Cybersecurity & Cloud Engineering professional. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no dependencies.

---

## Project Structure

```
portfolio/
├── index.html       # Main HTML — all sections and content
├── style.css        # All styling, themes, animations, responsive layout
├── script.js        # Theme toggle, scroll reveal, navbar, typed effect
├── profile.jpg      # Profile portrait (hero section)
└── README.md        # This file
```

---

## Features

- **Light / Dark mode** — toggle button in the navbar; preference saved to `localStorage`
- **Sticky navbar** — becomes a frosted-glass panel on scroll
- **Smooth scrolling** — all anchor links scroll with offset for the fixed navbar
- **Scroll reveal animations** — sections fade and slide in as they enter the viewport via `IntersectionObserver`
- **Active nav highlighting** — current section is highlighted in the navbar while scrolling
- **Typed hero effect** — role tag cycles through phrases with a typewriter animation
- **Mobile responsive** — hamburger menu, stacked layouts, scaled typography for all screen sizes
- **Download CV button** — placeholder link in the navbar (wire up to your actual CV file)

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Name, role, tagline, portrait, CTA buttons, social links |
| 2 | About | Bio, stat cards (years, certs, research) |
| 3 | Skills | Core areas, technical tools, engineering skills |
| 4 | Experience | Timeline: Engineer, Instructor, Researcher, Entrepreneur |
| 5 | Projects | Splunk SIEM, Microsoft Sentinel, Azure Honeypot |
| 6 | Certifications | Security+, AZ-500, AWS SAA, Google ACE |
| 7 | Focus | "What I'm Working On" cards |
| 8 | Contact | LinkedIn, GitHub, X links |

---

## Getting Started

### Local development

No build step required. Just open the file directly:

```bash
# Option 1 — open directly in browser
open index.html

# Option 2 — serve with Python (avoids any local file restrictions)
python3 -m http.server 8080
# then visit http://localhost:8080

# Option 3 — serve with Node.js (if installed)
npx serve .
```

### File requirements

All four files must be in the **same directory**:

```
index.html  ←  links to style.css, script.js, and profile.jpg
style.css
script.js
profile.jpg
```

---

## Customization

### Updating content

All content lives directly in `index.html`. Each section is clearly commented:

```html
<!-- ░░ HERO ░░ -->
<!-- ░░ ABOUT ░░ -->
<!-- ░░ SKILLS ░░ -->
<!-- ... etc -->
```

### Changing colors / theme

Edit the CSS variables at the top of `style.css`:

```css
:root {
  /* Dark theme */
  --accent:  #00d4ff;   /* primary accent color */
  --green:   #22d3a5;   /* "available" dot color */
  --bg:      #0d0f14;   /* main background */
  /* ... */
}

[data-theme="light"] {
  --accent:  #0077aa;   /* light mode accent */
  /* ... */
}
```

### Linking your CV

Find the CV button in `index.html` and replace `#` with your file path:

```html
<!-- Before -->
<a href="#" class="btn-cv" download>

<!-- After -->
<a href="cv-ernest-udoezika.pdf" class="btn-cv" download>
```

### Replacing the profile image

Swap `profile.jpg` with your own image. Keep the filename the same, or update the `src` in `index.html`:

```html
<img src="profile.jpg" alt="Odinaka Udoezika Ernest" class="portrait-img" />
```

The image is displayed as a circle (`border-radius: 50%`) with `object-fit: cover` — portrait orientation works best.

---

## Deployment

This is a fully static site. Deploy to any static hosting platform:

### GitHub Pages
1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to the `main` branch, root folder
4. Site publishes at `https://yourusername.github.io/repo-name`

### Netlify
1. Drag and drop the project folder onto [netlify.com/drop](https://netlify.com/drop)
2. Or connect your GitHub repo for auto-deploys

### Vercel
```bash
npx vercel
```

### Any web host (cPanel, shared hosting, etc.)
Upload all files via FTP to the `public_html` directory.

---

## Browser Support

Works in all modern browsers. Uses standard CSS and JS — no polyfills required.

| Feature | Requirement |
|---------|-------------|
| CSS variables | Chrome 49+, Firefox 31+, Safari 9.1+ |
| IntersectionObserver | Chrome 58+, Firefox 55+, Safari 12.1+ |
| CSS Grid | Chrome 57+, Firefox 52+, Safari 10.1+ |
| `backdrop-filter` | Chrome 76+, Safari 9+ (with prefix) |

---

## Fonts Used

Loaded from Google Fonts — requires an internet connection to render correctly offline.

| Font | Role |
|------|------|
| [Syne](https://fonts.google.com/specimen/Syne) | Display / headings |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Labels, tags, monospace accents |
| [Lora](https://fonts.google.com/specimen/Lora) | Body text |

---

## License

This portfolio and its code are personal work by Odinaka Udoezika Ernest. You are welcome to use it as a reference or template — please replace all personal content (name, bio, projects, links, photo) before publishing your own version.

---

*Built with precision. No frameworks.*
