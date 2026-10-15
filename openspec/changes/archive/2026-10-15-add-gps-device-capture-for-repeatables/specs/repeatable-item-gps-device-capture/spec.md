# Spec Delta

## Purpose

Allows clients to read and preserve GPS device capture metadata for each repeatable item, independently of the record-level capture data.

## ADDED Requirements

### Requirement: Repeatable items expose GPS device capture metadata
Each repeatable item MUST expose GPS device capture metadata through `gpsDeviceCapture`. If the value is absent, null, or not an object, the exposed value MUST be an empty object.

#### Scenario: Read capture metadata from an API payload
- **WHEN** a repeatable item is created from an API payload containing `gps_device_capture`
- **THEN** `gpsDeviceCapture` returns that capture object

#### Scenario: Default missing or invalid capture metadata
- **WHEN** a repeatable item's API payload omits `gps_device_capture` or provides a null or non-object value
- **THEN** `gpsDeviceCapture` returns an empty object

#### Scenario: Serialize capture metadata
- **WHEN** a repeatable item is serialized to JSON
- **THEN** the JSON contains `gps_device_capture` with the item's capture object, including an empty object when no capture metadata is set
