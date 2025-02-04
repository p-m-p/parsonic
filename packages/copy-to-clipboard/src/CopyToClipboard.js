/**
 * @tagName copy-to-clipboard
 *
 * @attr {string} data-text - The text to copy to clipboard
 */
export default class CopyToClipboard extends HTMLElement {
  static register(tagName = 'copy-to-clipboard') {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    const { buttonLabel = 'Copy' } = this.dataset

    const template = document.createElement('template')
    template.innerHTML = `<slot></slot>
<slot name="button">
  <button type="button" aria-label="${buttonLabel}">
    <slot name="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-copy"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M21 14H11"/><path d="m15 10-4 4 4 4"/></svg>
    </slot>
  </button>
</slot>`

    const stylesheet = new CSSStyleSheet()
    stylesheet.replaceSync(`
:host {
  cursor: pointer;
  display: inline;
  position: relative;
}
`)

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    shadow
      .querySelector('slot[name="button"]')
      ?.addEventListener('click', () => {
        let { text } = this.dataset

        if (!text) {
          text = shadow
            .querySelector('slot')
            ?.assignedNodes()
            .map((n) => n.textContent)
            .join('\n')
        }

        console.log(text)
      })
  }
}
