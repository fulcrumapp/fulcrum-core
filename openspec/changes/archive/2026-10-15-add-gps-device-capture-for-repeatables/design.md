# Design

## Context

See `proposal.md` for motivation and `specs/repeatable-item-gps-device-capture/spec.md` for the behavior contract. `Record` already exposes `gpsDeviceCapture`, normalizes absent or invalid values to `{}`, and includes the value as `gps_device_capture` in JSON. `RepeatableItemValue` has its own API-attribute loading and serialization paths.

## Goals / Non-Goals

**Goals:**
- Keep the repeatable-item JavaScript property and wire representation consistent with records.
- Preserve existing repeatable-item fields and serialization behavior apart from the additive capture property.

**Non-Goals:**
- Change record-level GPS capture behavior.
- Update consumer repositories; those updates are tracked by the ticket's subtasks.
- Change the GPS capture payload schema.

## Decisions

- Mirror the record-level accessor normalization on `RepeatableItemValue`. Load `gps_device_capture` from API attributes through the setter so missing, null, and non-object values resolve to `{}` consistently.
- Serialize the public value as `gps_device_capture` for every repeatable item, including the default empty object. This matches the record wire format and makes the property round-trip through existing repeatable serialization.
- Add `gpsDeviceCapture` to the shared `Feature` contract as a declaration only, matching the contract's existing unimplemented accessors. Keep the value storage and behavior on the concrete record and repeatable-item classes.
- Add focused coverage alongside the existing record GPS capture tests for repeatable-item API loading, normalization, property access, and JSON serialization. A shared helper or a new dependency is unnecessary for this single parallel implementation.

## Risks / Trade-offs

- [The serialized repeatable-item JSON gains a `gps_device_capture` field] → This additive field is required for the new capability and follows the existing record-level contract; tests will verify existing item fields remain intact.

## Migration Plan

- Build and publish a new `fulcrum-core` package version through the repository's normal release process.
- Consumer repository updates are tracked by FLCRM-22251's subtasks and are not part of this repository change.
- No data migration is required. If the release needs to be rolled back, consumers can pin the preceding package version.
