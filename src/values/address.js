import TextUtils from '../utils/text-utils';

export default class Address {
  constructor(attributes) {
    this.streetNumber = attributes.sub_thoroughfare;
    this.streetName = attributes.thoroughfare;
    this.suite = attributes.suite;
    this.city = attributes.locality;
    this.county = attributes.sub_admin_area;
    this.state = attributes.admin_area;
    this.postalCode = attributes.postal_code;
    this.country = attributes.country;
  }

  toJSON() {
    const json = {};

    json.sub_thoroughfare = this.streetNumber || null;
    json.thoroughfare = this.streetName || null;
    json.suite = this.suite || null;
    json.locality = this.city || null;
    json.sub_admin_area = this.county || null;
    json.admin_area = this.state || null;
    json.postal_code = this.postalCode || null;
    json.country = this.country || null;

    return json;
  }

  clear() {
    this.streetNumber = null;
    this.streetName = null;
    this.suite = null;
    this.city = null;
    this.county = null;
    this.state = null;
    this.postalCode = null;
    this.country = null;
  }

  isEmpty() {
    return !(TextUtils.isPresent(this.streetNumber) ||
             TextUtils.isPresent(this.streetName) ||
             TextUtils.isPresent(this.suite) ||
             TextUtils.isPresent(this.city) ||
             TextUtils.isPresent(this.county) ||
             TextUtils.isPresent(this.state) ||
             TextUtils.isPresent(this.postalCode) ||
             TextUtils.isPresent(this.country));
  }

  lines() {
    const result = [];

    const line1 = this.line1();
    const line2 = this.line2();
    const line3 = this.line3();

    if (TextUtils.isPresent(line1)) {
      result.push(line1);
    }

    if (TextUtils.isPresent(line2)) {
      result.push(line2);
    }

    if (TextUtils.isPresent(line3)) {
      result.push(line3);
    }

    return result;
  }

  line1() {
    return this.line(this.streetNumber, this.streetName, this.suite);
  }

  line2() {
    return this.line(this.city, this.state, this.postalCode);
  }

  line3() {
    return this.line(this.country);
  }

  line(...parts) {
    const result = [];

    for (let part of parts) {
      if (TextUtils.isPresent(part)) {
        result.push(part);
      }
    }

    return result.join(' ');
  }
}
