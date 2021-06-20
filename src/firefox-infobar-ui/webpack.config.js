/* eslint-env node */

process.env.UI = "firefox-infobar-ui";
process.env.TARGET_BROWSER = "firefox";

export const firefoxInfobarUiEntrypoints = {
  background: `../firefox-infobar-ui/ts/background-scripts/background.js/index.ts`,
};

const coreConfig = require("../core/webpack.config");

coreConfig.entry = {
  ...coreConfig.entry,
  ...firefoxInfobarUiEntrypoints,
};

module.exports = coreConfig;
