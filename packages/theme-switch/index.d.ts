import type ThemeSwitch from './ThemeSwitch.js'

declare global {
  interface HTMLElementTagNameMap {
    'theme-switch': ThemeSwitch
  }

  interface GlobalEventHandlersEventMap {
    themeSwitch: CustomEvent<{ theme: string }>
  }
}
