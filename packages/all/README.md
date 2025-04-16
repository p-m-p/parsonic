# All components, one package

Love `parsonic`? Want to use all the components? This is the package for you!

## Install

```shell
npm install --save @parsonic/all
```

## Usage

Use the components with your favourite bundler or directly from a CDN. A
minified build is provided as `min.js` with a source map.

### Quick start

Add a script tag with the minified build and use the element in your page.

```html
<script defer src="https://cdn.jsdelivr.net/npm/@parsonic/all/min.js"></script>
```

### Bundler

Import the module at the root of your application.

```js
import '@parsonic/all'
```

If you want to control when the components are registered use the `register`
method from the `components` module instead.

```js
import { register } from '@parsonic/all/components.js'

register()
```

If you prefer to prefix element names pass this to the register method.

```js
import { register } from '@parsonic/all/components.js'

// To use <myapp-back-to-top></myapp-back-to-top>
register('myapp')
```
