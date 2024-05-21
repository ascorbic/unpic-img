const { transformProps } = require("@unpic/core");

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("unpic", function(props) {
    const transformedProps = transformProps(props);
    const attributes = Object.entries(transformedProps)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    return `<img ${attributes}>`;
  });
};
