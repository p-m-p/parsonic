import { readFile } from 'node:fs/promises'
import cssnano from 'cssnano'
import postcss from 'postcss'

/**
 * @returns {import('esbuild').Plugin}
 */
export function cssImports() {
  return {
    name: 'css-imports',
    setup(build) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        if (args.with.type === 'css') {
          const styles = await readFile(args.path, 'utf8')
          const { css } = await postcss([
            cssnano({ preset: 'default' }),
          ]).process(styles)

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
