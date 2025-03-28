import { ThemeSwitch } from './ThemeSwitch.js'

declare global {
  interface HTMLElementTagNameMap {
    'theme-switch': ThemeSwitchElement
  }
}

export * from './ThemeSwitch.js'
