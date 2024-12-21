let BaseElement;

if (typeof HTMLElement !== "undefined") {
  BaseElement = HTMLElement;
} else {
  BaseElement = class { };
}

export default class ShareButton extends BaseElement {
  static register(tag = "share-button") {
    if ("share" in navigator) {
      customElements.define(tag, ShareButton);
    }
  }

  connectedCallback() {
    let { url, text, title, buttonText } = this.dataset;

    if (!url) {
      url =
        document
          .querySelector("meta[property='og:url']")
          ?.getAttribute("content") ?? location.href;
    }

    if (!text) {
      text = document
        .querySelector("meta[property='og:description']")
        ?.getAttribute("content");
    }

    if (!title) {
      title =
        document
          .querySelector("meta[property='og:title']")
          ?.getAttribute("content") ?? document.title;
    }

    const data = { url, text, title };

    if (navigator.canShare(data)) {
      const defaultButton = document.createElement("button");
      defaultButton.textContent = buttonText ?? "Share";
      defaultButton.setAttribute("part", "button");

      const slot = document.createElement("slot");
      slot.setAttribute("name", "button");
      slot.appendChild(defaultButton);

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(slot);

      slot.addEventListener("click", async (ev) => {
        ev.preventDefault();

        const canShare = this.dispatchEvent(
          new CustomEvent("share", {
            cancelable: true,
            bubbles: true,
            detail: data,
          }),
        );

        if (canShare) {
          try {
            await navigator.share(data);
          } catch (err) { }
        }
      });
    }
  }
}
