/** @type {import('@storybook/web-components-vite').StorybookConfig} */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  docs: {
    autodocs: true,
  },
}
export default config
