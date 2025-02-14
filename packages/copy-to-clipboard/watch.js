import { cssImports } from '@parsonic/esbuild-plugin'
import { context } from 'esbuild'

const watchContext = await context({
  bundle: true,
  entryPoints: ['src/index.js', 'src/CopyToClipboard.js'],
  format: 'esm',
  outdir: '.',
  plugins: [cssImports()],
})

watchContext.watch()
