# Share button

A web component for adding a share button to any web page.

## Install

```shell
npm install --save @parsonic/share-button
```

## Usage

Use the share button with your favourite bundler or directly from a CDN. A
minified build is provided as `min.js` with a source map.

### Quick start

Add a script tag with the minified build and use the button in your page.

```html
<script
  defer
  src="https://cdn.jsdelivr.net/npm/@parsonic/share-button/min.js"></script>
<share-button data-button-label="Share this page"></share-button>
```

### Bundler

Import the `ShareButton` component at the root of your application and register
it.

```js
import ShareButton from '@parsonic/share-button/ShareButton.js'

ShareButton.register()

// Use <share-button></share-button> in your page or components
```

### CDN

Import the `ShareButton` component from the CDN and register it before using.

```html
<script type="module">
  import ShareButton from 'https://cdn.jsdelivr.net/npm/@parsonic/share-button/ShareButton.js'

  ShareButton.register()
</script>

<share-button></share-button>
```

If you prefer to give the share button an alternative tag name you can pass this
to the register method.

```js
// To use as <my-share-button></my-share-button>
ShareButton.register('my-share-button')
```

## Providing the share data

The share button uses the [`navigator.share`][share] feature if the browser
supports it. If the share feature is not available the component will not be
defined and will either show the fallback content or no button at all.

For control over the share data you can provide the share button with data
attributes. Below is an example using Nunjucks template syntax.

```html
<share-button
  data-url="{{ post.url }}"
  data-title="{{ post.title }}"
  data-text="{{ post.description }}"></share-button>
```

If the data attributes aren't provided the component will attempt to find the
share data values from meta tags on the page using the [Open Graph][open-graph]
protocol.

```html
<meta property="og:url" content="{{ post.url }}" />
<meta property="og:title" content="{{ post.title }}" />
<meta property="og:description" content="{{ post.description }}" />
```

Failing to find either the data attributes or the Open Graph meta tags the
button will default to using the page URL (`window.location.href`), the document
title (`document.title`) and no text content.

## Customising the button

You can customise the button by providing your own label, styling it or
replacing it with your own button.

Provide a label for the button with the `data-button-label` attribute.

```html
<share-button data-button-label="Share this page"></share-button>
```

Style the button using the `button` part selector.

```css
share-button::part(button) {
  /* button styles */
}
```

Provide your own button in the `button` slot.

```html
<share-button>
  <button slot="button">My cool button<button>
</share-button>
```

## `share` event

When the share button is clicked a [custom event][custom-event] with the name
`share` is dispatched. This event has the share data as the payload, bubbles and
is cancelable. The event name can be customised by setting the
`data-share-event-name` attribute.

```js
// Example metric capture
document.addEventListener('share', (ev) => {
  const { url, title } = ev.detail

  metrics.track('share', { url, title })
})

// Cancel the share action for some reason
document.addEventListener('share', (ev) => {
  if (preventSharing(ev.detail.url)) {
    ev.preventDefault()
  }
})
```

## `shareResult` event

Once the share action completes a [custom event][custom-event] with the result
is dispatched. If the share action was successful the `result` attribute will be
set to `'success'` otherwise it will be `'error'`. When the result is an error
the [error][share-exceptions] object will be in the event payload. The event
bubbles but is not cancelable. The event name can be customised by setting the
`data-result-event-name` attribute.

```js
document.addEventListener('shareResult', (ev) => {
  const { result } = ev.detail

  if (result === 'success') {
    metrics.track('articleShare', ev.detail.data)
  } else {
    metrics.track('shareFailed', ev.detail.error.message)
  }
})
```

## Fallback content

Fallback content can be provided for situations where the native share function
isn't available or the component script isn't loaded. Please see this [blog
post][blog-post] for thorough explanation of using fallback content.

```html
<share-button>
  <button popovertarget="fallback">Share</button>

  <div popover id="fallback">
    <h2>Share this post</h2>

    <div>
      <label>Page URL</label>
      <input value="{{ post.url }}" readonly />
    </div>
  </div>
</share-button>
```

[share]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
[open-graph]: https://ogp.me/
[custom-event]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[dist]: https://cdn.jsdelivr.net/npm/@parsonic/share-button@0.2.0/dist/
[blog-post]: https://philparsons.co.uk/blog/dont-fouc-up-your-web-components/
[share-exceptions]:
  https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#exceptions
