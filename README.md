# Shoba Salon & Spa – Static Website
Static frontend (React + Vite build). No backend, database or payments; data lives in the browser's localStorage.

## Just open it
Double-click `index.html` (single self-contained file) or upload it to any static host (GitHub Pages, Netlify).

## Develop from source (`source/`)
```
npm install
npm run dev
npm run build   # outputs one dist/index.html
```
## Demo logins
- Admin: admin@shoba.demo / admin123
- Client: client@shoba.demo / client123

## Notes
- **Admin services are view-only** (no add/edit/delete). The service list is fixed in `src/data/seed.js`.
- Online + offline bookings share one availability module: `src/utils/appointments.js` (same-browser sync only).
- Photos: `src/assets/images` (some supplied stock images carry watermarks; use licensed versions before launch).
- Contact placeholders: `src/data/site.js`.
