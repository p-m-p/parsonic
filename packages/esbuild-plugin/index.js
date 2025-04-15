import { readFile } from 'node:fs/promises'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { minify } from 'html-minifier'

/**
 * Turns native ESM CSS imports into JS CSSStyleSheet declaration imports.
 *
 * @param {{ minify?: boolean }} options
 * @returns {import('esbuild').Plugin}
 */
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
          const { css } = await postcss(plugins).process(styles, {
            from: args.path,
          })

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

/**
 * Minifies the HTML content of innerHTML property assignments.
 *
 * @returns {import('esbuild').Plugin}
 */
export function htmlMinify() {
  return {
    name: 'html-minify',
    setup(build) {
      build.onLoad({ filter: /.*/ }, async (args) => {
        const fileContent = await readFile(args.path, 'utf8')
        const contents = fileContent.replace(
          /innerHTML\s*=\s*`([^`]+)`/,
          (_, html) => {
            try {
              const minifiedHtml = minify(html, {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
              })

              return `innerHTML = \`${minifiedHtml}\``
            } catch (e) {
              console.log(e)
              return `innerHTML = \`${html}\``
            }
          }
        )

        return {
          contents,
          watchFiles: [args.path],
        }
      })
    },
  }
}
