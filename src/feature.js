const notImplemented = () => {
  throw new Error('Not implemented');
};

export default class Feature {
  get id() {
    notImplemented();
  }

  get createdAt() {
    notImplemented();
  }

  get updatedAt() {
    notImplemented();
  }

  get formValues() {
    notImplemented();
  }

  get hasCoordinate() {
    notImplemented();
  }

  get isGeometryEnabled() {
    notImplemented();
  }

  get displayValue() {
    notImplemented();
  }

  get searchableValue() {
    notImplemented();
  }

  toJSON() {
    notImplemented();
  }

  updateTimetamps() {
    notImplemented();
  }

  get createdDuration() {
    notImplemented();
  }

  get updatedDuration() {
    notImplemented();
  }

  get editedDuration() {
    notImplemented();
  }

  get hasCreatedCoordinate() {
    notImplemented();
  }

  get hasUpdatedCoordinate() {
    notImplemented();
  }
}
