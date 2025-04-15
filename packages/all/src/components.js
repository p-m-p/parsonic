import BackToTop from '@parsonic/back-to-top/BackToTop.js'
import CopyToClipboard from '@parsonic/copy-to-clipboard/CopyToClipboard.js'
import ShareButton from '@parsonic/share-button/ShareButton.js'
import ThemeSwitch from '@parsonic/theme-switch/ThemeSwitch.js'

export function register(prefix) {
  let tagNamePrefix = ''

  if (prefix) {
    tagNamePrefix = prefix.endsWith('-') ? prefix : `${prefix}-`
  }

  BackToTop.register(`${tagNamePrefix}back-to-top`)
  CopyToClipboard.register(`${tagNamePrefix}copy-to-clipboard`)
  ShareButton.register(`${tagNamePrefix}share-button`)
  ThemeSwitch.register(`${tagNamePrefix}theme-switch`)
}
