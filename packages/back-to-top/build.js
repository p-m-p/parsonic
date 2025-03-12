import { cssImports } from '@parsonic/esbuild-plugin'
import { build } from 'esbuild'

await Promise.all([
  build({
    bundle: true,
    entryPoints: ['src/index.js', 'src/BackToTop.js'],
    format: 'esm',
    outdir: '.',
    plugins: [cssImports()],
  }),

  build({
    bundle: true,
    entryPoints: ['src/index.js'],
    format: 'iife',
    minify: true,
    outfile: './min.js',
    plugins: [cssImports({ minify: true })],
    sourcemap: true,
  }),
])
