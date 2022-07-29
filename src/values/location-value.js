import FormValue from './form-value';

export default class LocationValue extends FormValue {
  constructor(element, attributes) {
    super(element, attributes);
    if (attributes) {
      this._latitude = attributes.latitude;
      this._longitude = attributes.longitude;
      this._address = attributes.address;
    }
  }

  toJSON() {
    const json = {};

    json.latitude = this._latitude || null;
    json.longitude = this._longitude || null;
    json.address = this._address || null;

    return json;
  }

  get latitude() {
    return this._latitude;
  }

  set latitude(lat) {
    this._latitude = lat;
  }

  get longitude() {
    return this._longitude;
  }

  set longitude(lng) {
    this._longitude = lng;
  }

  get address() {
    return this._address;
  }

  set address(address) {
    this._address = address;
  }

  get columnValue() {
    const value = {};

    value['f' + this.element.key + '_latitude'] = this._latitude;
    value['f' + this.element.key + '_longitude'] = this._longitude;
    value['f' + this.element.key + '_address'] = this._address;

    return value;
  }

  get isEmpty() {
    return !Object.keys(this._rawValue).length;
  }
}
