import FormValue from './form-value';
import Address from './address';

export default class AddressValue extends FormValue {
  constructor(element, attributes) {
    super(element);

    this.address = new Address(attributes);
  }

  get isEmpty() {
    return this.address.isEmpty;
  }

  get displayValue() {
    return this.address.lines.join('\n');
  }

  get searchableValue() {
    return this.address.lines.join(' ');
  }

  get length() {
    return this.displayValue.length;
  }

  get columnValue() {
    const value = {};

    const address = this.address.toJSON();

    for (const key of Object.keys(address)) {
      value['f' + this.element.key + '_' + key] = address[key];
    }

    value['f' + this.element.key] = this.searchableValue;

    return value;
  }

  get multipleValues() {
    return null;
    // TODO(zhm) implement
    // throw new Error('Not implemented');
  }

  format({part = null}) {
    if (this.isEmpty) {
      return null;
    }

    if (part) {
      return this.address.toJSON()[part];
    }

    return this.address.searchableValue;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return this.address.toJSON();
  }

  isEqual(stringValue) {
    return false;
  }

  contains(stringValue) {
    return false;
  }

  startsWith(stringValue) {
    return false;
  }

  isLessThan(stringValue) {
    return false;
  }

  isGreaterThan(stringValue) {
    return false;
  }
}
