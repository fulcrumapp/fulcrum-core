function notImplemented(): never {
  throw new Error('Not implemented');
}

export default class Feature {
  get id(): string | null {
    return notImplemented();
  }

  get createdAt(): Date | null {
    return notImplemented();
  }

  get updatedAt(): Date | null {
    return notImplemented();
  }

  get formValues(): any {
    return notImplemented();
  }

  get hasCoordinate(): boolean {
    return notImplemented();
  }

  get isGeometryEnabled(): boolean {
    return notImplemented();
  }

  get displayValue(): string {
    return notImplemented();
  }

  get searchableValue(): string {
    return notImplemented();
  }

  toJSON(options?: any): any {
    return notImplemented();
  }

  updateTimestamps(): void {
    notImplemented();
  }

  get createdDuration(): number | null {
    return notImplemented();
  }

  get updatedDuration(): number | null {
    return notImplemented();
  }

  get editedDuration(): number | null {
    return notImplemented();
  }

  get hasCreatedCoordinate(): boolean {
    return notImplemented();
  }

  get hasUpdatedCoordinate(): boolean {
    return notImplemented();
  }
}
