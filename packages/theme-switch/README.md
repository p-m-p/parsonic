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

```html
<theme-switch data-theme="dark" data-strategy="class"></theme-switch>
```
