/**
 * @typedef {object} SuccessResultDetail
 * @property {'success'} result - The result of the share action
 * @property {ShareData} data - The data being shared
 *
 * @typedef {object} ErrorResultDetail
 * @property {'error'} result - The result of the share action
 * @property {ShareData} data - The data being shared
 * @property {DOMException} error - The error that occurred
 */

/**
 * Returns the value of the meta tag with the specified open graph property
 */
function getGraphContent(property, defaultValue) {
  return (
    document
      .querySelector(`meta[property='og:${property}']`)
      ?.getAttribute('content') ?? defaultValue
  )
}

/**
 * @tagname share-button
 *
 * @attr {string} data-url - The URL of the item to share
 * @attr {string} data-title - The title of the item to share
 * @attr {string} data-text - The text of the share message
 * @attr {string} data-share-event-name - Override for the name of the share event
 * @attr {string} data-result-event-name - Override for the name of the result event
 *
 * @slot button - Slot for a custom button element
 * @csspart button - Style the default button element
 *
 * @fires {CustomEvent<ShareData>} share - Event dispatched when the share button is pressed
 * @fires {CustomEvent<SuccessResultDetail | ErrorResultDetail>} shareResult - Event dispatched when the share action is completed
 */
export default class ShareButton extends HTMLElement {
  /**
   * Defines the custom element with provided tag name if `navigator.share` is supported
   */
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
        shareEventName = 'share',
        resultEventName = 'shareResult',
      } = this.dataset

      const data = { url, text, title }

      if (
        navigator.canShare(data) &&
        this.dispatchEvent(
          new CustomEvent(shareEventName, {
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
