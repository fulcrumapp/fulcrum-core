# Proposal

## Why

GPS device capture is currently supported on records but not on individual repeatable items. Adding repeatable-level support lets clients preserve and exchange capture metadata for each item, using the same representation as record-level capture.

## What Changes

- Add `gpsDeviceCapture` support to repeatable items, defaulting missing values to an empty object and including the value in JSON serialization.
- Document the shared `gpsDeviceCapture` property on `Feature`.
- Publish a new `fulcrum-core` version with the support.

## Capabilities

### New Capabilities
- `repeatable-item-gps-device-capture`: Read and serialize GPS device capture metadata on repeatable items.

### Modified Capabilities

## Impact

- Affects `RepeatableItemValue` API attributes, accessors, and serialization, plus the shared `Feature` contract.
- Requires tests for defaulting, accessors, and JSON round-tripping.
- Updating consumer repositories is tracked by the ticket’s subtasks and is outside this repository change.
