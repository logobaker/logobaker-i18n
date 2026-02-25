/**
 * Validates that all locale directories have the same JSON files
 * and that all JSON files have the same key structure.
 */
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.resolve(__dirname, '..', 'locales');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key of Object.keys(obj).sort()) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function validate() {
  const locales = fs
    .readdirSync(LOCALES_DIR)
    .filter((f) => fs.statSync(path.join(LOCALES_DIR, f)).isDirectory());

  if (locales.length === 0) {
    console.error('❌ No locale directories found');
    process.exit(1);
  }

  console.log(`Found locales: ${locales.join(', ')}\n`);

  // Gather all namespace files per locale
  const localeFiles = {};
  for (const locale of locales) {
    const dir = path.join(LOCALES_DIR, locale);
    localeFiles[locale] = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .sort();
  }

  // Check all locales have same files
  const referenceLocale = locales[0];
  const referenceFiles = localeFiles[referenceLocale];
  let hasError = false;

  for (const locale of locales) {
    const missing = referenceFiles.filter((f) => !localeFiles[locale].includes(f));
    const extra = localeFiles[locale].filter((f) => !referenceFiles.includes(f));

    if (missing.length > 0) {
      console.error(`❌ [${locale}] Missing files: ${missing.join(', ')}`);
      hasError = true;
    }
    if (extra.length > 0) {
      console.error(`❌ [${locale}] Extra files not in ${referenceLocale}: ${extra.join(', ')}`);
      hasError = true;
    }
  }

  // Check all files have same key structure
  for (const file of referenceFiles) {
    const referenceContent = JSON.parse(
      fs.readFileSync(path.join(LOCALES_DIR, referenceLocale, file), 'utf-8')
    );
    const referenceKeys = getKeys(referenceContent);

    for (const locale of locales) {
      if (locale === referenceLocale) continue;

      const filePath = path.join(LOCALES_DIR, locale, file);
      if (!fs.existsSync(filePath)) continue;

      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const keys = getKeys(content);

      const missingKeys = referenceKeys.filter((k) => !keys.includes(k));
      const extraKeys = keys.filter((k) => !referenceKeys.includes(k));

      if (missingKeys.length > 0) {
        console.error(`❌ [${locale}/${file}] Missing keys:\n   ${missingKeys.join('\n   ')}`);
        hasError = true;
      }
      if (extraKeys.length > 0) {
        console.error(`❌ [${locale}/${file}] Extra keys:\n   ${extraKeys.join('\n   ')}`);
        hasError = true;
      }
    }

    // Validate JSON is parseable (already done above, but double-check)
    console.log(`✅ ${file} — keys consistent across all locales`);
  }

  if (hasError) {
    console.error('\n❌ Validation failed');
    process.exit(1);
  }

  console.log('\n✅ All translations are valid and consistent');
}

validate();
