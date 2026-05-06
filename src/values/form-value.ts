// Required for the lazy require() in FormValue.create — see comment there.
// Using declare avoids adding @types/node as a dependency for a library package.
declare const require: (id: string) => any;

function notImplemented(): never {
  throw new Error('Not implemented');
}

export default class FormValue {
  element: any;

  protected _rawValue: any;

  constructor(element: any, value: any) {
    this.element = element;
    this._rawValue = value;
  }

  get isEmpty(): boolean {
    return notImplemented();
  }

  get displayValue(): string | null {
    return notImplemented();
  }

  get searchableValue(): string | null {
    return notImplemented();
  }

  get length(): number {
    return notImplemented();
  }

  get columnValue(): any {
    return notImplemented();
  }

  get multipleValues(): any[] | null {
    return notImplemented();
  }

  format(options?: any): any {
    return notImplemented();
  }

  toJSON(): any {
    return notImplemented();
  }

  toSimpleJSON(): any {
    return this.toJSON();
  }

  isEqual(value: any): boolean {
    return notImplemented();
  }

  contains(value: any): boolean {
    return notImplemented();
  }

  startsWith(value: any): boolean {
    return notImplemented();
  }

  isLessThan(value: any): boolean {
    return notImplemented();
  }

  isGreaterThan(value: any): boolean {
    return notImplemented();
  }

  static create(element: any, attributes: any): FormValue {
    // Lazy require to break the FormValue → FormValueFactory → subclasses → FormValue cycle.
    // A top-level import is evaluated eagerly; Rollup cannot safely linearize the cycle in
    // production builds, causing "Class extends value undefined" at runtime. The original
    // form-value.js used this same pattern intentionally.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('./form-value-factory').default.create(element, attributes);
  }
}
