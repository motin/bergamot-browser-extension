import * as cmd from "selenium-webdriver/lib/command";
// @ts-ignore
import { Options, Profile } from "selenium-webdriver/firefox";
import { Builder, WebDriver as OriginalWebDriver } from "selenium-webdriver";
import { normalizeBinary } from "fx-runner/lib/utils";
import * as fs from "fs";
import { resolve, join } from "path";

async function pathToFirefoxBinary(binary) {
  try {
    const normalizedBinary = resolve(await normalizeBinary(binary));
    await fs.promises.stat(normalizedBinary);
    return normalizedBinary;
  } catch (ex) {
    if (ex.code === "ENOENT") {
      throw new Error(`Could not find ${binary}`);
    }
    throw ex;
  }
}

export interface WebDriver extends OriginalWebDriver {
  setContext: (string) => void;
}

/**
 * Enum of available command contexts.
 *
 * Command contexts are specific to Marionette, and may be used with the
 * {@link #context=} method. Contexts allow you to direct all subsequent
 * commands to either "content" (default) or "chrome". The latter gives
 * you elevated security permissions.
 *
 * @enum {string}
 */
export const Context = {
  CONTENT: "content",
  CHROME: "chrome",
};

export const setupWebdriver = {
  /**
   * Launches Firefox.
   *
   * @param {object} FIREFOX_PREFERENCES key-value of prefname value.
   * @returns {Promise<*>} driver A configured Firefox webdriver object
   */
  promiseSetupDriver: async (FIREFOX_PREFERENCES): Promise<WebDriver> => {
    const profile = new Profile();

    Object.keys(FIREFOX_PREFERENCES).forEach(key => {
      profile.setPreference(key, FIREFOX_PREFERENCES[key]);
    });

    const options = new Options();
    options.setProfile(profile);

    const builder = new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options);

    // Use standalone geckodriver server if GECKODRIVER_URL env var is set
    // (this is useful for debugging test failures)
    if (process.env.GECKODRIVER_URL) {
      builder.usingServer(process.env.GECKODRIVER_URL);
    }

    const binaryLocation = await pathToFirefoxBinary(
      process.env.FIREFOX_BINARY || "firefox",
    );
    await options.setBinary(binaryLocation);
    const driver: WebDriver = <WebDriver>await builder.build();

    // Firefox will have started up by now
    driver.setContext(Context.CHROME);
    return driver;
  },

  /**
   * Install extension from a specific path
   *
   * Path defaults to the relative path found in the EXTENSION_ZIP
   * environment variable.
   *
   * @param {object} driver Configured Firefox webdriver
   * @param {string} fileLocation location for extension xpi/zip
   * @returns {Promise<void>} returns extension id)
   */
  installExtension: async (driver, fileLocation: string = null) => {
    fileLocation =
      fileLocation || join(process.cwd(), process.env.EXTENSION_ARTIFACT);

    const executor = driver.getExecutor();
    executor.defineCommand(
      "installExtension",
      "POST",
      "/session/:sessionId/moz/addon/install",
    );
    const installCmd = new cmd.Command("installExtension");

    const session = await driver.getSession();
    installCmd.setParameters({
      sessionId: session.getId(),
      path: fileLocation,
      temporary: true,
    });
    const extensionId = await executor.execute(installCmd);
    console.log(
      `Extension at ${fileLocation} installed with (extensionId: ${extensionId})`,
    );
    return extensionId;
  },

  uninstallExtension: async (driver, extensionId) => {
    const executor = driver.getExecutor();
    executor.defineCommand(
      "uninstallExtension",
      "POST",
      "/session/:sessionId/moz/addon/uninstall",
    );
    const uninstallCmd = new cmd.Command("uninstallExtension");

    const session = await driver.getSession();
    uninstallCmd.setParameters({ sessionId: session.getId(), id: extensionId });
    await executor.execute(uninstallCmd);
    console.log(`Extension with id ${extensionId} uninstalled`);
  },
};
