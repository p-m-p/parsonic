/**
 * @tagName back-to-top
 *
 * @attr {string} [data-button-label] - ARIA label for the button
 * @attr {string} [data-focus-target] - The id of an element to focus when the button is clicked
 * @attr {scrollBehavior} [data-scroll-behavior] - The scroll behavior to use when scrolling to top
 * @attr {string} [data-scroll-container] - The id of the container element being scrolled if not the main window
 * @attr {number} [data-threshold] - Only show the button after scrolling beyond the threshold
 *
 * @slot - Default slot for the back to to button
 * @csspart button - Style the default button element
 *
 * @slot icon - Slot for a custom button icon
 * @csspart icon - Style the default icon svg
 */
export default class BackToTop extends HTMLElement {
  static register(tagName?: string): void
  connectedCallback(): void
  disconnectedCallback(): void
  #private
}
//# sourceMappingURL=BackToTop.d.ts.map
