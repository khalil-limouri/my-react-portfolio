# React Portfolio

## Project Structure

```
my-react-portfolio/
├─ index.html                 # theme bootstrap (prevents flash)
├─ package.json
├─ vite.config.js             
├─ postcss.config.js
├─ tailwind.config.js
└─ src/
   ├─ main.jsx                # React entry + global CSS import
   ├─ index.css               # Tailwind directives
   └─ App.jsx                 # portfolio (single file component)
```

## Notes

- Avatar links must be **direct image URLs** (e.g., `https://i.imgur.com/...jpg` or a GitHub avatar), not an Imgur album page.
- The contact form uses a `mailto:` link for simplicity. Swap it for a backend/API if you need server‑side handling.

## License

MIT — feel free to fork and adapt.

