import { ShareButtonElement } from './ShareButton.js'

declare global {
  interface HTMLElementTagNameMap {
    'share-button': ShareButtonElement
  }
}

export * from './ShareButton.js'
