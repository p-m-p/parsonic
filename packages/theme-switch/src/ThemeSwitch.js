import stylesheet from './style.css' with { type: 'css' }

/**
 * @tagName theme-switch
 *
 * @attr {string} [data-label] - ARIA label for the theme switch
 * @attr {string} [data-dark-label] - ARIA label for the dark theme
 * @attr {string} [data-light-label] - ARIA label for the light theme
 * @attr {string} [data-theme] - The currently active theme
 *
 * @slot - Default slot for the theme switch buttons
 * @csspart group - Style the default button group

 * @csspart button - Style the button group buttons
 * @csspart light - Style the light theme button
 * @csspart dark - Style the dark theme button
 *
 * @slot light-icon - Slot for a custom light theme icon
 * @slot dark-icon - Slot for a custom dark theme icon
 */
export default class ThemeSwitch extends HTMLElement {
  /**
   * Defines the custom element with provided tag name
   */
  static register(tagName = 'theme-switch') {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    const {
      darkLabel = 'Dark',
      label = 'Color mode',
      lightLabel = 'Light',
    } = this.dataset
    const theme = this.#activeTheme()

    this.dataset.theme = theme

    const template = document.createElement('template')
    template.innerHTML = `<slot>
  <div id="switch" part="group" role="group" aria-label="${label}">
    <button
      id="light"
      part="button light"
      type="button"
      aria-label="${lightLabel}"
      aria-pressed="${theme === 'light' ? 'true' : 'false'}"
      data-theme="light">
      <slot name="light-icon">
        <svg
          aria-hidden="true"
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
    </button>
    <button
      id="dark"
      part="button dark"
      type="button"
      aria-label="${darkLabel}"
      aria-pressed="${theme === 'dark' ? 'true' : 'false'}"
      data-theme="dark">
      <slot name="dark-icon">
        <svg
          aria-hidden="true"
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
    </button>
  </div>
</slot>
`

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    shadow.adoptedStyleSheets.push(stylesheet)

    this.#init(this.shadowRoot.querySelectorAll('button[data-theme]'))

    shadow
      .querySelector('slot')
      .addEventListener('slotchange', (ev) =>
        this.#init(
          ev.target
            .assignedElements({ flatten: true })
            .filter((el) => el.dataset.theme !== undefined)
        )
      )
  }

  #activeTheme() {
    let { theme } = this.dataset

    if (theme) {
      return theme
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return ''
  }

  #init(buttons) {
    const themes = Array.from(buttons).map((button) => button.dataset.theme)

    buttons.forEach((button) => {
      button.addEventListener('click', (ev) => {
        const { strategy } = this.dataset
        const { theme } = button.dataset

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
            themes.forEach((t) =>
              document.documentElement.classList.toggle(t, theme === t)
            )
          } else if (strategy === 'attribute') {
            document.documentElement.dataset.theme = theme
          }

          this.dataset.theme = theme
          buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'))
          button.setAttribute('aria-pressed', 'true')
        } else {
          ev.preventDefault()
        }
      })
    })
  }
}
