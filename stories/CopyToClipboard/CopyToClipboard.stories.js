import { html } from 'lit'
import CopyToClipboard from '../../packages/copy-to-clipboard/src/CopyToClipboard.js'

CopyToClipboard.register('test-copy')

import './copy-to-clipboard.css'

export default {
  tags: ['autodocs'],
  title: 'CopyToClipboard',
}

export const Default = {
  render: () => html`<test-copy>This text content will be copied</test-copy>`,
}

export const TextAttribute = {
  render: () =>
    html`<test-copy data-text="This text content will be copied"
      >Copy to clipboard</test-copy
    >`,
}
