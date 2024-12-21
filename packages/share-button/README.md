# Share button

A web component for adding a share button to any web page.

## Install

```shell
npm install --save @parsonic/share-button
```

## Usage

The share button can be used with your favourite bundler or directly
from a CDN.

### Bundler

Import the component at the root of your application and register it.

```js
import ShareButton from '@parsonic/share-button'

ShareButton.register()

// Use <share-button></share-button> in your page or components
```

### CDN

Import the component from the CDN and register it before using.

```html
<script type="module">
  import ShareButton from '@parsonic/share-button'

  ShareButton.register()
</script>

<share-button></share-button>
```

If you prefer to give the share button an alternative tag name you can
pass this to the register method.

```js
// To use as <my-share-button></my-share-button>
ShareButton.register('my-share-button')
```

## Providing the share data

The share button uses the [`navigator.share`][share] feature if the browser
supports it. If the share feature is not available the component will not be
defined and will either show the fallback content or no button at all.

For control over the share data you can provide the share button with data
attribute. Below is an example using Nunjucks template syntax.

```html
<share-button
  data-url="{{ post.url }}"
  data-title="{{ post.title }}"
  data-text="{{ post.description }}"
></share-button>
```

If the data attributes aren't provided the component will attempt to find
the share data values from meta tags on the page using the
[Open Graph][open-graph] protocol.

```html
<meta property="og:url" content="{{ post.url }}" />
<meta property="og:title" content="{{ post.title }}" />
<meta property="og:description" content="{{ post.description }}" />
```

Failing to find either the data attributes or the Open Graph meta tags the
button will default to using the page URL (`window.location.href`), the
document title (`document.title`) and no text content.

## Customising the button

You can customise the button by providing your own label, styling it or
replacing it with your own button.

Provide a label for the button with the `data-button-label` attribute.

```html
<share-button data-button-label="Share this page"></share-button>
```

Style the button use the `button` part selector.

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

## Share event

When the share button is clicked a custom event with the name `share` is
dispatched. This event has the share data as the payload, bubbles and is
cancelable.

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

[share]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
[open-graph]: https://ogp.me/
