import { html } from 'lit'
import ThemeSwitch from '../../packages/theme-switch/ThemeSwitch.js'

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

export const CustomSelection = {
  render: () =>
    html`<test-theme-switch
      data-strategy="class"
      data-theme="green"
      data-themes="red,green,blue">
      <select name="theme">
        <option value="red">Red</option>
        <option value="green" selected>Green</option>
        <option value="blue">Blue</option>
      </select>
    </test-theme-switch>`,
}
