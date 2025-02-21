import stylesheet from './style.css' with { type: 'css' }

/**
 * @import {
 *   CopyToClipboardElement,
 *   ErrorResultDetail,
 *   SuccessResultDetail
 * } from '../CopyToClipboard.js'
 * @implements {CopyToClipboardElement}
 *
 * @tagName copy-to-clipboard
 *
 * @property {ClipboardItem} [item] - The item to copy to the clipboard
 *
 * @attr {string} [data-button-label] - ARIA label for the copy button
 * @attr {string} [data-text] - Text to copy to clipboard.
 * @attr {string} [data-url] - A URL pointing to or containing the data to copy to the clipboard
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
 * @fires {ClipboardEvent} copy - Event dispatched when the copy button is pressed
 * @fires {CustomEvent<SuccessResultDetail | ErrorResultDetail>} copyResult - Event dispatched when the copy action is completed
 */
export default class CopyToClipboard extends HTMLElement {
  /** @type {ClipboardItem} */
  #item = undefined

  #copyIcon = null
  #doneIcon = null

  get item() {
    return this.#item
  }

  set item(item) {
    this.#item = item
  }

  static register(tagName = 'copy-to-clipboard') {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    const { buttonLabel = 'Copy' } = this.dataset

    const template = document.createElement('template')
    template.innerHTML = `<slot></slot>
<slot name="button">
  <button part="button" type="button" aria-label="${buttonLabel}">
    <slot name="copy-icon">
      <svg part="copy-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v4"/>
        <path d="M21 14H11"/>
        <path d="m15 10-4 4 4 4"/>
      </svg>
    </slot>
    <slot name="done-icon">
      <svg part="done-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    </slot>
  </button>
</slot>`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    this.#copyIcon = shadow.querySelector('slot[name="copy-icon"] > svg')
    this.#doneIcon = shadow.querySelector('slot[name="done-icon"] > svg')

    shadow
      .querySelector('slot[name="copy-icon"]')
      ?.addEventListener('slotchange', (ev) => {
        // @ts-ignore
        this.#copyIcon = ev.target.assignedElements()[0]
      })
    shadow
      .querySelector('slot[name="done-icon"]')
      ?.addEventListener('slotchange', (ev) => {
        // @ts-ignore
        this.#doneIcon = ev.target.assignedElements()[0]
      })

    shadow
      .querySelector('slot[name="button"]')
      ?.addEventListener('click', () => {
        this.getClipboardData()
          .then(async (data) => {
            const dataTransfer = new DataTransfer()

            for (const type of data.types) {
              const blob = await data.getType(type)

              if (type === 'text/plain') {
                dataTransfer.items.add(await blob.text(), type)
              }
            }

            this.#copyIcon?.animate(
              {
                opacity: [1, 0, 0, 1],
                transform: ['scale(1)', 'scale(0)', 'scale(0)', 'scale(1)'],
                offset: [0, 0.2, 0.8],
              },
              { duration: 1200 }
            )
            this.#doneIcon?.animate(
              {
                opacity: [0, 1, 1, 0],
                transform: ['scale(0)', 'scale(1)', 'scale(1)', 'scale(0)'],
                offset: [0, 0.2, 0.8],
              },
              { duration: 1200 }
            )

            if (
              this.dispatchEvent(
                new ClipboardEvent('copy', {
                  cancelable: true,
                  bubbles: true,
                  clipboardData: dataTransfer,
                })
              )
            ) {
              await navigator.clipboard.write([data])
              this.dispatchEvent(
                new CustomEvent('copyResult', {
                  bubbles: true,
                  /** @type {SuccessResultDetail} */
                  detail: {
                    result: 'success',
                    data,
                  },
                })
              )
            }
          })
          .catch((err) => {
            this.dispatchEvent(
              new CustomEvent('copyResult', {
                bubbles: true,
                /** @type {ErrorResultDetail} */
                detail: {
                  result: 'error',
                  error: err,
                },
              })
            )
          })
      })
  }

  async getClipboardData() {
    let item = this.#item

    if (!item) {
      if (this.dataset?.url) {
        const data = await fetch(this.dataset.url)
        const blob = await data.blob()

        item = new ClipboardItem({
          [blob.type]: blob,
        })
      } else {
        item = new ClipboardItem({
          'text/plain': this.dataset.text ?? this.textContent,
        })
      }
    }

    return item
  }
}
