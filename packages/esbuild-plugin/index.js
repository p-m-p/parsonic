import { readFile } from 'node:fs/promises'
import cssnano from 'cssnano'
import postcss from 'postcss'

/** @type {import('./index.js').cssImports} */
export function cssImports(options) {
  return {
    name: 'css-imports',
    setup(build) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        if (args.with.type === 'css') {
          const plugins = []

          if (options?.minify) {
            plugins.push(cssnano({ preset: 'default' }))
          }

          const styles = await readFile(args.path, 'utf8')
          const { css } = await postcss(plugins).process(styles)

          return {
            contents: `const sheet = new CSSStyleSheet()
sheet.replaceSync(\`${css}\`)

export default sheet
`,
            watchFiles: [args.path],
          }
        }
      })
    },
  }
}
