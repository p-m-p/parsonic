import stylesheet from './style.css' with { type: 'css' }

/**
 * @tagName theme-switch
 */
export default class ThemeSwitch extends HTMLElement {
  static register(tagName = 'theme-switch') {
    customElements.define(tagName, this)
  }

  get themes() {
    let { themes = 'light,dark' } = this.dataset

    return themes.trim().split(/\s*,\s*/)
  }

  connectedCallback() {
    let { theme } = this.dataset

    if (!theme) {
      theme = this.#getPresetTheme()
      this.dataset.theme = theme
    }

    const template = document.createElement('template')
    template.innerHTML = `<slot>
  <fieldset>
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
</slot>
`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    shadow
      .querySelector('slot')
      .addEventListener('change', (/** @type {any} */ ev) => {
        const { strategy } = this.dataset
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
            this.themes.forEach((t) =>
              document.documentElement.classList.toggle(t, theme === t)
            )
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
    let { strategy, theme, themes = 'light,dark' } = this.dataset
    const themeList = themes.trim().split(/\s*,\s*/)

    if (!theme) {
      if (strategy === 'class') {
        theme = themeList.find((t) =>
          document.documentElement.classList.contains(t)
        )
      } else if (strategy === 'attribute') {
        theme = document.documentElement.dataset.theme
      } else if (
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        themeList.includes('dark')
      ) {
        theme = 'dark'
      }
    }

    return theme ?? themeList[0]
  }
}
