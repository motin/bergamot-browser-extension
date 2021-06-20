/* eslint-env node */

process.env.UI = "cross-browser-ui";

export const crossBrowserUiEntrypoints = {
  background: `../cross-browser-ui/ts/background-scripts/background.js/index.ts`,
  "options-ui":
    "../cross-browser-ui/ts/extension-pages/options-ui.js/index.tsx",
  "get-started":
    "../cross-browser-ui/ts/extension-pages/get-started.js/index.tsx",
  "main-interface":
    "../cross-browser-ui/ts/extension-pages/main-interface.js/index.tsx",
};

const coreConfig = require("../core/webpack.config");

coreConfig.entry = {
  ...coreConfig.entry,
  ...crossBrowserUiEntrypoints,
};

const postcssOptions = require("./postcss.config");

let postCssLoaderConfigInjected = false;

coreConfig.module.rules = [
  ...coreConfig.module.rules.map(rule => {
    if (rule.use && rule.use[0] === "style-loader") {
      rule.use.push({
        loader: "postcss-loader",
        options: {
          postcssOptions,
        },
      });
      postCssLoaderConfigInjected = true;
    }
    return rule;
  }),
  {
    test: /\.svg/,
    use: {
      loader: "svg-url-loader",
      options: {},
    },
  },
  {
    test: /\.(woff|woff2|eot|ttf|png|jpeg|jpg)$/,
    use: [{ loader: "file-loader" }],
  },
  {
    test: /\.js$/,
    exclude: /node_modules[/\\](?!react-data-grid[/\\]lib)/,
    use: "babel-loader",
  },
];

// Make this error explicit to make troubleshooting easier
if (!postCssLoaderConfigInjected) {
  throw new Error("The postcss-loader config was not injected");
}

const path = require("path");
coreConfig.resolve.modules = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../../../node_modules"),
  "node_modules",
];

module.exports = coreConfig;
