## Context

`PhotoField` is created by `src/elements/element-factory.js` as a
`PhotoElement`, which currently inherits the common field behavior from
`src/elements/media-element.js` and `src/elements/element.js`. The base
`Element` class parses API attributes and provides the usual `toJSON()` path,
but `PhotoElement` has no field-specific state. `Form` stores the API's
`elements` array in `_elementsJSON` and currently deep-copies that array in
`src/form.js#toJSON`; this is why a new property must be handled without
rewriting serialization for every element type.

The input is form metadata, not record data. It is read at form construction
time, is potentially supplied by an untrusted API response, and can occur in
forms with nested repeatables. The change must remain lazy and must not add a
dependency or a database/API call.

## Goals / Non-Goals

**Goals:**

- Make valid `PhotoField.fastfill_settings` available through a single
  `getFastfillSettings()` method returning a defensive object.
- Emit the agreed snake_case contract from element and form serialization.
- Tolerate absent and malformed server metadata without breaking form loading.
- Keep the change local to PhotoFields, preserve unrelated raw element fields,
  and publish the next semver minor.

**Non-Goals:**

- Implementing OCR, generic FastFill behavior, or any client-side execution.
- Selecting or validating the target fields against business rules beyond
  their syntactic representation as field keys.
- Adding FastFill settings to video, attachment, or other media fields.
- Adding setters, mutation APIs, migrations, persistence, or a new endpoint.
- Changing record/media value serialization.

## Decisions

### 1. Parse at the `PhotoElement` boundary

`src/elements/photo-element.js` will own parsing, validation,
`getFastfillSettings()`, and the field-specific `toJSON()` extension. The
method returns the complete settings object; there are no individual getters
for `type` or `target_fields`.
`element-factory.js` already routes `PhotoField` to this class, so no new
factory or public export is needed. This follows the existing
`TextElement`/`YesNoElement` pattern and avoids putting PhotoField rules in
the generic `Element` or `MediaElement` classes.

The parser will:

- Return `undefined` when `fastfill_settings` is missing or `null`.
- Accept only a plain object with `type` equal to `off`,
  `text_extraction`, or `generic`.
- Require `target_fields` to be an array of non-empty strings. Strings are
  preserved exactly and in input order; no trimming, sorting, or deduplication
  is performed because field keys are opaque identifiers.
- Return a fresh object and array so callers cannot mutate the original API
  payload through `getFastfillSettings()`.

The parser will not enforce a particular key alphabet or require that a key
currently exists in the same form. Those are server/schema concerns and
enforcing them here would make round-tripping forward-compatible form
metadata brittle.

### 2. Serialize only the canonical supported shape

`PhotoElement.toJSON()` will call `super.toJSON()` and add
`fastfill_settings` only when validated settings are present. The emitted
object contains exactly `type` and `target_fields`; unknown input properties
are not copied. A missing, null, or invalid setting is omitted, preserving the
serializer's existing behavior for PhotoFields that predate FastFill.

`Form.toJSON()` must retain valid FastFill settings in its `elements` output
and must not reintroduce invalid/unknown keys. Because it currently
deep-copies `_elementsJSON`, the implementation should make a focused
recursive copy that replaces only each `PhotoField`'s `fastfill_settings`
with the corresponding parsed/canonical value, while leaving every other
element attribute byte-for-byte equivalent. This handles nested repeatables
without switching all form serialization to `Element.toJSON()`.

### 3. Be tolerant on input and strict at the output boundary

Form parsing SHALL not throw solely because a server payload contains an
invalid FastFill object. `getFastfillSettings()` returns `undefined` and
invalid data is omitted from canonical output. Valid data is emitted with the
same semantic values, not silently coerced. This is consistent with the
library's tolerant form loading behavior and prevents malformed metadata from
taking down consumers.

### 4. Test through the existing JavaScript test harness

Add focused tests under `test/elements/photo-element.js` using the existing
Mocha/Chai setup and direct `Form` construction for form round-trips. Cover
valid modes, defensive copies, all invalid boundary classes, nested
repeatables, omission for legacy PhotoFields, and preservation of unrelated
attributes. Run `yarn test`, `yarn lint`, and `yarn build`; the latter also
verifies generated declarations remain consumable.

### 5. Release through existing automation

The repository documents that versions are updated by CI, and
`.github/workflows/publish-npmjs.yml` publishes a matching version tag after
building. The implementation PR must therefore not manually edit
`package.json`. Release verification will require the next minor from the
current `1.6.3` baseline (`1.7.0`, unless main has advanced), a matching
`v<version>` tag, a successful build, and publication to both configured
registries according to the existing pipeline.

## Risks / Trade-offs

- **[Risk] A server adds a new FastFill mode before this package is updated.**
  → The setting is treated as absent rather than guessed or executed; the
  next package version can add the mode explicitly.
- **[Risk] A malformed settings object is silently lost on round-trip.**
  → Add explicit invalid-input tests and document that
  `getFastfillSettings()` returns `undefined`; valid contract data is never
  coerced. Cardinality policy remains owned by the server/admin surface rather
  than this package.
- **[Risk] Form serialization traverses a large nested schema.** → Keep the
  existing raw-copy strategy, perform one bounded recursive metadata pass,
  and do not resolve data sources or iterate record values.
- **[Risk] The release pipeline publishes a different next version because
  main advances.** → Resolve the version immediately before release and use
  the exact package/tag match enforced by the workflow.

## Migration Plan

No data migration is required. Existing forms without the setting continue
to load and serialize without a new FastFill key. New clients can read
`getFastfillSettings()`; older clients ignore the additional form metadata. To
roll back, ship the previous package version; no persisted data or schema
change needs reversal.

## Open Questions

None block implementation under this proposal: returning `undefined` for
missing or invalid settings is the object-model contract, while cardinality
limits remain owned by the server/admin surface.
