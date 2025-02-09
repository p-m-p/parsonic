import { build } from 'esbuild'
import cssImports from 'esbuild-plugin-import'

await build({
  bundle: true,
  format: 'esm',
  entryPoints: ['src/index.js', 'src/CopyToClipboard.js'],
  outdir: '.',
  plugins: [cssImports()],
})
