# Punjabi Welfare Trust — Website + Admin Panel

React (Vite + shadcn/ui) website with an Express + SQLite backend that makes **all website content editable** from an admin dashboard: hero slides, impact stats, work/stories, advisory committee, supporters, volunteers, videos, donate/QR, footer, contact details, map and more — including photo uploads.

## Running locally (development)

```sh
npm install
npm run dev:full     # starts API server (port 4000) + Vite dev server (port 8080)
```

Open http://localhost:8080 for the website and http://localhost:8080/admin for the admin panel.

You can also run them separately: `npm run server` (API) and `npm run dev` (frontend). The Vite dev server proxies `/api` and `/uploads` to the API.

## Production

### Hostinger (live site — punjabiwelfaretrust.org)

The live site runs entirely on Hostinger shared hosting: static frontend + a PHP port of the API
(`hosting/api/index.php`, same endpoints) + MySQL database `u242596167_websitedata`.

To deploy an update:

```sh
./scripts/build-deploy.sh
```

This produces `deploy/hostinger-site.zip` (extract into
`domains/punjabiwelfaretrust.org/public_html` via SSH or hPanel File Manager) and
`deploy/migration.sql` (only needed for a fresh database — importing it overwrites content
edited through the live admin panel, so don't re-import on updates).

MySQL credentials live in `.env` (`MYSQL_*`); the deploy script bakes them into `api/config.php`.

### Self-hosted Node (VPS etc.)

```sh
npm run build        # builds the frontend into dist/
npm start            # one server on port 4000 serves the site, the API and uploads
```

Set `DB_DRIVER=mysql` in `.env` to use a MySQL database instead of the local SQLite file;
`node server/run-migration.js` imports the content into it.

## Admin panel

- URL: `/admin` (login at `/admin/login`)
- Default login (first run): `admin@punjabiwelfaretrust.org` / `ChangeMe@123`
  — **change this immediately** from *Change Password* in the panel, or set
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before the first start (see `.env.example`).
- On first start the server seeds the database (`server/data/site.db`) with the current
  website content and copies the images into `server/uploads/`.
- Deleting `server/data` and `server/uploads` resets everything back to the original content.

## API overview

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | – | Get a JWT (12 h expiry) |
| GET | `/api/auth/me` | ✓ | Current admin |
| POST | `/api/auth/change-password` | ✓ | Change password |
| GET | `/api/content` | – | Whole site content (used by the website) |
| GET | `/api/collections/:section` | – | List items of a section |
| POST/PUT/DELETE | `/api/collections/:section(/:id)` | ✓ | Create / update / delete items |
| PUT | `/api/collections/:section/reorder` | ✓ | Reorder items (`{ids: [...]}`) |
| GET/PUT | `/api/settings/:key` | PUT ✓ | Singleton section texts/settings |
| POST | `/api/upload` | ✓ | Upload an image (`image` form field, ≤ 8 MB) |
| POST | `/api/feedback` | – | Submit feedback from the website form |
| GET/DELETE | `/api/feedback(/:id)` | ✓ | Feedback inbox |

Sections: `heroSlides`, `stats`, `posts`, `activities`, `committee`, `supporters`, `volunteers`, `videos`.

## Tech

- Frontend: Vite, TypeScript, React, shadcn/ui, Tailwind CSS, TanStack Query
- Backend: Express, better-sqlite3, JWT (jsonwebtoken), bcryptjs, multer
- If the API is unreachable, the public site falls back to the content bundled in `src/content/defaults.ts`, so it never renders empty.
