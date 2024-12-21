import ShareButton from "../packages/share-button";

import "./share-button.css";

ShareButton.register();

export default {
  title: "ShareButton",
};

export const Default = {
  render: () => "<share-button></share-button>",
};

export const Styled = {
  render: () => '<share-button class="styled"></share-button>',
};

export const Custom = {
  render: () => `
    <share-button>
      <button slot="button" class="custom">Share this page</button>
    </share-button>
  `,
};
