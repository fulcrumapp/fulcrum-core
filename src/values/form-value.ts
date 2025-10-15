import FormValueFactory from './form-value-factory';

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

  toSimpleJSON() {
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

  static create(element: any, attributes: any) {
    return FormValueFactory.create(element, attributes);
  }
}
