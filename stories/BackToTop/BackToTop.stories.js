import { html } from 'lit'
import BackToTop from '../../packages/back-to-top/BackToTop.js'

import './back-to-top.css'

BackToTop.register('test-back-to-top')

export default {
  tags: ['autodocs'],
  title: 'BackToTop',
}

export const Default = {
  render: () =>
    html`<div class="page"><test-back-to-top></test-back-to-top></div>`,
}
