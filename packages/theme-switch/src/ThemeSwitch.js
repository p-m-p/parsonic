import stylesheet from './style.css' with { type: 'css' }

/**
 * @import { ThemeSwitchElement } from '../ThemeSwitch.js'
 * @implements { ThemeSwitchElement }
 *
 * @tagName theme-switch
 */
export default class ThemeSwitch extends HTMLElement {
  static register(tagName = 'theme-switch') {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    let { mode } = this.dataset

    if (!mode) {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    const template = document.createElement('template')
    template.innerHTML = `<fieldset>
  <label>
    <input name="theme" type="radio" value="light" ${mode === 'light' ? 'checked ' : ''}/>
    <slot name="light-label">Light</slot>
  </label>
  <label>
    <input name="theme" type="radio" value="dark" ${mode === 'dark' ? 'checked ' : ''}/>
    <slot name="dark-label">Dark</slot>
  </label>
</fieldset>
`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    shadow.addEventListener('change', (ev) => {
      const { strategy = 'class' } = this.dataset
      const isDark = ev.target.value === 'dark'

      if (strategy === 'class') {
        document.documentElement.classList.toggle('dark', isDark)
      } else {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
      }
    })
  }
}
