/**
 * Element interface for the copy to clipboard button.
 */
export interface CopyToClipboardElement extends HTMLElement {
  /**
   * The clipboard item to be copied
   */
  item?: ClipboardItem

  /**
   * Fetches the clipboard item from either the item property,
   * url data attribute, text data attribute or from the text
   * content of the nodes assigned to the components default slot
   */
  getClipboardData(
    /**
     * Optional data transfer object from the copy event
     */
    dataTransfer?: DataTransfer
  ): Promise<ClipboardItem>
}

/**
 * Successful copy event detail.
 */
export interface SuccessResultDetail {
  /**
   * The copied data.
   */
  data: ClipboardItem

  /**
   * The share result.
   */
  result: 'success'
}

/**
 * Failed copy event detail
 */
export interface ErrorResultDetail {
  /**
   * The share error.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write#exceptions
   */
  error: DOMException

  /**
   * The share result.
   */
  result: 'error'
}

/**
 * Custom element for applying copy to clipboard functionality
 * to content on a web page.
 */
declare const CopyToClipboard: CopyToClipboardElement & {
  register(tagName: string): CopyToClipboardElement
}
export default CopyToClipboard
