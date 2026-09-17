## 1. FastFill model boundary

- [ ] 1.1 Add PhotoElement parsing for `fastfill_settings`, including supported-mode validation, non-empty string target-field validation, `undefined` for missing/invalid settings, and defensive copies without imposing a cardinality limit.
- [ ] 1.2 Add the single `getFastfillSettings()` method and canonical `PhotoElement.toJSON()` output without changing generic media-element behavior or unrelated serialized attributes.

## 2. Tests

- [ ] 2.1 Add PhotoElement unit coverage for all three supported modes, missing/null input, unsupported modes, malformed target arrays, large valid target arrays, opaque keys, order preservation, and defensive-copy behavior.
- [ ] 2.2 Run `yarn test`, `yarn lint`, and `yarn build`; resolve regressions without broadening the change.

## 3. CI release verification

- [ ] 3.1 Confirm the CI release workflow produces the next minor version (`1.7.0` from the current `1.6.3` baseline, or the next minor if main has advanced); do not build `dist`, edit `package.json`, or create a tag manually.
- [ ] 3.2 After CI completes, verify the published package version exactly matches the CI-created `v<version>` tag and exposes the FastFill contract after installation.

## Parallelization

Tasks 1.1 and 1.2 are sequential because element serialization depends on the
validated model. Task 2.1 is the focused test work, followed by the CI release
gate. All tasks are scoped to this single implementation PR.
