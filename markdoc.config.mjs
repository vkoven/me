import { defineMarkdocConfig, component, Markdoc } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component("./src/components/Fence.astro"),
      attributes: {
        content: { type: String, required: true },
        language: { type: String },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const render = config.nodes?.fence?.render ?? "pre";
        return new Markdoc.Tag(render, attributes, []);
      },
    },
  },
});
