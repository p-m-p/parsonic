import './preview.css'

/** @type {import('@storybook/web-components-vite').Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],
}

export default preview
