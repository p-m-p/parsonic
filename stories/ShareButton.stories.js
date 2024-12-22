import { html } from 'lit'
import ShareButton from '../packages/share-button/ShareButton'

import './share-button.css'

ShareButton.register('test-button')

export default {
  title: 'ShareButton',
}

export const Default = {
  render: () => html`<test-button></test-button>`,
}

export const Label = {
  render: () => html`<test-button data-button-label="Share it!"></test-button>`,
}

export const Styled = {
  render: () => html`<test-button class="styled"></test-button>`,
}

export const Custom = {
  render: () => html`
    <test-button>
      <button slot="button" class="custom">Share this page</button>
    </test-button>
  `,
}

export const CDN = {
  render: () => `
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@parsonic/share-button@latest/+esm"
    ></script>
    <share-button data-button-label="Share this page"></share-button>
  `,
}
