# Integration as a Web Extension

This section details some integration aspects that are specific to Web Extensions

## How does the web extension get to interact with web pages?

<pre class="mermaid">sequenceDiagram
    Browser->>Tab: Open https://example.com in new Tab
    Tab->>Frames: Web page loads in one or many frames
    Browser->>Frames: Inject Firefox Translations Content script
</pre>

## Relevant engineering background

Maintenance and development of this component requires experience in:

- ...
- Translation feature packaging/integration as a web extension (overall architecture design, state management, error handling, performance profiling etc)
  Senior/Staff JavaScript/TypeScript Engineer with great experience in building professional web extensions that integrates a wide range of different types of technologies
