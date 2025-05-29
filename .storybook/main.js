/** @type {import('@storybook/web-components-vite').StorybookConfig} */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: ['@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  docs: {},
}
export default config
