const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const unpicShortcode = require("@unpic/11ty");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "unpic",
    functionsDir: "./netlify/functions/",
  });

  eleventyConfig.addShortcode("unpic", unpicShortcode);
};
