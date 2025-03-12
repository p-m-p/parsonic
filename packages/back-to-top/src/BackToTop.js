import stylesheet from './style.css' with { type: 'css' }

/**
 * @import {
 *   BackToTopElement
 * } from '../BackToTop.js'
 * @implements {BackToTopElement}
 *
 * @tagName back-to-top
 */
export default class CopyToClipboard extends HTMLElement {
  #controller = null

  static register(tagName = 'back-to-top') {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    const { buttonLabel = 'Scroll back to top' } = this.dataset

    const template = document.createElement('template')
    template.innerHTML = `<slot>
  <button part="button" type="button" aria-label="${buttonLabel}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  </button>
</slot>`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    this.#controller = new AbortController()

    window.addEventListener('scroll', (ev) => console.log('scroll', ev), {
      signal: this.#controller.signal,
    })

    shadow.querySelector('slot').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }
}
