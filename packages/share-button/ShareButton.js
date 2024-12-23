let BaseElement

if (typeof HTMLElement !== 'undefined') {
  BaseElement = HTMLElement
} else {
  BaseElement = class {}
}

function getGraphContent(property, defaultValue) {
  return (
    document
      .querySelector(`meta[property='og:${property}']`)
      ?.getAttribute('content') ?? defaultValue
  )
}

export default class ShareButton extends BaseElement {
  static register(tag = 'share-button') {
    if ('share' in navigator) {
      customElements.define(tag, ShareButton)
    }
  }

  connectedCallback() {
    const defaultButton = document.createElement('button')
    defaultButton.textContent = this.dataset.buttonLabel ?? 'Share'
    defaultButton.setAttribute('part', 'button')

    const slot = document.createElement('slot')
    slot.setAttribute('name', 'button')
    slot.appendChild(defaultButton)

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(slot)

    slot.addEventListener('click', async () => {
      let {
        url = getGraphContent('url', location.href),
        title = getGraphContent('title', document.title),
        text = getGraphContent('description'),
      } = this.dataset

      const data = { url, text, title }

      if (
        navigator.canShare(data) &&
        this.dispatchEvent(
          new CustomEvent('share', {
            cancelable: true,
            bubbles: true,
            detail: data,
          })
        )
      ) {
        try {
          await navigator.share(data)
          // eslint-disable-next-line no-empty, no-unused-vars
        } catch (err) {}
      }
    })
  }
}
