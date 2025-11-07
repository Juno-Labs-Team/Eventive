# Eventive - TSA Project

A modern event management platform built with React, TypeScript, and Supabase.

## Features

- 🔐 **OAuth Authentication** - Google and Discord login
- 👤 **User Profiles** - Customizable profiles with avatars
- ⚙️ **Settings Management** - User preferences and settings
- 🔒 **Protected Routes** - Secure pages requiring authentication
- 👑 **Role-Based Access** - Admin and user roles
- 🎨 **Modern UI** - Clean, responsive design

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Authentication**: Supabase Auth (OAuth)
- **Database**: PostgreSQL (via Supabase)
- **Routing**: React Router
- **Styling**: CSS (custom)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Google OAuth credentials (optional)
- Discord OAuth credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tsa-repository
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root with:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **Set up Supabase database**

Run the SQL script in Supabase SQL Editor (see `docs/tsa-proj-/authentication.md` for full setup)

5. **Configure OAuth providers**

- Set up Google OAuth in Google Cloud Console
- Set up Discord OAuth in Discord Developer Portal
- Enable and configure providers in Supabase Dashboard

6. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app!

## Project Structure

```
tsa-repository/
├── src/
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts (Auth)
│   ├── lib/             # Utilities (Supabase client)
│   ├── pages/           # Page components
│   ├── styles/          # CSS files
│   └── types/           # TypeScript interfaces
├── public/              # Static assets
└── docs/                # Documentation
```

## Documentation

- **[Authentication Guide](docs/tsa-proj-/authentication.md)** - Complete auth system docs
- **[Components](docs/tsa-proj-/src/components.md)** - Component documentation
- **[Pages](docs/tsa-proj-/src/pages.md)** - Page documentation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The app uses Supabase Auth with OAuth providers:

- **Google** - Sign in with Google account
- **Discord** - Sign in with Discord account

User profiles are automatically created on first login with data from the OAuth provider.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
