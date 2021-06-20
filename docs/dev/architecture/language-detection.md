<pre class="mermaid">sequenceDiagram
    Content script->>Content script: Extract a 60k sample of text from the DOM
    Content script->>Background script: Send web page sample to the background script
    Background script->>Language Detector: Load language detector and detect language
    Language Detector->>Background script: Language detection results
    Background script->>Content script: Language detection results
    Content script->>Content script: Store language detection results in extension state
    Content script->>Background script: Extension state automatically syncs
    Content script->>Content script: Determine translation status and store in extension state
    Content script->>Background script: Extension state automatically syncs
</pre>

## Relevant engineering background

Maintenance and development of this component requires experience in:

- ...
