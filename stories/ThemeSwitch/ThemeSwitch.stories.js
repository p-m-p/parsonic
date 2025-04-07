import { html } from 'lit'
import ThemeSwitch from '../../packages/theme-switch/ThemeSwitch.js'

import './theme-switch.css'

ThemeSwitch.register('test-theme-switch')

export default {
  tags: ['autodocs'],
  title: 'ThemeSwitch',
}

export const Default = {
  render: () => html`<test-theme-switch></test-theme-switch>`,
}

export const AttributeStrategy = {
  render: () =>
    html`<test-theme-switch data-strategy="attribute"></test-theme-switch>`,
}

export const IconSlots = {
  render: () =>
    html`<test-theme-switch
      ><span slot="light-icon">L</span
      ><span slot="dark-icon">D</span></test-theme-switch
    >`,
}

export const CustomSelection = {
  render: () =>
    html`<test-theme-switch
      class="custom-selection"
      data-strategy="class"
      data-theme="green"
      data-themes="red,green,blue">
      <button type="button" data-theme="red">Red</button>
      <button type="button" data-theme="green">Green</button>
      <button type="button" data-theme="blue">Blue</button>
    </test-theme-switch>`,
}
