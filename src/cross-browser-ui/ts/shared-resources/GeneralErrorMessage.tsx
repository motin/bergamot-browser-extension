/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import { MouseEvent } from "react";
import { browser } from "webextension-polyfill-ts";
import { Link } from "./photon-components-web/photon-components/Link";
import { config } from "../../../core/ts/config";

export class GeneralErrorMessage extends React.Component<
  {
    message?: string;
    additionalInfo?: string;
    eventId?: string;
  },
  {}
> {
  constructor(props) {
    super(props);
  }

  cancel(event: MouseEvent) {
    event.preventDefault();
    window.close();
  }

  render() {
    return (
      <>
        <div className="p-8 border-b border-gray-300">
          <div className="text-lg font-sans font-semibold leading-none mb-5">
            {this.props.message || "An error occurred"}
          </div>
          <div className="text-base">
            {this.props.additionalInfo ||
              "Don't worry. This may be a temporary glitch. Please try again."}
          </div>
          <div className="text-base mt-5">
            If this problem persists, help us fix it!{" "}
            <a
              href={config.feedbackSurveyUrl}
              rel="noreferrer noopener"
              target="_blank"
              className="text-red underline"
            >
              Send us feedback
            </a>
            .
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs">
            <Link
              className="inline text-red"
              target="_blank"
              href={browser.runtime.getURL(`get-started/get-started.html`)}
            >
              About this extension
            </Link>
          </div>
        </div>
      </>
    );
  }
}
