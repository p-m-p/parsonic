import { resolve } from 'node:path'
import { cssImports, htmlMinify } from '@parsonic/esbuild-plugin'
import { build } from 'esbuild'
import { globSync } from 'glob'

const indexPath = resolve('./src/index.js')

await Promise.all([
  build({
    bundle: true,
    entryPoints: [indexPath, ...globSync('src/**/*.js')],
    format: 'esm',
    outdir: '.',
    plugins: [cssImports()],
  }),

  build({
    bundle: true,
    entryPoints: [indexPath],
    format: 'iife',
    minify: true,
    outfile: './min.js',
    plugins: [cssImports({ minify: true }), htmlMinify()],
    sourcemap: true,
  }),
])
