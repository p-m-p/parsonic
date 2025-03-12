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

Import the `CopyToClipboard` component at the root of your application and
register it.

```js
import CopyToClipboard from '@parsonic/copy-to-clipboard/CopyToClipboard.js'

CopyToClipboard.register()

// Use <copy-to-clipboard></copy-to-clipboard> in your page or components
```

### CDN

Import the `CopyToClipboard` component from the CDN and register it before
using.

```html
<script type="module">
  import CopyToClipboard from 'https://cdn.jsdelivr.net/npm/@parsonic/copy-to-clipboard/CopyToClipboard.js'

  CopyToClipboard.register()
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

The text content of the element will be copied to the clipboard when the copy
button is pressed unless the clipboard item is explicitly set.

```html
<copy-to-clipboard>
  <p>This text will be copied to the clipboard</p>
</copy-to-clipboard>
```

To better format the text either pass the text content to the `data-text`
attribute on the element or set it using the `item` property on the underlying
object. This property is useful when using the element with a JavaScript
framework like React.

```html
<copy-to-clipboard data-text="This is the text copied to the clipboard">
  <!-- Page content -->
</copy-to-clipboard>
```

```js
const copyToClipboard = document.querySelector('copy-to-clipboard')
copyToClipboard.item = new ClipboardItem({
  'text/plain': formattedText,
})
```

### Copying other data types

To copy other data types like an image to the clipboard pass the URL to the data
in the `data-url` attribute. The URL may point to a separate file or contain the
data directly as a data URL.

```html
<copy-to-clipboard data-url="./my-image-full.png">
  <img src="./my-image.png" />
</copy-to-clipboard>

<copy-to-clipboard data-url="data:image/png;...">
  <img src="./my-image.png" />
</copy-to-clipboard>
```

As with text the item property of the underlying object can be used for other
data types.

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

The default button comprises of a button element with two SVG icons, the
clipboard icon and the done icon. When the button is pressed an animation is
applied to the icons to briefly show the done icon as a visual indicator that
the copy was successful. A default ARIA label of `Copy` is applied to the button
that can be set using the `data-button-label` attribute.

```html
<copy-to-clipboard
  data-button-label="Copy image to clipboard"></copy-to-clipboard>
```

The button can be replaced entirely using the slot named `button` or styled. via
the `button` css part.

```html
<copy-to-clipboard>
  <pre>Text to copy...</pre>
  <button slot="button">Copy</button>
</copy-to-clipboard>
```

To style the icons inside the button use the `copy-icon` and `done-icon` css
parts to target the SVG elements.

```css
copy-to-clipboard::part(done-icon) {
  stroke: lightgreen;
}
```

To replace the icons use the `copy-icon` and `done-icon` slots.

```html
<copy-to-clipboard>
  <pre>...</pre>
  <svg
    slot="copy-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
</copy-to-clipboard>
```

The button may also be styled using the CSS custom properties listed below.

```css
:root {
  --ctc-button-background: rgb(255 255 255 / 8%);
  --ctc-button-border: none;
  --ctc-button-color: inherit;
  --ctc-button-inset: 0.5rem 0.5rem auto auto;
  --ctc-button-padding: 0.5rem;
  --ctc-button-radius: 0.5rem;
}
```

## `copy` event

When the copy button is pressed the element dispatches a `ClipboardEvent` of
type `copy`. The event is set to bubble and is cancellable and contains the
`clipboardData` data transfer object. An event handler may set plain text data
to be copied on the data transfer.

```html
<copy-to-clipboard>
  <label for="field">A form field</label>
  <textarea id="field">Some text to copy</textarea>
</copy-to-clipboard>

<script>
  document.addEventListener('copy', (ev) => {
    const fieldValue = ev.target.querySelector('textarea').value
    ev.clipboardData.setData('text/plain', fieldValue)
  })
</script>
```

## `copyResult` event

Once the item is written to the clipboard the element dispatches a `copyResult`
custom event. If successful the event detail has a `result` of `'success'` and
contains the `ClipboardItem` as `data`. If an error occurred the `result` will
be `'error'` and the `error` is provided.

```js
document.querySelector('copyResult', (ev) => {
  if (ev.detail.result === 'success') {
    console.log('Item copied to ciipbard', ev.detail.data)
  } else {
    console.error('Failed to copy', ev.detail.error)
  }
})
```
