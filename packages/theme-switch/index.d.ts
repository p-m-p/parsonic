import type {
  default as ThemeSwitch,
  ThemeSwitchDetail,
} from './ThemeSwitch.js'

declare global {
  interface HTMLElementTagNameMap {
    'theme-switch': ThemeSwitch
  }

  interface GlobalEventHandlersEventMap {
    themeSwitch: CustomEvent<ThemeSwitchDetail>
  }
}
