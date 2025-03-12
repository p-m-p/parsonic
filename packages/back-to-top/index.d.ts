import { BackToTopElement } from './BackToTop.js'

declare global {
  interface HTMLElementTagNameMap {
    'back-to-top': BackToTopElement
  }
}

export * from './BackToTop.js'
