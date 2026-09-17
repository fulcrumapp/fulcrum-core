## 1. FastFill model boundary

- [x] 1.1 Add PhotoElement parsing for `fastfill_settings`, including supported-mode validation, non-empty string target-field validation, `undefined` for missing/invalid settings, and defensive copies without imposing a cardinality limit.
- [x] 1.2 Add the single `getFastfillSettings()` method and canonical `PhotoElement.toJSON()` output without changing generic media-element behavior or unrelated serialized attributes.

## 2. Form serialization

- [x] 2.1 Update the focused `Form.toJSON()` element-copy path so valid PhotoField settings are retained canonically at top level and inside repeatables, while invalid settings and unknown nested properties are omitted and all other element attributes remain unchanged.

## 3. Tests

- [x] 3.1 Add PhotoElement unit coverage for all three supported modes, missing/null input, unsupported modes, malformed target arrays, large valid target arrays, opaque keys, order preservation, and defensive-copy behavior.
- [x] 3.2 Add form round-trip coverage for top-level and nested PhotoFields, invalid-setting omission, legacy PhotoFields, and preservation of unrelated metadata.
- [x] 3.3 Run `yarn test`, `yarn lint`, and `yarn build`; resolve regressions without broadening the change.

## 4. CI release verification

- [ ] 4.1 Confirm the CI release workflow produces the next minor version (`1.7.0` from the current `1.6.3` baseline, or the next minor if main has advanced); do not build `dist`, edit `package.json`, or create a tag manually.
- [ ] 4.2 After CI completes, verify the published package version exactly matches the CI-created `v<version>` tag and exposes the FastFill contract after installation.

## Parallelization

Tasks 1.1 and 1.2 are sequential because serialization depends on the validated model. After 1.2, task 2.1 and the independent unit-test work in 3.1 can proceed in parallel; 3.2 depends on 2.1. Task 3.3 runs after implementation and tests, and task 4 is release-gate work after all validation passes. All tasks are scoped to this single implementation PR.
