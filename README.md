# Theodore Lapin — Portfolio

Personal portfolio for **Theodore Lapin** (Creative Producer & Brand Content Strategist). Built with React, Vite, Tailwind CSS, and GSAP.

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Build for production: `npm run build`; preview: `npm run preview`.

---

## Media assets

All project images and videos are referenced from **`/images/`** (i.e. the `public/images/` folder). Place your files there so paths resolve correctly.

### Option A: Use `public/images/`

Put every asset inside **`public/images/`**. No code changes needed.

### Option B: Keep files in `portfolio-website/images/`

If your media already lives in a root-level `images/` folder and you don’t want to move or copy:

- From the project root, remove the empty `public/images` directory and symlink it to your existing folder:
  ```bash
  rm -rf public/images
  ln -s ../images public/images
  ```
  (Adjust `../images` if your folder is elsewhere.)

### Expected filenames (used in the site)

| Project       | Files |
|---------------|--------|
| **Dimov Tax** | `Dimov shot 1.png`, `Dimov Shot 2.png`, `Salesforce 2 dimov.png`, `Salesforece 1 dimov.png` |
| **TON Church**| `TON Church 1.png`, `TON Church 2.mp4` |
| **UTXORD**    | `UTXORD 1.gif`, `UTXORD 2.gif.mp4`, `UTXORD 3.png` |
| **Yaguarete Media** | `Yaguarete 1.mov`, `Yaguarete 2.mp4`, `Yaguarete 3.png`, `Yaguarete 4.png` |

- Cards use the first image (or video) as thumbnail; click opens a lightbox (video with controls or gallery).
- Videos in cards: autoplay, muted, loop, playsinline. In the lightbox they show with controls.
- To swap media: replace the file in `public/images/` with the same filename, or update the path in `src/components/Work.jsx` (see `PROJECTS` and the comments in `ProjectCard.jsx`).

---

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** (layout, typography, colors)
- **GSAP** + ScrollTrigger (scroll-triggered fade-up, hero stagger)
- Mobile-first, responsive

---

## Deploy (e.g. GitHub Pages)

1. Build: `npm run build`. Output is in `dist/`.
2. Deploy the contents of `dist/` (e.g. set GitHub Pages to use the `dist` folder or push `dist` to a `gh-pages` branch). Ensure `dist/images/` contains your media (either copy `public/images/` into `dist` before deploy or use a build step that includes it; Vite already copies `public/` into `dist/`).

---

## Edit content

- **Hero / About / Contact**: `src/components/Hero.jsx`, `About.jsx`, `Contact.jsx`.
- **Work (case studies)**: `src/components/Work.jsx` (project list and media paths) and `src/components/ProjectCard.jsx` (card layout and lightbox).
- **Skills**: `src/components/Skills.jsx`.
- **Colors / fonts**: `tailwind.config.js` and `src/index.css`.
