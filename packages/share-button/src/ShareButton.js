/**
 * @param {string} property
 * @param {string} [defaultValue]
 *
 * @returns {string}
 */
function getGraphContent(property, defaultValue) {
  return (
    document
      .querySelector(`meta[property='og:${property}']`)
      ?.getAttribute('content') ?? defaultValue
  )
}

/**
 * @import {
 *   ShareButtonElement,
 *   SuccessResultDetail,
 *   ErrorResultDetail
 * } from '../ShareButton.js'
 * @implements {ShareButtonElement}
 *
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
   * Defines the custom element with provided tag name. If
   * tag is omtted the default `share-button` tag name will
   * be used.
   *
   * @param {string} [tag='share-button'] - Tag name to use for the element
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
                /** @type {SuccessResultDetail} */
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
                /** @type {ErrorResultDetail} */
                detail: { result: 'error', data, error },
              })
            )
          })
      }
    })
  }
}
