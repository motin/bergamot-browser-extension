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

- Navigate to _about:config_ and set the following preferences. (If a preference does not exist, create it be right-clicking in the white area and selecting New -> String)
- Set `` to `info`. This permits shield-add-on log output in browser console.
- Set `extensions.federated-learning-v2_shield_mozilla_org.test.variationName` to `model1` (or any other study variation/branch to test specifically)
- (If you are installing an unsigned version of the add-on, you need to set `extensions.experiments.enabled` to `true` before installing the add-on)

## Expected User Experience / Functionality

### Surveys

### Do these tests (in addition to ordinary regression tests)
