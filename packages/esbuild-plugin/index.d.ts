import type { Plugin } from 'esbuild'

export function cssImports(options?: CSSImportOptions): Plugin

export type CSSImportOptions = {
  minify?: boolean
}
