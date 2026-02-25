import * as path from 'path';
import * as fs from 'fs';

/** Supported locale codes */
export type Locale = 'en' | 'uk';

/** All available locales */
export const LOCALES: Locale[] = ['en', 'uk'];

/** Default locale */
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Get the absolute path to the locales directory.
 * Useful for tools like i18next-fs-backend in Node.js APIs.
 */
export function getLocalesPath(): string {
  return path.resolve(__dirname, '..', 'locales');
}

/**
 * Get the absolute path to a specific locale's directory.
 */
export function getLocalePath(locale: Locale): string {
  return path.join(getLocalesPath(), locale);
}

/**
 * Load a specific namespace for a locale synchronously.
 * Works in Node.js environments (API server).
 *
 * @example
 * const common = loadTranslation('en', 'common');
 * console.log(common.auth.login); // "Log In"
 */
export function loadTranslation(locale: Locale, namespace: string): Record<string, any> {
  const filePath = path.join(getLocalesPath(), locale, `${namespace}.json`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Load all namespaces for a given locale synchronously.
 */
export function loadAllTranslations(locale: Locale): Record<string, Record<string, any>> {
  const localeDir = getLocalePath(locale);
  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));
  const translations: Record<string, Record<string, any>> = {};

  for (const file of files) {
    const namespace = path.basename(file, '.json');
    translations[namespace] = JSON.parse(fs.readFileSync(path.join(localeDir, file), 'utf-8'));
  }

  return translations;
}

/**
 * Get the list of available namespaces for a locale.
 */
export function getNamespaces(locale: Locale = DEFAULT_LOCALE): string[] {
  const localeDir = getLocalePath(locale);
  return fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.basename(f, '.json'));
}
