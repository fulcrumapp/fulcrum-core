import FormValue from './form-value';
import Address from './address';

export default class AddressValue extends FormValue {
  constructor(element, attributes) {
    super(element);

    this.address = new Address(attributes);
  }

  get isEmpty() {
    return this.address.isEmpty();
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
    return null;
    // TODO(zhm) implement
    // throw new Error('Not implemented');
  }

  get multipleValues() {
    return null;
    // TODO(zhm) implement
    // throw new Error('Not implemented');
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
