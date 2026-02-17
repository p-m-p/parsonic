import type CopyToClipboard from './CopyToClipboard.js'
import type {
  SuccessResultDetail,
  ErrorResultDetail,
} from './CopyToClipboard.js'

declare global {
  interface HTMLElementTagNameMap {
    'copy-to-clipboard': CopyToClipboard
  }

  interface GlobalEventHandlersEventMap {
    copyResult: CustomEvent<SuccessResultDetail | ErrorResultDetail>
  }
}
