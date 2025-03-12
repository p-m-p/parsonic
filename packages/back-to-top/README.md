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
<back-to-top>
  <pre><code>npm install --save @parsonic/back-to-top</code></pre>
</back-to-top>
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
