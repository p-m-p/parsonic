import stylesheet from './style.css' with { type: 'css' }

/**
 * @typedef {object} SuccessResultDetail
 * @property {'success'} result - The result of the copy action
 * @property {ClipboardItem} data - The data being copied
 *
 * @typedef {object} ErrorResultDetail
 * @property {'error'} result - The result of the copy action
 * @property {DOMException} error - The error that occurred
 */

/**
 * @tagName copy-to-clipboard
 *
 * @property {ClipboardItem} [item] - The item to copy to the clipboard
 *
 * @attr {string} [data-button-label] - ARIA label for the copy button
 * @attr {string} [data-announcement] - Text to announce during a successful copy
 * @attr {string} [data-text] - Text to copy to clipboard.
 * @attr {string} [data-url] - A URL pointing to or containing the data to copy to the clipboard
 * @attr {string} data-result-event-name - Override for the name of the result event
 *
 * @slot - Default slot for the page content that can be copied.
 *
 * @slot button - Slot for the copy button
 * @csspart button - Style the default button element
 *
 * @slot copy-icon - Slot for a custom copy icon
 * @csspart copy-icon - Style the default copy icon svg
 *
 * @slot done-icon - Slot for a custom done icon
 * @csspart done-icon - Style the default done icon svg
 *
 * @csspart button-wrapper - Style the button wrapper element
 * @csspart announcement - Style the announcement text
 *
 * @fires {ClipboardEvent} copy - Event dispatched when the copy button is pressed
 * @fires {CustomEvent<SuccessResultDetail | ErrorResultDetail>} copyResult - Event dispatched when the copy action is completed
 */
export default class CopyToClipboard extends HTMLElement {
  /**
   * Defines the custom element with provided tag name
   */
  static register(tagName = 'copy-to-clipboard') {
    customElements.define(tagName, this)
  }

  #item = undefined
  #icons = {}

  get item() {
    return this.#item
  }

  set item(item) {
    this.#item = item
  }

  connectedCallback() {
    const { buttonLabel = 'Copy' } = this.dataset

    const template = document.createElement('template')
    template.innerHTML = `<slot></slot>
<div id="button-wrapper" part="button-wrapper">
  <slot name="button">
    <button part="button" type="button" aria-label="${buttonLabel}">
      <slot name="copy-icon">
        <svg aria-hidden="true" part="copy-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
          <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v4"/>
          <path d="M21 14H11"/>
          <path d="m15 10-4 4 4 4"/>
        </svg>
      </slot>
      <slot name="done-icon">
        <svg aria-hidden="true" part="done-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </slot>
    </button>
  </slot>
  <span id="announcement" part="announcement" aria-live="polite"></span>
</div>`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    this.#configureIcon('copy')
    this.#configureIcon('done')

    const buttonSlot = shadow.querySelector('slot[name="button"]')
    buttonSlot.addEventListener('slotchange', () => {
      this.#icons = null
    })

    buttonSlot?.addEventListener('click', () => {
      const { announcement = 'Copied!', resultEventName = 'copyResult' } =
        this.dataset
      const dataTransfer = new DataTransfer()

      if (
        this.dispatchEvent(
          new ClipboardEvent('copy', {
            cancelable: true,
            bubbles: true,
            clipboardData: dataTransfer,
          })
        )
      ) {
        this.getClipboardData(dataTransfer)
          .then(async (data) => {
            const notice = this.shadowRoot.getElementById('announcement')

            notice.textContent = announcement
            this.#buttonAnimation().then(() => (notice.textContent = ''))

            await navigator.clipboard.write([data])
            this.dispatchEvent(
              new CustomEvent(resultEventName, {
                bubbles: true,
                detail: {
                  result: 'success',
                  data,
                },
              })
            )
          })
          .catch((err) => {
            this.dispatchEvent(
              new CustomEvent(resultEventName, {
                bubbles: true,
                detail: {
                  result: 'error',
                  error: err,
                },
              })
            )
          })
      }
    })
  }

  async getClipboardData(dataTransfer) {
    let item = this.#item

    if (dataTransfer?.getData('text/plain')) {
      item = new ClipboardItem({
        'text/plain': dataTransfer.getData('text/plain'),
      })
    }

    if (!item) {
      if (this.dataset?.url) {
        const data = await fetch(this.dataset.url)
        const blob = await data.blob()

        item = new ClipboardItem({
          [blob.type]: blob,
        })
      } else {
        item = new ClipboardItem({
          'text/plain':
            this.dataset.text ??
            this.shadowRoot
              .querySelector('slot')
              ?.assignedNodes()
              .map((n) => n.textContent)
              .join('')
              .trim(),
        })
      }
    }

    return item
  }

  #configureIcon(name) {
    this.#icons[name] = this.shadowRoot.querySelector(
      `slot[name="${name}-icon"] > svg`
    )
    this.shadowRoot
      .querySelector(`slot[name="${name}-icon"]`)
      ?.addEventListener('slotchange', (ev) => {
        this.#icons[name] = ev.target.assignedElements()[0]
        ev.stopPropagation()
      })
  }

  async #buttonAnimation() {
    const options = { duration: 2400 }
    const offset = [0, 0.1, 0.9]

    await Promise.all([
      this.#icons?.copy?.animate(
        {
          opacity: [1, 0, 0, 1],
          transform: ['scale(1)', 'scale(0)', 'scale(0)', 'scale(1)'],
          offset,
        },
        options
      ).finished,
      this.#icons?.done?.animate(
        {
          opacity: [0, 1, 1, 0],
          transform: ['scale(0)', 'scale(1)', 'scale(1)', 'scale(0)'],
          offset,
        },
        options
      ).finished,
    ])
  }
}
