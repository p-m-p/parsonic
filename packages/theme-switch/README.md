# Theme-Switch

A web component for ...

## Install

```shell
npm install --save @parsonic/back-to-top
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
