export default class RecordLinkItemValue {
  constructor(attributes) {
    this._recordID = attributes.record_id;
  }

  id() {
    return this._recordID;
  }

  toJSON() {
    return {
      record_id: this._recordID
    };
  }
}
