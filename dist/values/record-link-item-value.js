"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecordLinkItemValue = function () {
  function RecordLinkItemValue(attributes) {
    _classCallCheck(this, RecordLinkItemValue);

    this._recordID = attributes.record_id;
  }

  _createClass(RecordLinkItemValue, [{
    key: "id",
    value: function id() {
      return this._recordID;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        record_id: this._recordID
      };
    }
  }, {
    key: "record",
    get: function get() {
      return this._record;
    }
  }]);

  return RecordLinkItemValue;
}();

exports.default = RecordLinkItemValue;
//# sourceMappingURL=record-link-item-value.js.map