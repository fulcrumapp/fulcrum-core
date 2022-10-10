"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _textualValue = _interopRequireDefault(require("./textual-value"));
var _dateUtils = _interopRequireDefault(require("../utils/date-utils"));
var _textUtils = _interopRequireDefault(require("../utils/text-utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TimeValue = /*#__PURE__*/function (_TextualValue) {
  _inheritsLoose(TimeValue, _TextualValue);
  function TimeValue() {
    return _TextualValue.apply(this, arguments) || this;
  }
  var _proto = TimeValue.prototype;
  _proto.isLessThan = function isLessThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils["default"].isEmpty(stringValue);
    }
    var thisTime = this.timeValue;
    var thatTime = _dateUtils["default"].parseTime(stringValue);
    if (thisTime == null || thatTime == null) {
      return false;
    }
    return thisTime < thatTime;
  };
  _proto.isGreaterThan = function isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils["default"].isEmpty(stringValue);
    }
    var thisTime = this.timeValue;
    var thatTime = _dateUtils["default"].parseTime(stringValue);
    if (thisTime == null || thatTime == null) {
      return false;
    }
    return thisTime > thatTime;
  };
  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
      useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;
    if (useDisplayValue) {
      return this.displayValue;
    }
    return this.columnValue;
  };
  _createClass(TimeValue, [{
    key: "displayValue",
    get: function get() {
      return this.textValue;
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.textValue;
    }
  }, {
    key: "isValid",
    get: function get() {
      if (this.isEmpty) {
        return true;
      }
      return _dateUtils["default"].isValidTime(this.textValue);
    }
  }, {
    key: "timeValue",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }
      return _dateUtils["default"].parseTime(this.textValue);
    }
  }, {
    key: "columnValue",
    get: function get() {
      if (!this.isValid) {
        return null;
      }
      return this.textValue || null;
    }
  }]);
  return TimeValue;
}(_textualValue["default"]);
exports["default"] = TimeValue;
//# sourceMappingURL=time-value.js.map