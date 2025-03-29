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
    let { theme } = this.dataset

    if (!theme) {
      theme = this.#getPresetTheme()
      this.dataset.theme = theme
    }

    const template = document.createElement('template')
    template.innerHTML = `<fieldset>
  <label id="light">
    <input name="theme" type="radio" value="light" ${theme === 'light' ? 'checked ' : ''}/>
    <slot name="light-label">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    </slot>
  </label>
  <label id="dark">
    <input name="theme" type="radio" value="dark" ${theme === 'dark' ? 'checked ' : ''}/>
    <slot name="dark-label">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    </slot>
  </label>
</fieldset>
`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    shadow.addEventListener('change', (ev) => {
      const { strategy = 'class' } = this.dataset
      // @ts-ignore
      const theme = ev.target.value

      if (
        this.dispatchEvent(
          new CustomEvent('themeSwitch', {
            bubbles: true,
            cancelable: true,
            detail: { theme },
          })
        )
      ) {
        if (strategy === 'class') {
          document.documentElement.classList.toggle('dark', theme === 'dark')
        } else if (strategy === 'attribute') {
          document.documentElement.dataset.theme = theme
        }

        this.dataset.theme = theme
      } else {
        ev.preventDefault()
      }
    })
  }

  #getPresetTheme() {
    let { strategy, theme } = this.dataset

    if (strategy === 'class') {
      theme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light'
    } else if (strategy === 'attribute') {
      theme = document.documentElement.dataset.theme ?? 'light'
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    return theme
  }
}
