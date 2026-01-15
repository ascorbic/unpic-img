---
"@unpic/core": major
---

Remove default `object-fit: cover` inline style to allow CSS classes to control the property

BREAKING CHANGE: Images no longer have `object-fit: cover` applied by default. If you need this behavior, explicitly pass `objectFit="cover"` to your Image components.
