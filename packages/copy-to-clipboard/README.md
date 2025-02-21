# Copy To Clipboard

A web component for copying items to the clipboard.

## Install

```shell
npm install --save @parsonic/copy-to-clipboard
```

## Usage

Use copy to clipboard with your favourite bundler or directly from a CDN. A
minified build is provided as `min.js` with a source map.

### Quick start

Add a script tag with the minified build and use the element in your page.

```html
<script
  defer
  src="https://cdn.jsdelivr.net/npm/@parsonic/copy-to-clipboard/min.js"></script>
<copy-to-clipboard>
  <pre><code>npm install --save @parsonic/copy-to-clipboard</code></pre>
</copy-to-clipboard>
```

### Bundler

Import the `CopyToClipbard` component at the root of your application and
register it.

```js
import ShareButton from '@parsonic/copy-to-clipboard/CopyToClipbard.js'

CopyToClipbard.register()

// Use <copy-to-clipboard></copy-to-clipboard> in your page or components
```

### CDN

Import the `CopyToClipbard` component from the CDN and register it before using.

```html
<script type="module">
  import CopyToClipboard from 'https://cdn.jsdelivr.net/npm/@parsonic/copy-to-clipboard/CopyToClipbard.js'

  CopyToClipbard.register()
</script>

<copy-to-clipboard>
  <!-- Content to copy -->
</copy-to-clipboard>
```

If you prefer to give the element an alternative tag name you can pass this to
the register method.

```js
// To use as <my-copy-to-clipboard></my-copy-to-clipboard>
CopyToClipboard.register('my-copy-to-clipboard')
```

## Providing the item to copy

The text content of the DOM nodes within the default slot of the element will be
copied to the clipboard when the copy button is pressed unless the item is
explicitly set. In the example below the `textContent` of the `h2` and `p`
elements is concatenated and copied to the clipboard.

```html
<copy-to-clipboard>
  <h2>This text will be copied to the clipboard</h2>
  <p>This text will also be copied to the clipboard</p>
</copy-to-clipboard>
```

The format of the text can be controlled by passing it in either the `data-text`
attribute on the element.

```html
<copy-to-clipboard data-text="This is the text copied to the clipboard">
  <h2>This text will not be copied to the clipboard</h2>
  <p>This text will also not be copied to the clipboard</p>
</copy-to-clipboard>
```

Or by setting it using the item property of the underlying object. This method
is useful when using the element with a JavaScript framework like React.

```js
const copyToClipboard = document.querySelector('copy-to-clipboard')
copyToClipboard.item = new ClipboardItem({
  'text/plain': 'This is the text to copy',
})
```

### Copying other data types

To use the copy to clipboard for other data types like images pass the URL for
the data to be fetched in the `data-url` attribute.

```html
<copy-to-clipboard data-url="./my-image-full.png">
  <img
    src="./my-image.png"
    alt="An image that can be copied to the clipboard" />
</copy-to-clipboard>
<copy-to-clipboard data-url="data:image/png;...">
  <img
    src="./my-image.png"
    alt="An image that can be copied to the clipboard" />
</copy-to-clipboard>
```

This data can also be set using the item property of the underlying object.

```js
// Copy blob to clipboard if type is supported
if (ClipboardItem.supports(blob.type)) {
  const copyToClipboard = document.querySelector('copy-to-clipboard')
  copyToClipboard.item = new ClipboardItem({
    [blob.type]: blob,
  })
}
```

## Customising the copy button

## `copy` event

## `copyResult` event
