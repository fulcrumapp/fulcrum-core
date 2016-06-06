import FormValue from './form-value';
import DateUtils from '../utils/date-utils';

export default class SignatureValue extends FormValue {
  constructor(element, attributes) {
    super(element, attributes);

    if (attributes) {
      this._identifier = attributes.signature_id;
      this._timestamp = DateUtils.parseISOTimestamp(attributes.timestamp);
    }
  }

  get id() {
    return this._identifier;
  }

  set id(id) {
    this._identifier = id;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    if (!(timestamp instanceof Date)) {
      throw new TypeError('timestamp must be a Date');
    }

    this._timestamp = timestamp;
  }

  clear() {
    this._identifier = null;
    this._timestamp = null;
  }

  get isEmpty() {
    return this._identifier == null;
  }

  get displayValue() {
    return this.isEmpty ? null : '1 Signature';
  }

  get searchableValue() {
    return null;
  }

  get length() {
    return this.isEmpty ? 0 : 1;
  }

  get columnValue() {
    if (this.isEmpty) {
      return null;
    }

    const value = {};

    value['f' + this.element.key + '_timestamp'] = this.timestamp;
    value['f' + this.element.key] = this._identifier;

    return value;
  }

  get multipleValues() {
    return null;
  }

  toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return {
      signature_id: this._identifier,
      timestamp: DateUtils.formatISOTimestamp(this._timestamp)
    };
  }

  isEqual(value) {
    return false;
  }

  contains(value) {
    return false;
  }

  startsWith(value) {
    return false;
  }

  isLessThan(value) {
    return false;
  }

  isGreaterThan(value) {
    return false;
  }
}
