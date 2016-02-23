"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class RecordLinkItemValue {
  constructor(attributes) {
    this._recordID = attributes.record_id;
  }

  toJSON() {
    return {
      record_id: this._recordID
    };
  }
}
exports.default = RecordLinkItemValue;
//# sourceMappingURL=record-link-item-value.js.map