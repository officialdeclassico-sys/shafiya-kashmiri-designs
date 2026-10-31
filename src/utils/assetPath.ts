/**
 * Utility to resolve asset URLs with Vite's configured base path (e.g. for GitHub Pages).
 *
 * Examples:
 * - On GitHub Pages: import.meta.env.BASE_URL === '/shafiya-kashmiri-designs/'
 *   getAssetUrl('/assets/aistudio/hero_clean_canvas.png') -> '/shafiya-kashmiri-designs/assets/aistudio/hero_clean_canvas.png'
 * - In local dev with base '/':
 *   getAssetUrl('/assets/aistudio/hero_clean_canvas.png') -> '/assets/aistudio/hero_clean_canvas.png'
 * - Idempotent:
 *   getAssetUrl('/shafiya-kashmiri-designs/assets/...') -> does not duplicate base prefix
 * - External / Data URLs:
 *   getAssetUrl('https://...') -> returns unchanged
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // Preserve external URLs, data URLs, and blob URLs
  if (/^(https?:|\/\/|data:|blob:)/i.test(path)) {
    return path;
  }

  // Get base URL configured in Vite (e.g. '/shafiya-kashmiri-designs/' or '/')
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const basePrefix = normalizedBase.replace(/^\/+/, ''); // e.g. "shafiya-kashmiri-designs/"

  // Remove leading slashes from path to normalize
  const cleanPath = path.replace(/^\/+/, '');

  // Avoid double-prepending if the path already starts with the base path
  if (basePrefix && cleanPath.startsWith(basePrefix)) {
    return `/${cleanPath}`;
  }

  return `${normalizedBase}${cleanPath}`;
}
