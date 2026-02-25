# Contributing to @logobaker/logobaker-i18n

Thank you for your interest in contributing! This guide will help you get started.

## 🏗 Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Git](https://git-scm.com/)
- A GitHub account

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/logobaker-i18n.git
   cd logobaker-i18n
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feat/add-german-translations
   ```

## 📝 Types of Contributions

### Adding a New Language

1. Create a new folder under `locales/` using the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code:
   ```bash
   mkdir locales/de
   ```
2. Copy the English reference file:
   ```bash
   cp locales/en/common.json locales/de/common.json
   ```
3. Translate **all values** (keep the keys in English):
   ```json
   {
     "common": {
       "save": "Speichern",
       "cancel": "Abbrechen"
     }
   }
   ```
4. Update `src/index.ts` — add the new locale to the `Locale` type and `LOCALES` array:
   ```typescript
   export type Locale = 'en' | 'uk' | 'de';
   export const LOCALES: Locale[] = ['en', 'uk', 'de'];
   ```
5. Run validation:
   ```bash
   npm run validate
   ```

### Adding a New Namespace

1. Create a new JSON file in **every** locale folder:
   ```bash
   touch locales/en/dashboard.json
   touch locales/uk/dashboard.json
   ```
2. Use the **same key structure** in each locale
3. Run validation:
   ```bash
   npm run validate
   ```

### Fixing or Improving Existing Translations

1. Edit the JSON file under the relevant `locales/<lang>/` folder
2. Do **not** change the key names — only the values
3. Run validation:
   ```bash
   npm run validate
   ```

## ✅ Before Submitting

Always run these checks locally before pushing:

```bash
# Validate that all locales have the same keys
npm run validate

# Make sure TypeScript builds successfully
npm run build
```

Both checks will also run automatically in CI on your pull request.

## 📐 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated releases. Your commit messages determine the version bump:

| Prefix | Use when | Version bump |
|---|---|---|
| `fix:` | Fixing a typo or incorrect translation | patch |
| `feat:` | Adding a new language or namespace | minor |
| `feat!:` | Restructuring keys (breaking change) | major |
| `docs:` | Updating README or CONTRIBUTING | patch |
| `chore:` | Tooling, CI changes | patch |

### Examples

```bash
# Fixing a translation
git commit -m "fix: correct Ukrainian translation for 'save'"

# Adding a new language
git commit -m "feat: add German (de) translations"

# Adding a new namespace
git commit -m "feat: add dashboard namespace"

# Breaking change (key restructuring)
git commit -m "feat!: flatten common namespace structure"
```

## 🔄 Pull Request Process

1. **Push** your branch to your fork:
   ```bash
   git push origin feat/add-german-translations
   ```
2. Open a **Pull Request** against the `main` branch of [logobaker/logobaker-i18n](https://github.com/logobaker/logobaker-i18n)
3. Fill in the PR description with:
   - What you changed
   - Which languages are affected
4. Wait for **CI checks** to pass (validation + build)
5. A maintainer will review and merge your PR
6. Once merged to `main`, a new version is **automatically released and published**

## 📏 Translation Guidelines

- **Do not** change JSON keys — only translate the values
- **Do not** remove or add keys in a single locale — all locales must have the same structure
- Keep `{{placeholder}}` variables untranslated (e.g. `{{min}}`, `{{max}}`)
- Use the English (`locales/en/`) files as the source of truth
- Maintain proper grammar, spelling, and punctuation for the target language
- Keep translations concise — UI labels should be short

## 🧪 Validation

The `npm run validate` script checks:

- ✅ All locale directories have the same JSON files
- ✅ All JSON files have the same nested key structure
- ✅ No missing or extra keys between locales

If validation fails, the error output will tell you exactly which keys are missing or extra and in which locale.

## ❓ Questions?

Open an [issue](https://github.com/logobaker/logobaker-i18n/issues) on GitHub.
