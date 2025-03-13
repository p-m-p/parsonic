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

export const Container = {
  render: () => html`
    <div class="container-wrapper">
      <div class="container" id="scroller"><div class="page"></div></div>
      <test-back-to-top
        class="contained-btt"
        data-scroll-behavior="smooth"
        data-scroll-container="scroller"></test-back-to-top>
    </div>
  `,
}
