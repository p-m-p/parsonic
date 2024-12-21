import { html } from 'lit'
import ShareButton from '../packages/share-button'

import './share-button.css'

ShareButton.register()

export default {
  title: 'ShareButton',
}

export const Default = {
  render: () => html`<share-button></share-button>`,
}

export const Label = {
  render: () =>
    html`<share-button data-button-label="Share it!"></share-button>`,
}

export const Styled = {
  render: () => html`<share-button class="styled"></share-button>`,
}

export const Custom = {
  render: () => html`
    <share-button>
      <button slot="button" class="custom">Share this page</button>
    </share-button>
  `,
}
