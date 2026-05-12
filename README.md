# Amanda Interactive Arcade

Static mobile portrait mini-game arcade untuk novel Amanda.

## Development

Edit file source langsung di root:

- `index.html` untuk chapter select
- `shared/arcade.css` untuk visual Friv-style/casual UI
- `shared/arcade.js` untuk engine gameplay ringan
- `games/bab-*/index.html`, `styles.css`, `script.js` untuk tiap bab

Tailwind dipakai sebagai CSS statis untuk polish UI, bukan CDN/runtime.

```bash
npm run dev:tailwind
```

## Production Build

```bash
npm run build
```

Output final ada di `dist/`.

Build production melakukan:

- purge Tailwind CSS berdasarkan HTML yang dipakai
- minify HTML
- minify CSS
- minify JS dengan Terser
- rapikan inline SVG di HTML
- copy hanya file static yang dibutuhkan GitHub Pages

Audio dibuat real-time dengan Web Audio API, jadi tidak ada file audio eksternal yang perlu dikompres.

## GitHub Pages

Upload isi folder `dist/` ke root branch GitHub Pages, atau copy isi `dist/` ke branch `gh-pages`.
