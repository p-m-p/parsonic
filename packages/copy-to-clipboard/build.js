import { readFile } from 'node:fs/promises'
import { build } from 'esbuild'

const plugin = () => {
  return {
    name: 'css-imports',
    setup(build) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        if (args.with.type === 'css') {
          const styles = await readFile(args.path, 'utf8')

          return {
            contents: `const sheet = new CSSStyleSheet()
sheet.replaceSync(\`${styles}\`)

export default sheet
`,
            watchFiles: [args.path],
          }
        }
      })
    },
  }
}

await build({
  bundle: true,
  format: 'esm',
  entryPoints: ['src/index.js', 'src/CopyToClipboard.js'],
  outdir: '.',
  plugins: [plugin()],
})
