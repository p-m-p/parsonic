import type ShareButton from './ShareButton.js'
import type { ErrorResultDetail, SuccessResultDetail } from './ShareButton.js'

declare global {
  interface HTMLElementTagNameMap {
    'share-button': ShareButton
  }

  interface GlobalEventHandlersEventMap {
    share: CustomEvent<ShareData>
    shareResult: CustomEvent<SuccessResultDetail | ErrorResultDetail>
  }
}
