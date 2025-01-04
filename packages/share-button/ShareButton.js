function getGraphContent(property, defaultValue) {
  return (
    document
      .querySelector(`meta[property='og:${property}']`)
      ?.getAttribute('content') ?? defaultValue
  )
}

export default class ShareButton extends HTMLElement {
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

    slot.addEventListener('click', () => {
      let {
        url = getGraphContent('url', location.href),
        title = getGraphContent('title', document.title),
        text = getGraphContent('description'),
        shareEventNzme = 'share',
        resultEventName = 'shareResult',
      } = this.dataset

      const data = { url, text, title }

      if (
        navigator.canShare(data) &&
        this.dispatchEvent(
          new CustomEvent(shareEventNzme, {
            cancelable: true,
            bubbles: true,
            detail: data,
          })
        )
      ) {
        navigator
          .share(data)
          .then(() => {
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
          .catch((error) => {
            this.dispatchEvent(
              new CustomEvent(resultEventName, {
                bubbles: true,
                detail: { result: 'error', data, error },
              })
            )
          })
      }
    })
  }
}
