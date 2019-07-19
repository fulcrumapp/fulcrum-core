"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _recordLinkCondition = _interopRequireDefault(require("./record-link-condition"));

var _recordLinkDefault = _interopRequireDefault(require("./record-link-default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RecordLinkElement =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(RecordLinkElement, _Element);

  function RecordLinkElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this._formID = attributes.form_id;
    _this.allowMultiple = !!attributes.allow_multiple_records;
    _this.allowExisting = !!attributes.allow_existing_records;
    _this.allowCreating = !!attributes.allow_creating_records;
    _this.allowUpdating = !!attributes.allow_updating_records; // TODO(zhm) model these

    _this.recordConditionsType = attributes.record_conditions_type;
    _this.recordConditions = [];

    if (attributes.record_conditions) {
      for (var _iterator = attributes.record_conditions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var condition = _ref;

        _this.recordConditions.push(new _recordLinkCondition["default"](condition));
      }
    }

    _this.recordDefaults = [];

    if (attributes.record_defaults) {
      for (var _iterator2 = attributes.record_defaults, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var def = _ref2;

        _this.recordDefaults.push(new _recordLinkDefault["default"](def));
      }
    }

    return _this;
  }

  var _proto = RecordLinkElement.prototype;

  _proto.load = function load(dataSource, callback) {
    var _this2 = this;

    dataSource.getForm(this._formID, function (err, form) {
      if (err) {
        callback(err);
        return;
      } // recursively load the linked forms


      _this2.form = form;

      _this2.form.load(dataSource, callback);
    });
  };

  return RecordLinkElement;
}(_element["default"]);

exports["default"] = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map