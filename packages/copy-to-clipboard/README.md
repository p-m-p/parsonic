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

The text content of the element will be copied to the clipboard when the copy
button is pressed unless the clipboard item is explicitly set.

```html
<copy-to-clipboard>
  <h2>This text will be copied to the clipboard</h2>
  <p>This text will also be copied to the clipboard</p>
</copy-to-clipboard>
```

To better format the text either pass the text content to the `data-text`
attribute on the element or set it using the `item` property on the underlying
object. This property is useful when using the element with a JavaScript
framework like React.

```html
<copy-to-clipboard data-text="This is the text copied to the clipboard">
  <h2>This text will not be copied to the clipboard</h2>
  <p>This text will also not be copied to the clipboard</p>
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
data directly.

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

Data like this can also be set using the item property of the underlying object.

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

The default button can be replaced with a custom button using the slot named
`button`.

```html
<copy-to-clipboard>
  <pre><code>Text to copy...</code></pre>
  <button slot="button">Copy</button>
</copy-to-clipboard>
```

For devices that support hover the button is only visible when focused or when
the element is hovered. To show the button all the time set the opacity value to
`1` using the `button` css part.

```css
copy-to-clipboard::part(button) {
  opacity: 1;
}
```

To style the icons inside the button use the `copy-icon` and `done-icon` css
parts to target the SVG elements.

```css
copy-to-clipboard::part(done-icon) {
  stroke: lightgreen;
}
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
  --ctc-button-size: 1rem;
  --ctc-button-transition: 300ms;
}
```

## `copy` event

When the copy button is pressed the element dispatches a `ClipboardEvent` of
type `copy`. The event is set to bubble and is cancellable. If the item being
copied is plain text the `clipboardData` attribute will be present and contain
the text being copied. This is for convenience only and any changes to the text
in the data transfer item will not be written to the clipboard.

```js
document.addEventListener('copy', (ev) => {
  if (ev.clipboardData) {
    console.log(ev.clipboardData.getData('text/plain'))
  }
})
```

## `copyResult` event

Once the item is written to the clipboard the element dispatches a `copyResult`
custom event. If successful the event detail has a `result` of `'success'` and
contains the `ClipboardItem` as `data`. If an error occurred the `result` will
be `'error'` and the `error` is provided.
