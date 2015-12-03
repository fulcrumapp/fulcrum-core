export default class RecordLinkItemValue {
  constructor(attributes) {
    this._recordID = attributes.record_id;
  }

  toJSON() {
    return {
      record_id: this._recordID
    };
  }
}
