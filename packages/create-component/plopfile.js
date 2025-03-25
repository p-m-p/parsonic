export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('package', {
    description: 'Generate a new component package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
      },
    ],
    actions: [
      {
        type: 'addMany',
        base: 'templates/',
        destination: 'packages/{{name}}',
        templateFiles: 'templates/**',
      },
    ],
  })
}
