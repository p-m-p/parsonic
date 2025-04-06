import stylesheet from './style.css' with { type: 'css' }

/**
 * @tagName back-to-top
 *
 * @attr {string} [data-button-label] - ARIA label for the button
 * @attr {string} [data-focus-target] - The id of an element to focus when the button is clicked
 * @attr {scrollBehavior} [data-scroll-behavior] - The scroll behavior to use when scrolling to top
 * @attr {string} [data-scroll-container] - The id of the container element being scrolled if not the main window
 * @attr {number} [data-threshold] - Only show the button after scrolling beyond the threshold
 *
 * @slot - Default slot for the back to to button
 * @csspart button - Style the default button element
 *
 * @slot icon - Slot for a custom button icon
 * @csspart icon - Style the default icon svg
 */
export default class BackToTop extends HTMLElement {
  /**
   * Defines the custom element with provided tag name
   */
  static register(tagName = 'back-to-top') {
    customElements.define(tagName, this)
  }

  #controller = null
  #scrollPosition = 0
  #activationPoint = 500

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
        aria-hidden="true"
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

    let container

    if (scrollContainer && document.getElementById(scrollContainer)) {
      container = document.getElementById(scrollContainer)
    }

    this.#setState(container?.scrollTop ?? window.scrollY)
    this.#controller = new AbortController()

    const target = container ?? window
    target.addEventListener(
      'scroll',
      () => {
        this.#setState(container?.scrollTop ?? window.scrollY)
      },
      {
        signal: this.#controller.signal,
      }
    )

    shadow.querySelector('slot').addEventListener('click', () => {
      const { focusTarget } = this.dataset

      if (focusTarget) {
        document.getElementById(focusTarget)?.focus({
          preventScroll: true,
        })
      }

      target.scrollTo({
        top: 0,
        behavior: scrollBehavior,
      })
    })
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }

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
