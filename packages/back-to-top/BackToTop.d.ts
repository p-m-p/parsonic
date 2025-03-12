/**
 * Element interface for the back to top button.
 */
export interface BackToTopElement extends HTMLElement {}

/**
 * Custom element for adding a scroll back to top of page button.
 */
declare const BackToTop: BackToTopElement & {
  register(tagName: string): BackToTopElement
}
export default BackToTop
