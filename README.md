# </> SnipBox

A premium, minimal personal code snippet & notes manager — built to feel like a real developer tool, not another CRUD project.

Save, organize, edit, search, and export reusable code snippets (and quick notes) with syntax highlighting, a Carbon-style PDF export, full keyboard-shortcut navigation, and secure JWT authentication.

---

## ✨ Features

- **Public landing page** — hero, live feature demos, and scroll animations, with real dark/light product screenshots that crossfade with the site's theme toggle
- **JWT Authentication** — register/login with bcrypt-hashed passwords, protected routes, guest-only auth pages
- **Code + Notes in one place** — a sliding toggle switches the entire app between snippet mode and lightweight note mode
- **Custom code editor** — CodeMirror 6 with a hand-built theme (no default themes), auto-growing height, 8 languages
- **Syntax-highlighted previews** — PrismJS-powered cards on the snippets grid, themed to match the app's own CSS variables
- **Search + sort** — live search by title/content, sort by newest/oldest/name
- **Export to PDF** — one click renders a clean, dark, line-numbered printable layout via the browser's native print dialog
- **Full keyboard-shortcut system** — `⌘S` to save, `⌘K` to search, `G H`/`G S` to navigate, `?` for a full shortcuts reference, arrow-key navigation in toggles and dropdowns — all route-aware and safe while typing
- **Dark / light themes** — CSS-variable driven, persisted, no flash on load
- **Fully responsive** — floating glass navbar (with a collapsible overflow menu on mobile), adaptive grid, mobile-first forms

## 🛠 Tech Stack

**Frontend**
- React (Vite) + React Router DOM
- Tailwind CSS (custom design tokens via CSS variables — no UI kit)
- Context API for theme, auth, print, and shortcuts state (no Redux)
- CodeMirror 6 (`@uiw/react-codemirror`) for editing
- PrismJS for read-only syntax highlighting
- React Hot Toast

**Backend**
- Node.js + Express
- MySQL (raw SQL via `mysql2/promise` — no ORM)
- JWT (`jsonwebtoken`) for stateless auth
- `bcryptjs` for password hashing
- `express-validator` for request validation

**Deployment**
- Frontend → [Vercel](https://vercel.com)
- Backend → [Render](https://render.com)
- Database → [Aiven](https://aiven.io) (managed MySQL, free tier)

## 🧭 Routes

| Path | Access | Page |
|---|---|---|
| `/` | Public | Landing page (auto-redirects to `/create` if already logged in) |
| `/login`, `/register` | Guest-only | Redirects to `/create` if already logged in |
| `/create` | Protected | Create / edit a snippet or note |
| `/snippets` | Protected | My Snippets — search, sort, grid |

## 📁 Project Structure

```
SnipBox/
├── frontend/
│   ├── public/
│   │   └── landing/          # Cropped product screenshots used on the landing page
│   └── src/
│       ├── components/       # Navbar, SnippetCard, IconButton, ConfirmDialog,
│       │                     # ShortcutsHelpModal, GlobalShortcuts, Reveal,
│       │                     # ThemeSwapImage, TiltCard...
│       ├── context/          # ThemeContext, AuthContext, PrintContext, ShortcutsContext
│       ├── hooks/            # useShortcut, useFocusTrap
│       ├── layouts/          # Layout (app shell), AuthLayout (login/register shell)
│       ├── pages/            # Landing, Home, Snippets, Login, Register, NotFound
│       ├── routes/           # ProtectedRoute, GuestRoute
│       ├── services/         # authService, snippetService (API calls)
│       ├── utils/            # apiClient, authStorage, languages, theming, platform
│       └── styles/           # Prism + print stylesheets
│
└── backend/
    └── src/
        ├── config/            # MySQL connection pool
        ├── controllers/       # auth + snippet business logic
        ├── models/            # raw SQL queries
        ├── routes/            # Express routers
        ├── validators/        # express-validator rule sets
        └── middleware/        # JWT auth guard, validation, error handling
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MySQL database (local, or a free instance from [Aiven](https://aiven.io))

### 1. Clone & install

```bash
git clone https://github.com/chaitanya-173/Snipbox.git
cd snipbox
```

**Backend**
```bash
cd backend
npm install
cp .env.example .env   # then fill in your DB + JWT values
```

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env   # points to your backend's URL
```

### 2. Set up the database

Run the schema once against your MySQL instance:

```bash
mysql -u <user> -p < backend/sql/schema.sql
```

### 3. Run it

```bash
# backend/
npm run dev       # http://localhost:5000

# frontend/ (in a separate terminal)
npm run dev       # http://localhost:5173
```

## 🔐 Environment Variables

**`backend/.env`**
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=snipbox
DB_SSL=false
JWT_SECRET=a_long_random_string
CLIENT_URL=http://localhost:5173
```
Set `DB_SSL=true` when connecting to Aiven (or any managed MySQL host that requires TLS).

**`frontend/.env`**
```
VITE_API_URL=http://localhost:5000/api
```

## ⌨️ Keyboard Shortcuts

Press **`?`** anywhere in the app for the full, always-up-to-date list. Highlights:

| Shortcut | Action |
|---|---|
| `⌘/Ctrl + S` | Save / update the current snippet or note |
| `⌘/Ctrl + K` | Focus the search bar on My Snippets |
| `⌘/Ctrl + /` | Toggle dark / light theme |
| `G` then `H` | Go to Create |
| `G` then `S` | Go to My Snippets |
| `Esc` | Close the open dialog |
| `←` / `→` | Switch between Code / Notes |
| `↑` / `↓` / `Enter` | Navigate an open dropdown |

Shortcuts are registered per-page (so they only exist where they make sense) and never fire while typing in a text field, except safe combos like `⌘S` and `Esc`.

## 📡 API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create an account |
| POST | `/api/auth/login` | – | Log in, returns a JWT |
| GET | `/api/auth/me` | ✅ | Get the current user |
| GET | `/api/snippets` | ✅ | List the logged-in user's snippets/notes |
| GET | `/api/snippets/:id` | ✅ | Get a single snippet/note |
| POST | `/api/snippets` | ✅ | Create a snippet/note |
| PUT | `/api/snippets/:id` | ✅ | Update a snippet/note |
| DELETE | `/api/snippets/:id` | ✅ | Delete a snippet/note |

All protected routes expect `Authorization: Bearer <token>`. Every snippet query is scoped to `user_id` at the database level — one user can never see another's data.

## 🎨 Design Philosophy

SnipBox intentionally does **less**, not more. No feature was added without a reason — the goal was a polished, focused tool with consistent design language, not a feature-heavy dashboard. Inspired by the visual language of Linear, Vercel, and Raycast.

## 📄 License

MIT