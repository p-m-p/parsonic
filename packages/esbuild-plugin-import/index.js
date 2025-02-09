import { readFile } from 'node:fs/promises'

export default function cssImports() {
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
