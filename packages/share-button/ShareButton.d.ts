/**
 * Element interface for the ShareButton.
 */
export interface ShareButtonElement extends HTMLElement {}

/**
 * Successful share event detail.
 */
export interface SuccessResultDetail {
  /**
   * The shared data.
   */
  data: ShareData

  /**
   * The share result.
   */
  result: 'success'
}

/**
 * Failed share event detail
 */
export interface ErrorResultDetail {
  /**
   * The shared data.
   */
  data: ShareData

  /**
   * The share error.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#exceptions
   */
  error: DOMException

  /**
   * The share result.
   */
  result: 'error'
}

/**
 * Share button custom element for easily adding `navigator.share`
 * functionality to a web page.
 */
declare const ShareButton: ShareButtonElement & {
  register(tagName: string): ShareButtonElement
}
export default ShareButton
