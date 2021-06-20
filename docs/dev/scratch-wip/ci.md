# How Firefox Translations CI works

Current build status: [![Build Status](https://img.shields.io/circleci/build/github/mozilla-extensions/firefox-translations/main)](https://circleci.com/gh/mozilla-extensions/firefox-translations)

The `mozilla-extensions/firefox-translations` repository uses [CircleCI] to run tests on each Pull Request,
each merge to the `main` branch and on releases.

## Which tasks we run

### Pull Request - testing

For each opened pull request we run a number of checks to ensure consistent formatting, no lint failures and that tests across all language bindings pass.
These checks are required to pass before a Pull Request is merged.
This includes by default the following tasks:

On CircleCI:

- Formatting & lints for Rust, Kotlin, Swift & Python
- Consistency checks for generated header files, license checks across dependencies and a schema check
- Builds & tests for Rust, Kotlin, Python & C#
  - The Python language bindings are build for multiple platforms and Python versions
- Documentation generation for all languages and the book, including spell check & link check
- By default no Swift/iOS tests are launched. These can be run manually. See below.

On TaskCluster:

- A full Android build & test

For all tasks you can always find the full log and generated artifacts by following the "Details" links on each task.

#### iOS tests on Pull Request

Due to the long runtime and costs iOS tests are not run by default on Pull Requests.
Admins of the `mozilla-extensions/firefox-translations` repository can run them on demand.

1. On the pull request scroll to the list of all checks running on that PR on the bottom.
2. Find the job titled "ci/circleci: iOS/hold".
3. Click "Details" to get to Circle CI.
4. Click on the "hold" task, then approve it.
5. The iOS tasks will now run.

### Merge to `main`

Current build status: [![Build Status](https://img.shields.io/circleci/build/github/mozilla-extensions/firefox-translations/main)](https://circleci.com/gh/mozilla-extensions/firefox-translations)

When pull requests are merged to the `main` branch we run the same checks as we do on pull requests.
Additionally we run the following tasks:

- Documentation deployment
- iOS build, unit & integration test

If you notice that they fail please take a look and [open a bug][newbugzilla] to investigate build failures.

## Special behavior

### Skipping CI completely

It is possible to completely skip running CI checks on a pull request.

To skip tasks on CircleCI include the following literal string in the commit message.

This should only be used for metadata files, such as those in `.github`, `LICENSE` or `CODE_OF_CONDUCT.md`.

[circleci]: https://circleci.com
[taskcluster]: https://taskcluster.net/

[newbugzilla]: https://bugzilla.mozilla.org/enter_bug.cgi?product=Data+Platform+and+Tools&component=Firefox Translations%3A+SDK&priority=P3&status_whiteboard=%5Btelemetry%3Aglean-rs%3Am%3F%5D
[glean-releases]: https://github.com/mozilla-extensions/firefox-translations/releases
[maven]: https://maven.mozilla.org/?prefix=maven2/org/mozilla/telemetry/
