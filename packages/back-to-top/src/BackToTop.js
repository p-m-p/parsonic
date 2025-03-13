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
  #scrollPosition = 0
  #activationPoint = 500

  static register(tagName = 'back-to-top') {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    const {
      buttonLabel = 'Scroll back to top',
      scrollBehavior = 'auto',
      scrollContainer,
      threshold,
    } = this.dataset

    const template = document.createElement('template')
    template.innerHTML = `<slot>
  <button part="button" type="button" aria-label="${buttonLabel}">
    <slot name="icon">
      <svg part="icon" xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </slot>
  </button>
</slot>`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    const activationPoint = parseInt(threshold, 10)

    if (!isNaN(activationPoint)) {
      this.#activationPoint = activationPoint
    }

    let parent

    if (scrollContainer && document.getElementById(scrollContainer)) {
      parent = document.getElementById(scrollContainer)
    }

    this.#setState(parent ? parent.scrollTop : window.scrollY)
    this.#controller = new AbortController()
    ;(parent ?? window).addEventListener(
      'scroll',
      () => {
        this.#setState(parent ? parent.scrollTop : window.scrollY)
      },
      {
        signal: this.#controller.signal,
      }
    )

    shadow.querySelector('slot').addEventListener('click', () => {
      ;(parent ?? window).scrollTo({
        top: 0,
        behavior: scrollBehavior,
      })
    })
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }

  /**
   * @param {number} scrollPosition
   */
  #setState(scrollPosition) {
    if (
      scrollPosition > this.#activationPoint &&
      scrollPosition < this.#scrollPosition
    ) {
      this.dataset.state = 'active'
    } else {
      this.dataset.state = 'inactive'
    }

    this.#scrollPosition = scrollPosition
  }
}
