import { CopyToClipboardElement } from './CopyToClipboard.js'

declare global {
  interface HTMLElementTagNameMap {
    'copy-to-clipboard': CopyToClipboardElement
  }
}

export * from './CopyToClipboard.js'
