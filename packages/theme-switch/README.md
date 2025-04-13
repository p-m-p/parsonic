# Theme-Switch

A web component for ...

## Install

```shell
npm install --save @parsonic/theme-switch
```

## Usage

Use theme-switch with your favourite bundler or directly from a CDN. A minified
build is provided as `min.js` with a source map.

### Quick start

Add a script tag with the minified build and use the element in your page.

```html
<script
  defer
  src="https://cdn.jsdelivr.net/npm/@parsonic/theme-switch/min.js"></script>
<theme-switch></theme-switch>
```

### Bundler

Import the `ThemeSwitch` component at the root of your application and register
it.

```js
import ThemeSwitch from '@parsonic/theme-switch/ThemeSwitch.js'

ThemeSwitch.register()

// Use <theme-switch></theme-switch> in your page or components
```

### CDN

Import the `ThemeSwitch` component from the CDN and register it before using.

```html
<script type="module">
  import ThemeSwitch from 'https://cdn.jsdelivr.net/npm/@parsonic/theme-switch/ThemeSwitch.js'

  ThemeSwitch.register()
</script>

<theme-switch></theme-switch>
```

If you prefer to give the element an alternative tag name you can pass this to
the register method.

```js
// To use as <my-theme-switch></my-theme-switch>
ThemeSwitch.register('my-theme-switch')
```

## Strategy

The `theme-switch` component does not handle the color scheme itself and
provides either a class name or attribute strategy to switch between different
themes. The strategy is set using the `data-strategy` attribute.

### Class strategy

The class strategy adds a class name to the `html` element, `dark` for dark mode
and `light` for light.

```html
<style>
  :root {
    color-scheme: light dark;
  }

  .dark {
    color-scheme: dark;
  }

  .light {
    color-scheme: light;
  }
</style>

<theme-switch data-strategy="class"></theme-switch>
```

### Attribute strategy

The attribute strategy adds a `data-theme` attribute to the `html` element with
a value of `dark` for dark mode and `light` for light.

```html
<style>
  :root {
    color-scheme: light dark;
  }

  [data-theme='dark'] {
    color-scheme: dark;
  }

  [data-theme='light'] {
    color-scheme: light;
  }
</style>

<theme-switch data-strategy="attribute"></theme-switch>
```

### Custom strategy

To implement a custom strategy like conditional style sheet switching listen for
the `themeSwitch` event and update based on the selected theme.

```html
<link rel="stylesheet" href="/dark.css" media="(prefers-color-scheme:dark)" />
<link rel="stylesheet" href="/light.css" media="(prefers-color-scheme:light)" />

<script>
  const darkSheet = document.querySelector(
    "link[media='(prefers-color-scheme:dark)'"
  )
  const lightSheet = document.querySelector(
    "link[media='(prefers-color-scheme:light)'"
  )

  document.addEventListener('themeSwitch', (ev) => {
    const { theme } = event.detail

    if (theme === 'dark') {
      darkSheet.media = 'all'
      darkSheet.disabled = false

      lightSheet.media = 'not all'
      lightSheet.disabled = true
    } else {
      lightSheet.media = 'all'
      lightSheet.disabled = false

      darkSheet.media = 'not all'
      darkSheet.disabled = true
    }
  })
</script>
```

## Setting the selected theme

To set the selected theme when the element is first rendered, set the
`data-theme` attribute. Depending on the application this might be set from a
server side template, local storage or a cookie.

The example below is a React Component that sets the theme using a custom hook.

```jsx
function ThemeSwitch() {
  const [theme, setTheme] = useTheme()

  return (
    <theme-switch
      data-theme={theme}
      onthemeSwitch={(ev) => setTheme(ev.detail.theme)}></theme-switch>
  )
}
```

## Customising the switch

The default switch is composed of a button group with a sun icon for light mode
and a moon icon for dark mode. The button bar/group has a default label of
`Theme mode` and can be overridden using the `data-label` attribute. The dark
and light mode buttons have the labels `Dark` and `Light` respectively that can
be overridden using the `data-dark-label` and `data-light-label` attributes.

```html
<theme-switch
  data-label="Theme mode"
  data-dark-label="Dark mode"
  data-light-label="Light mode"></theme-switch>
```

The button bar can be styled using the `button-bar` CSS part and the buttons
with the `button`, `light-button` and `dark-button` CSS parts.

```CSS
theme-switch::part(button-bar) {
  background-color: var(--bg-primary);
}

theme-switch::part(button) {
  color: var(--text-secondary);
}

theme-switch[data-theme='dark']::part(dark-button) {
  color: var(--text-selected);
}
```

The default icons can be replaced using the `light-icon` and `dark-icon` slots
and styled via the `icon`, `light-icon` and `dark-icon` CSS parts.

```html
<theme-switch
  ><img slot="light-icon" src="/img/light.svg" /><img
    slot="dark-icon"
    src="/img/dark.svg"
/></theme-switch>
```

<!-- prettier-ignore -->
> [!NOTE]
> When using slots for the icons it's important to avoid any additional
> whitespace after the opening theme-switch tag as this will be rendered
> into the default slot and the element will not be displayed correctly.

The switch may also be styled using the CSS custom properties listed below.

```CSS
:root {
  --ts-button-bar-background: light-dark(
    rgb(0 0 0 / 80%),
    rgb(255 255 255 / 20%)
  );
  --ts-button-bar-border-radius: 999px;

  --ts-lozenge-background: rgb(255 255 255 / 20%);
  --ts-lozenge-border-radius: 999px;
  --ts-lozenge-inset: 0 auto 0 0;
  --ts-lozenge-size: calc(
    var(--ts-button-icon-size) + calc(var(--ts-button-padding) * 2)
  );
  --ts-lozenge-transition-duration: 300ms;

  --ts-button-background: none;
  --ts-button-border: none;
  --ts-button-color: white;
  --ts-button-icon-size: 1.25rem;
  --ts-button-padding: 0.5em;
}
```

## Custom controls

To use custom controls instead of the default button bar, pass your own buttons
in the default slot. Buttons require a `value` attribute with the theme setting
associated with that button.

```html
<theme-switch>
  <div class="theme-buttons">
    <button value="light">☀️</button>
    <button value="system">🖥️</button>
    <button value="dark">🌙</button>
  </div>
</theme-switch>
```

Form fields that emit a `change` event can be used to set the theme instead of
buttons. The example below uses a radio group to set the theme.

```html
<theme-switch>
  <fieldset>
    <legend>Theme mode</legend>
    <label>
      <input type="radio" name="theme" value="light" />
      Light
    </label>
    <label>
      <input type="radio" name="theme" value="system" />
      System
    </label>
    <label>
      <input type="radio" name="theme" value="dark" />
      Dark
    </label>
  </fieldset>
</theme-switch>
```

## Custom theme values

To use custom theme values instead of the default `light` and `dark` supply your
own custom button group or form control.

```html
<theme-switch>
  <label for="theme">Theme mode</label>
  <select id="theme" name="theme">
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
</theme-switch>
```

## `themeSwitch` event

When the theme is switched a [custom event][custom-event] is dispatched. This
event bubbles and can be cancelled to prevent switching if needed.

```js
document.addEventListener('themeSwitch', (ev) => {
  const { theme } = ev.detail

  metrics.track('themeSwitch', { theme })
})
```

The default event name can be overridden using the `data-event-name` attribute.

```html
<theme-switch data-event-name="app:theme-switch"></theme-switch>
```

[custom-event]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
