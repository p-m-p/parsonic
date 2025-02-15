import stylesheet from './style.css' with { type: 'css' }

/**
 * @tagName copy-to-clipboard
 *
 * @property {ClipboardItem | DateTransforItem} [item] - The item to copy to the clipboard
 *
 * @attr {string} [data-button-label] - ARIA label for the copy button
 * @attr {string} [data-item] - The text or data URI to copy to clipboard.
 */
export default class CopyToClipboard extends HTMLElement {
  /** @type {ClipboardItem} */
  #item = undefined

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
    template.innerHTML = `<slot id="content"></slot>
<slot name="button">
  <button type="button" aria-label="${buttonLabel}">
    <slot name="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-copy"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M21 14H11"/><path d="m15 10-4 4 4 4"/></svg>
    </slot>
  </button>
</slot>`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)
    shadow.addEventListener('click', () => {
      this.getClipboardItem()
        .then(async (item) => {
          if (
            this.dispatchEvent(
              new CustomEvent('copyToClipboard', {
                cancelable: true,
                bubbles: true,
                detail: item,
              })
            )
          ) {
            await navigator.clipboard.write([item])
            this.dispatchEvent(
              new CustomEvent('copyToClipboardResult', {
                bubbles: true,
                detail: {
                  result: 'success',
                  data: item,
                },
              })
            )
          }
        })
        .catch((err) => {
          this.dispatchEvent(
            new CustomEvent('copyToClipboardResult', {
              bubbles: true,
              detail: {
                result: 'error',
                error: err,
              },
            })
          )
        })
    })
  }

  async getClipboardItem() {
    let item = this.#item

    if (!item) {
      if (this.dataset?.item) {
        const data = await fetch(this.dataset.item)
        const blob = await data.blob()

        item = new ClipboardItem({
          [blob.type]: blob,
        })
      } else {
        item = new ClipboardItem({
          'text/plain': this.shadowRoot
            .querySelector('slot')
            ?.assignedNodes()
            .map((n) => n.textContent)
            .join(''),
        })
      }
    }

    return item
  }
}
