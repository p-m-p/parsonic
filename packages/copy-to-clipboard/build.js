import { cssImports } from '@parsonic/esbuild-plugin'
import { build } from 'esbuild'

await build({
  bundle: true,
  format: 'esm',
  entryPoints: ['src/index.js', 'src/CopyToClipboard.js'],
  outdir: '.',
  plugins: [cssImports()],
})
