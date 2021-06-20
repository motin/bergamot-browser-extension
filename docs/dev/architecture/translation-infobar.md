#

<pre class="mermaid">sequenceDiagram
    Native UI broker->>Native UI broker: Subscribe to extension state changes
    alt Could not detect language
        Content script->>Tab: (Do nothing)
    else Detected language is one that the user understands/accepts
        Content script->>Tab: (Do nothing)
    else Detected language can't be supported
        Content script->>Tab: (Do nothing)
    else Detected language is supported
        Content script->>Tab: Show Translation Infobar
    end
</pre>

## Relevant engineering background

Maintenance and development of this component requires experience in:

- Firefox browser-level UI development
- Firefox L10n
- Firefox UX
- Firefox Web Extension API:s (to allow the web extension to interact with the translation infobar)
