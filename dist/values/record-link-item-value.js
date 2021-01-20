"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RecordLinkItemValue = /*#__PURE__*/function () {
  function RecordLinkItemValue(parent, attributes) {
    this._parent = parent;
    this._recordID = attributes.record_id;
  }

  var _proto = RecordLinkItemValue.prototype;

  _proto.toJSON = function toJSON() {
    return {
      record_id: this._recordID
    };
  };

  _proto.load = function load(dataSource, callback) {
    var _this = this;

    (0, _assert["default"])(this.parent.element.form, 'form must be present before loading the record');
    dataSource.getRecord(this._recordID, this.parent.element.form, function (err, record) {
      if (err) {
        return callback(err);
      }

      _this._record = record;
      return callback();
    });
  };

  _createClass(RecordLinkItemValue, [{
    key: "parent",
    get: function get() {
      return this._parent;
    }
  }, {
    key: "id",
    get: function get() {
      return this._recordID;
    }
  }, {
    key: "displayValue",
    get: function get() {
      if (this._record) {
        return this._record.displayValue;
      }

      return null;
    }
  }, {
    key: "record",
    get: function get() {
      return this._record;
    },
    set: function set(record) {
      this._recordID = record;
      this._record = record;
    }
  }]);

  return RecordLinkItemValue;
}();

exports["default"] = RecordLinkItemValue;
//# sourceMappingURL=record-link-item-value.js.map