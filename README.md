# @logobaker/logobaker-i18n

Shared i18n translation files for LogoBaker applications.

Published as a GitHub npm package for use across:
- **Node.js API** (backend)
- **Angular** (frontend)
- **React Native** (mobile)

## 📁 Project Structure

```
logobaker-i18n/
├── locales/                  # Translation JSON files (shipped with package)
│   ├── en/
│   │   └── common.json
│   └── uk/
│       └── common.json
├── src/
│   └── index.ts              # Helper utilities (Node.js)
├── scripts/
│   └── validate.js           # Validates key consistency across locales
├── .github/
│   └── workflows/
│       ├── release.yml        # Auto-release: validate → version bump → publish
│       ├── publish.yml        # Manual fallback publish on GitHub release
│       └── validate.yml       # CI: validate on pull requests
├── package.json
├── tsconfig.json
└── .npmrc
```

## 📦 Installation

### 1. Authenticate with GitHub Packages

Create a `.npmrc` in your consuming project (or in `~/.npmrc`):

```
@logobaker:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> Generate a token at **GitHub → Settings → Developer settings → Personal access tokens** with `read:packages` scope.

### 2. Install

```bash
npm install @logobaker/logobaker-i18n
```

---

## 🚀 Usage

### Node.js API (e.g. Express, NestJS)

```typescript
import { loadTranslation, getLocalesPath } from '@logobaker/logobaker-i18n';

// Load a specific namespace
const en = loadTranslation('en', 'common');
console.log(en.auth.login); // "Log In"

// Or get the path for i18next-fs-backend
const localesPath = getLocalesPath();
// => "/path/to/node_modules/@logobaker/logobaker-i18n/locales"
```

### Angular (with ngx-translate or transloco)

```typescript
// In your i18n config, point the loader to the package's locales:
import { getLocalesPath } from '@logobaker/logobaker-i18n';

// Or import JSON directly:
import en from '@logobaker/logobaker-i18n/locales/en/common.json';
import uk from '@logobaker/logobaker-i18n/locales/uk/common.json';
```

### React Native (with i18next / react-i18next)

```typescript
import en from '@logobaker/logobaker-i18n/locales/en/common.json';
import uk from '@logobaker/logobaker-i18n/locales/uk/common.json';

i18n.init({
  resources: {
    en: { common: en },
    uk: { common: uk },
  },
  defaultNS: 'common',
  lng: 'en',
});
```

---

## ➕ Adding a New Language

1. Create a new folder under `locales/`, e.g. `locales/de/`
2. Copy `locales/en/common.json` into it
3. Translate all values
4. Add the locale code to `src/index.ts` → `Locale` type and `LOCALES` array
5. Run `npm run validate` to check consistency
6. Commit, push, and create a new GitHub release to publish

## ➕ Adding a New Namespace

1. Create a new JSON file in **every** locale folder, e.g. `locales/en/dashboard.json`, `locales/uk/dashboard.json`
2. Use the same key structure in each locale
3. Run `npm run validate`

## 🔖 Publishing a New Version

Releases are **fully automated** based on [Conventional Commits](https://www.conventionalcommits.org/). Just push to `main` and the workflow handles versioning, tagging, GitHub Release creation, and npm publishing.

### Commit format → version bump

| Commit prefix | Example | Version bump |
|---|---|---|
| `fix:` | `fix: correct typo in uk locale` | **patch** (1.0.0 → 1.0.1) |
| `feat:` | `feat: add German translations` | **minor** (1.0.0 → 1.1.0) |
| `feat!:` or `BREAKING CHANGE:` | `feat!: restructure namespace keys` | **major** (1.0.0 → 2.0.0) |
| anything else | `docs: update readme` | **patch** (1.0.0 → 1.0.1) |

### Example workflow

```bash
# Add a new translation file
git add locales/de/common.json
git commit -m "feat: add German translations"
git push origin main
# → auto-releases v1.1.0 and publishes to GitHub Packages
```

---

## 🧪 Validation

```bash
npm run validate
```

Checks that:
- All locales have the same JSON files
- All JSON files have the same nested key structure
- No missing or extra keys

---

## License

MIT
