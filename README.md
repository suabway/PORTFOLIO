# PORTFOLIO
A space where art lives and people connect.

Static photography portfolio built from the "Section 3" iPhone frames of the
Figma file. No build step: plain HTML, CSS and JavaScript.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Edit content

Everything editable lives in `js/galleries.js`:

- `contact`: email, Instagram handle and phone number used by every booking link.
- `pages`: the headline on each page and its galleries.

Each gallery is a folder in `photos/`. Full images are `01.jpg`, `02.jpg`, ...
and the square grid crops sit in `thumbs/` under the same names. To add a
gallery, create a new folder and add another `{ title, label, folder, count }`
entry.

## Hosting

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
Publish the repository root; `index.html` is the entry point.
