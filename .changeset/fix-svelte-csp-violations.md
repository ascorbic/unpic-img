---
"@unpic/svelte": patch
---

Fix CSP violations by filtering undefined event handlers in Svelte 5. When event handler properties like `onload` and `onerror` are present but undefined in spread props, Svelte 5 adds internal event bindings that trigger CSP violations. The fix filters out only undefined event handlers while preserving explicitly passed handlers.
