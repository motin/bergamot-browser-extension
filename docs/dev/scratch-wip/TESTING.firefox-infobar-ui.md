<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Contents**

- [Testing Instructions](#testing-instructions)
  - [Manual / QA TEST Instructions](#manual--qa-test-instructions)
    - [Preparations](#preparations)
  - [Expected User Experience / Functionality](#expected-user-experience--functionality)
    - [Surveys](#surveys)
    - [Do these tests (in addition to ordinary regression tests)](#do-these-tests-in-addition-to-ordinary-regression-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Testing Instructions

## Manual / QA TEST Instructions

### Preparations

1. Create a fresh profile in Nightly
2. Make sure that the following preferences are set to `true` in `about:config`:

- `xpinstall.signatures.dev-root` (create this pref if it doesn't exist)
- `dom.postMessage.sharedArrayBuffer.bypassCOOP_COEP.insecure.enabled`

3. Install a recent dev-root-signed xpi (eg using CI artifacts from https://github.com/mozilla-extensions/firefox-translations/pull/73). Direct link: https://firefox-ci-tc.services.mozilla.com/api/queue/v1/task/IeEQ41USToy0KnZXmsKXVw/runs/0/artifacts/public%2Fbuild%2Fbergamot-browser-extension.xpi

- Download and install Firefox Nightly
- (Optionally create a new profile: <https://developer.mozilla.org/Firefox/Multiple_profiles>, or via some other method)

- Navigate to _about:config_ and set the following preferences. (If a preference does not exist, create it be right-clicking in the white area and selecting New -> String)
- Set `` to `info`. This permits shield-extension log output in browser console.
- Set `extensions.federated-learning-v2_shield_mozilla_org.test.variationName` to `model1` (or any other study variation/branch to test specifically)
- (If you are installing an unsigned version of the extension, you need to set `extensions.experiments.enabled` to `true` before installing the extension)

## Expected User Experience / Functionality

### Surveys

### Do these tests (in addition to ordinary regression tests)

**Example test case**

- Install the extension as per above
- Visit a Spanish website, for instance
- Press Translate in the translation infobar that pops up
- Wait around 10-20 seconds for the translation to finish

**Showing in `about:addons`**

- Install the extension as per above
- Verify that ...
- Verify that the study does not show up in `about:addons` (note: only signed study extensions are hidden)

**Foo**

- Set the branch preference to one of the validation branches
- Enroll a client using the Normandy staging server
- Verify that ...
- Verify that `foo` has a non-default value
- Unenroll a client using the Normandy staging server
- Verify that `foo` has been restored to use the default value
