# Back To Top

A web component for scrolling back to the top of the page.

## Install

```shell
npm install --save @parsonic/back-to-top
```

## Usage

Use copy to clipboard with your favourite bundler or directly from a CDN. A
minified build is provided as `min.js` with a source map.

### Quick start

Add a script tag with the minified build and use the element in your page.

```html
<script
  defer
  src="https://cdn.jsdelivr.net/npm/@parsonic/back-to-top/min.js"></script>
<back-to-top data-scroll-behavior="smooth"></back-to-top>
```

### Bundler

Import the `BackToTop` component at the root of your application and register
it.

```js
import BackToTop from '@parsonic/back-to-top/BackToTop.js'

BackToTop.register()

// Use <back-to-top></back-to-top> in your page or components
```

### CDN

Import the `BackToTop` component from the CDN and register it before using.

```html
<script type="module">
  import BackToTop from 'https://cdn.jsdelivr.net/npm/@parsonic/back-to-top/BackToTop.js'

  BackToTop.register()
</script>

<back-to-top>
  <!-- Content to copy -->
</back-to-top>
```

If you prefer to give the element an alternative tag name you can pass this to
the register method.

```js
// To use as <my-back-to-top></my-back-to-top>
BackToTop.register('my-back-to-top')
```

## Scroll behavior

The [scroll behavior]() when the button is clicked can be set by specifying the
`data-scroll-behavior` attribute.

```html
<back-to-top data-scroll-behavior="smooth"></back-to-top>
```

Alternatively, the setting for `scroll-behavior` can be set via CSS for the
document or container being scrolled.

```css
html {
  scroll-behavior: smooth;
}
```

## Appearance

The button will appear once the container has scrolled past a threshold and the
user starts to scroll back up the page or container. The default threshold is
`500px` and this can be overridden using the `data-threshold` attribute.

```html
<back-to-top data-threshold="0"></back-to-top>
```

## Scrolling inside a container element

The back to top button may also be used when scrolling within an element by
providing the element id in the `data-scroll-container` attribute. If the button
needs to be aligned to the element then update the default positioning with CSS.

```html
<style>
  .page {
    height: 800px;
    position: relative;
  }

  #container {
    height: 100%;
    overflow: auto;
  }

  back-to-top {
    position: absolute;
  }
</style>

<div class="page">
  <div id="container">
    <!--- long form content --->
  </div>
  <back-to-top scroll-container="container"></back-to-top>
</div>
```

## Customising the button

The default button comprises of a button element with an SVG icon. A default
ARIA label of `Back to top` is applied to the button and can be overridden using
the `data-button-label` attribute.

```html
<back-to-top data-button-label="Back to top"></back-to-top>
```

The button can be replaced entirely using the default slot or styled via the
`button` css part.

```html
<style>
  back-to-top::part(button) {
    background-color: rgb(0 0 0 / 40%);
  }
</style>

<back-to-top>
  <button>Back 👆</button>
</back-to-top>
```

To style the icon inside the button use the `icon` css part to target the SVG
elements.

```css
back-to-top::part(icon) {
  stroke: black;
}
```

To replace the icon use the `icon` slot.

```html
<back-to-top>
  <span slot="icon">👆</span>
</back-to-top>
```

The button may also be styled using the CSS custom properties listed below and
via. the `data-state` attribute which will have one of two states, `active` or
`inactive` depending on whether the button should be visible or not.

```css
:root {
  --btt-button-background: rgb(0 0 0 / 60%);
  --btt-button-background-hover: rgb(0 0 0 / 80%);
  --btt-button-border: none;
  --btt-button-color: white;
  --btt-button-inset: auto 2rem 2rem auto;
  --btt-button-padding: 0.5rem;
  --btt-button-radius: 999px;
  --btt-button-size: 1.5rem;
}
```
