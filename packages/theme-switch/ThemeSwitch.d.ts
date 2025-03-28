/**
 * Element interface for <theme-switch>.
 */
export interface ThemeSwitchElement extends HTMLElement {}

/**
 */
declare const ThemeSwitch: ThemeSwitchElement & {
  register(tagName: string): ThemeSwitchElement
}
export default ThemeSwitch
