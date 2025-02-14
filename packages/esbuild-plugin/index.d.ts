/**
 * @typedef {Object}CSSImportOptions
 * @property {boolean} [minify]
 */
/**
 * @param {CSSImportOptions} [options] - CSS Import plugin options
 *
 * @returns {import('esbuild').Plugin}
 */
export function cssImports(options?: CSSImportOptions): import('esbuild').Plugin
export type CSSImportOptions = {
  minify?: boolean
}
