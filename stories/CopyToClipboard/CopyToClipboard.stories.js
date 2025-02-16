import { html } from 'lit'
import CopyToClipboard from '../../packages/copy-to-clipboard/CopyToClipboard.js'

CopyToClipboard.register('test-copy')

import './copy-to-clipboard.css'

export default {
  tags: ['autodocs'],
  title: 'CopyToClipboard',
}

export const Default = {
  render: () => html`<test-copy>This text content will be copied</test-copy>`,
}

export const HTMLNodes = {
  render: () =>
    html`<test-copy>
      <div>
        <h1>This is the title</h1>
        <p>This is a paragraph of text</p>
      </div>
    </test-copy>`,
}

export const TextAttribute = {
  render: () =>
    html`<test-copy data-text="This text content will be copied"
      >Copy to clipboard</test-copy
    >`,
}

export const DataURL = {
  render: () =>
    html`<test-copy
      data-url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAZKADAAQAAAABAAAAZAAAAAAvu95BAAABPUlEQVR4Ae3SMREAIQADwee1YgmZeGBwwPWb+qqdjLn2Z28C/1umugKwwg9gwQoCIfUsWEEgpJ4FKwiE1LNgBYGQehasIBBSz4IVBELqWbCCQEg9C1YQCKlnwQoCIfUsWEEgpJ4FKwiE1LNgBYGQehasIBBSz4IVBELqWbCCQEg9C1YQCKlnwQoCIfUsWEEgpJ4FKwiE1LNgBYGQehasIBBSz4IVBELqWbCCQEg9C1YQCKlnwQoCIfUsWEEgpJ4FKwiE1LNgBYGQehasIBBSz4IVBELqWbCCQEg9C1YQCKlnwQoCIfUsWEEgpJ4FKwiE1LNgBYGQehasIBBSz4IVBELqWbCCQEg9C1YQCKlnwQoCIfUsWEEgpJ4FKwiE1LNgBYGQehasIBBSz4IVBELqWbCCQEg9C1YQCKlnBawDpcoCrl2JgUcAAAAASUVORK5CYII="
      >Copy image</test-copy
    >`,
}
