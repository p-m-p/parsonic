/**
 * Turns native ESM CSS imports into JS CSSStyleSheet declaration imports.
 *
 * @param {{ minify?: boolean }} options
 * @returns {import('esbuild').Plugin}
 */
export function cssImports(options: {
    minify?: boolean;
}): import("esbuild").Plugin;
/**
 * Minifies the HTML content of innerHTML property assignments.
 *
 * @returns {import('esbuild').Plugin}
 */
export function htmlMinify(): import("esbuild").Plugin;
