## Why

Jira **FLCRM-22237** (under FLCRM-21918) adds the agreed FastFill schema to
`PhotoField`. Today `PhotoElement` only exposes the generic media-field
attributes, so consumers of `fulcrum-core` cannot read FastFill configuration
through the object model or rely on the element serializer to emit the
contract. The change is needed before clients can consume the server-provided
settings without inspecting private/raw form payloads.

## What Changes

- Add a `getFastfillSettings()` method to `PhotoElement` for the
  `fastfill_settings` API object.
- Define the supported contract as:
  - `type`: the API-provided FastFill mode string; current modes include
    `off`, `text_extraction`, and `generic`.
  - `target_fields`: an array of field keys.
- Define boundary validation for malformed and unsupported settings without
  changing unrelated media-field behavior or imposing an application-level
  cardinality limit. Missing settings return `undefined`.
- Include the canonical `fastfill_settings` shape when a `PhotoElement` is
  serialized.
- Add focused tests for parsing, access, serialization, invalid input, and
  backward compatibility with PhotoFields that do not contain the setting.
- Publish the implementation as the next minor `@fulcrumapp/fulcrum-core`
  version (currently `1.7.0` from `1.6.3`) through the repository's CI release
  flow; do not hand-edit `package.json` for the release.

## Capabilities

### New Capabilities

- `photo-field-fastfill-settings`: Exposes and serializes the validated
  `PhotoField.fastfill_settings` contract returned by
  `PhotoElement.getFastfillSettings()`.

### Modified Capabilities

- None. No existing OpenSpec capabilities are present in this repository, and
  this change does not alter the requirements of another documented
  capability.

## Impact

- **Object model:** `src/elements/photo-element.js` and the existing
  `Element.toJSON()` path.
- **Form schema handling:** `src/form.js` remains unchanged; it continues to
  deep-copy raw API element JSON without field-specific knowledge.
- **Tests:** add PhotoField-focused coverage alongside the existing element
  serialization tests.
- **Release:** the npm package's semver minor release and the existing
  tag-driven publish workflow in `.github/workflows/publish-npmjs.yml`.
- **No new runtime dependency or database/API endpoint is required.**
