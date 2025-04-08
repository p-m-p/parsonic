import { html } from 'lit'
import ThemeSwitch from '../../packages/theme-switch/ThemeSwitch.js'

import './theme-switch.css'

ThemeSwitch.register('test-theme-switch')

export default {
  decorators: [(story) => html`<div class="theme-page">${story()}</div>`],
  tags: ['autodocs'],
  title: 'ThemeSwitch',
}

export const Default = {
  render: () => html`<test-theme-switch></test-theme-switch>`,
}

export const AttributeStrategy = {
  render: () =>
    html`<test-theme-switch
      data-strategy="attribute"
      data-theme="light"></test-theme-switch>`,
}

export const IconSlots = {
  render: () =>
    html`<test-theme-switch
      ><span slot="light-icon">L</span
      ><span slot="dark-icon">D</span></test-theme-switch
    >`,
}

export const CustomButtons = {
  render: () =>
    html`<test-theme-switch
      class="custom-selection"
      data-theme="system"
      data-strategy="class">
      <button value="light">Light</button>
      <button value="system" aria-pressed="true">System</button>
      <button value="dark">Dark</button>
    </test-theme-switch>`,
}

export const CustomControl = {
  render: () =>
    html`<test-theme-switch class="" data-theme="system">
      <select name="theme">
        <option value="light">Light</option>
        <option value="system" selected>System</option>
        <option value="dark">Dark</option>
      </select>
    </test-theme-switch>`,
}
