import { html } from 'lit'
import CopyToClipboard from '../../packages/copy-to-clipboard/CopyToClipboard.js'

CopyToClipboard.register('test-copy')

import './copy-to-clipboard.css'

export default {
  tags: ['autodocs'],
  title: 'CopyToClipboard',
}

export const Default = {
  render: () =>
    html`<test-copy>
      <h2>This text will be copied to the clipboard</h2>
      <p>This text will also be copied to the clipboard</p>
    </test-copy>`,
}

export const HTMLNodes = {
  render: () =>
    html`<test-copy id="code-sample">
      <pre
        class="language-ts"><code class="language-ts"><span class="token keyword">type</span> <span class="token class-name">Variant</span> <span class="token operator">=</span> <span class="token string">"tile"</span> <span class="token operator">|</span> <span class="token string">"section"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">CardElement</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
  variant<span class="token operator">:</span> Variant<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Card</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token keyword">implements</span> <span class="token class-name">CardElement</span> <span class="token punctuation">{</span>
  #variant<span class="token operator">:</span> Variant <span class="token operator">=</span> <span class="token string">"tile"</span><span class="token punctuation">;</span>

  <span class="token keyword">get</span> <span class="token function">variant</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#variant<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">variant</span><span class="token punctuation">(</span>variant<span class="token operator">:</span> Variant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#variant <span class="token operator">=</span> variant<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
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
