# Tasks

## 1. Repeatable Item GPS Capture

- [ ] 1.1 Add `gpsDeviceCapture` accessors and API-attribute defaulting to `RepeatableItemValue`, serialize the value as `gps_device_capture`, and declare the shared property on `Feature`; verify `yarn build` succeeds.
- [ ] 1.2 Add repeatable-item tests for loading capture metadata, defaulting missing/null/invalid values, property access, and JSON serialization; verify `yarn test` passes.

## Workflow follow-up

- Publish a new `fulcrum-core` package version through the repository's normal release process.
- Complete the consumer-repository updates tracked by FLCRM-22252, FLCRM-22253, FLCRM-22254, FLCRM-22255, and FLCRM-22256.
- Archive the OpenSpec change after implementation and review are complete.
