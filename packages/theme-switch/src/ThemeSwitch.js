import stylesheet from './style.css' with { type: 'css' }

/**
 * @typedef {object} ThemeSwitchDetail
 * @property {string} theme - The selected theme
 */

/**
 * @tagName theme-switch
 *
 * @attr {string} [data-label] - ARIA label for the theme switcher
 * @attr {string} [data-dark-label] - ARIA label for the dark theme button
 * @attr {string} [data-light-label] - ARIA label for the light theme button
 * @attr {string} [data-theme] - The currently active theme
 * @attr {string} [data-event-name] - The name of the theme switch event
 *
 * @slot - Default slot for the theme switch control
 * @csspart button-bar - Style the button bar
 *
 * @csspart button - Style the button group buttons
 * @csspart light-button - Style the light theme button
 * @csspart dark-button - Style the dark theme button
 *
 * @csspart icon - Style the default icons
 *
 * @slot light-icon - Slot for a custom light theme icon
 * @csspart light-icon- Style the light theme icon
 *
 * @slot dark-icon - Slot for a custom dark theme icon
 * @csspart dark-icon - Style the dark theme icon
 *
 * @fires {CustomEvent<ThemeSwitchDetail>} themeSwitch - Event dispatched when the theme is switched
 */
export default class ThemeSwitch extends HTMLElement {
  /**
   * Defines the custom element with provided tag name
   */
  static register(tagName = 'theme-switch') {
    customElements.define(tagName, this)
  }

  #buttons = []

  connectedCallback() {
    const {
      darkLabel = 'Dark',
      label = 'Theme mode',
      lightLabel = 'Light',
    } = this.dataset
    const theme = this.#activeTheme()

    this.dataset.theme = theme

    const darkPressed = theme === 'dark' ? 'true' : 'false'
    const lightPressed = theme === 'light' ? 'true' : 'false'

    const template = document.createElement('template')
    template.innerHTML = `<slot>
  <div id="switch" part="button-bar" role="group" aria-label="${label}">
    <button
      id="light"
      part="button light-button"
      type="button"
      aria-label="${lightLabel}"
      aria-pressed="${lightPressed}"
      value="light">
      <slot name="light-icon" class="icon-slot">
        <svg
          aria-hidden="true"
          part="icon light-icon"
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
      part="button dark-button"
      type="button"
      aria-label="${darkLabel}"
      aria-pressed="${darkPressed}"
      value="dark">
      <slot name="dark-icon" class="icon-slot">
        <svg
          aria-hidden="true"
          part="icon dark-icon"
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

    const defaultSlot = this.shadowRoot.querySelector('slot')
    this.#buttons = Array.from(defaultSlot.querySelectorAll('button[value]'))

    defaultSlot.addEventListener('slotchange', (ev) => {
      this.#buttons = ev.target
        .assignedElements()
        .flatMap((el) =>
          el instanceof HTMLButtonElement && el.value !== undefined
            ? [el]
            : Array.from(el.querySelectorAll('button[value]'))
        )
    })
    defaultSlot.addEventListener('click', (ev) => this.#handleThemeSwitch(ev))
    defaultSlot.addEventListener('change', (ev) => this.#handleThemeSwitch(ev))
  }

  disconnectedCallback() {
    this.#buttons.length = 0
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

  #handleThemeSwitch(ev) {
    const { strategy, eventName = 'themeSwitch' } = this.dataset
    const button =
      ev.target instanceof HTMLButtonElement
        ? ev.target
        : ev.target.closest('button')
    const theme = ev.target.value ?? button?.value

    if (
      theme &&
      theme !== this.dataset.theme &&
      this.dispatchEvent(
        new CustomEvent(eventName, {
          bubbles: true,
          cancelable: true,
          detail: { theme },
        })
      )
    ) {
      if (strategy === 'class') {
        if (document.documentElement.classList.contains(this.dataset.theme)) {
          document.documentElement.classList.remove(this.dataset.theme)
        }
        document.documentElement.classList.add(theme)
      } else if (strategy === 'attribute') {
        document.documentElement.dataset.theme = theme
      }

      this.dataset.theme = theme

      if (this.#buttons.length > 1) {
        this.#buttons.forEach((b) =>
          b.setAttribute('aria-pressed', b.value === theme)
        )
      }
    }
  }
}
