import assert from 'assert';

export default class RecordLinkItemValue {
  constructor(parent, attributes) {
    this._parent = parent;
    this._recordID = attributes.record_id;
  }

  get parent() {
    return this._parent;
  }

  get id() {
    return this._recordID;
  }

  toJSON() {
    return {
      record_id: this._recordID
    };
  }

  get displayValue() {
    if (this._record) {
      return this._record.displayValue;
    }

    return null;
  }

  get record() {
    return this._record;
  }

  set record(record) {
    this._recordID = record;
    this._record = record;
  }

  load(dataSource, callback) {
    assert(this.parent.element.form, 'form must be present before loading the record');

    dataSource.getRecord(this._recordID, this.parent.element.form, (err, record) => {
      if (err) {
        return callback(err);
      }

      this._record = record;

      return callback();
    });
  }
}
