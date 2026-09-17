## ADDED Requirements

### Requirement: PhotoFields expose the FastFill settings contract

The `PhotoElement` created for a `PhotoField` MUST expose a
`getFastfillSettings()` method. For valid input, the method MUST return a
defensive object with exactly `type` and `target_fields`, where `type` is
`off`, `text_extraction`, or `generic`, and `target_fields` is an ordered
array of field-key strings. The method is the sole object-model accessor for
the settings; there MUST NOT be individual getters for `type` or
`target_fields`.

#### Scenario: Parse a valid text extraction setting

- **WHEN** a `PhotoField` is constructed with
  `fastfill_settings: { type: "text_extraction", target_fields: ["a1b2", "c3d4"] }`
- **THEN** `photoElement.getFastfillSettings()` equals an object with the same
  `type` and ordered target fields

#### Scenario: Parse each supported mode

- **WHEN** a `PhotoField` is constructed with each of `off`, `text_extraction`,
  and `generic` and a valid target-field array
- **THEN** `photoElement.getFastfillSettings().type` equals the supplied
  supported mode for each case

#### Scenario: Getter does not expose mutable API input

- **WHEN** a caller mutates the returned settings object or its
  `target_fields` array
- **THEN** the original form attributes and a subsequent read of
  `photoElement.getFastfillSettings()` remain unchanged

### Requirement: FastFill input is validated at the boundary

`getFastfillSettings()` MUST return `undefined` when settings are missing or
`null`, and MUST also return `undefined` for an invalid settings value. A
settings value is invalid when it is not a plain object, has an unsupported
`type`, lacks an array `target_fields`, or contains a non-empty-string
violation in that array. Invalid settings MUST NOT throw during form
construction. The parser MUST preserve valid string values and their order
without trimming or deduplicating them. It MUST NOT impose an
application-level cardinality limit on `target_fields`; cardinality policy is
owned by the server/admin surface.

#### Scenario: Legacy PhotoField has no settings

- **WHEN** a PhotoField payload omits `fastfill_settings`
- **THEN** form loading succeeds and `photoElement.getFastfillSettings()` is
  `undefined`

#### Scenario: Null settings are treated as absent

- **WHEN** a PhotoField payload contains `fastfill_settings: null`
- **THEN** form loading succeeds and `photoElement.getFastfillSettings()` is
  `undefined`

#### Scenario: Unsupported mode is rejected

- **WHEN** `fastfill_settings.type` is any value other than `off`,
  `text_extraction`, or `generic`
- **THEN** `photoElement.getFastfillSettings()` is `undefined` and form loading
  does not throw

#### Scenario: Invalid target-field collection is rejected

- **WHEN** `target_fields` is missing, is not an array, contains an empty
  string, or contains a non-string value
- **THEN** `photoElement.getFastfillSettings()` is `undefined` and form loading
  does not throw

#### Scenario: Target-field cardinality is not imposed by the package

- **WHEN** `target_fields` contains any server-accepted number of valid entries
- **THEN** the settings remain valid and all entries are preserved in input order

#### Scenario: Opaque field keys are preserved

- **WHEN** valid target fields contain repeated or non-UUID identifiers such as
  `"a1b2"`
- **THEN** `photoElement.getFastfillSettings()` preserves the exact strings and
  input order without deduplication or key-format rejection

### Requirement: Serialization emits only the agreed PhotoField shape

`PhotoElement.toJSON()` MUST include `fastfill_settings` for valid settings,
using the snake_case contract with only `type` and `target_fields`. It MUST
omit `fastfill_settings` when settings are absent or invalid and MUST NOT
serialize unknown properties from the input settings object.

#### Scenario: Serialize valid settings

- **WHEN** `toJSON()` is called on a PhotoElement with valid FastFill settings
- **THEN** the result contains
  `fastfill_settings: { type: <supported mode>, target_fields: <ordered array> }`

#### Scenario: Omit absent or invalid settings

- **WHEN** `toJSON()` is called on a legacy PhotoField or one with invalid
  settings
- **THEN** the result omits the `fastfill_settings` key and retains the
  existing generic PhotoField serialization

#### Scenario: Drop unsupported nested properties

- **WHEN** input settings also contain arbitrary properties such as
  `enabled`, `prompt`, or nested objects
- **THEN** serialized `fastfill_settings` contains only `type` and
  `target_fields`

### Requirement: The package ships the contract in a minor release

The implementation MUST pass the repository's build and test checks and MUST
be released as the next semver minor of `@fulcrumapp/fulcrum-core` from the
current `1.6.3` baseline (`1.7.0` unless the baseline has advanced). The
published package version and `v<version>` tag MUST match.

#### Scenario: Verification before release

- **WHEN** the implementation is validated in CI
- **THEN** `yarn test`, `yarn lint`, and `yarn build` pass before a release
  tag is created

#### Scenario: Publish a matching minor version

- **WHEN** the release pipeline processes the matching minor version tag
- **THEN** the package is published with that exact version and consumers can
  import the PhotoField FastFill behavior
