'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DateValue = function (_TextualValue) {
  _inherits(DateValue, _TextualValue);

  function DateValue() {
    _classCallCheck(this, DateValue);

    return _possibleConstructorReturn(this, _TextualValue.apply(this, arguments));
  }

  DateValue.prototype.isLessThan = function isLessThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    var thisDate = this.dateValue;
    var thatDate = _dateUtils2.default.parseDate(stringValue);

    if (thisDate == null || thatDate == null) {
      return false;
    }

    return thisDate.getTime() < thatDate.getTime();
  };

  DateValue.prototype.isGreaterThan = function isGreaterThan(stringValue) {
    if (this.isEmpty) {
      return _textUtils2.default.isEmpty(stringValue);
    }

    var thisDate = this.dateValue;
    var thatDate = _dateUtils2.default.parseDate(stringValue);

    if (thisDate == null || thatDate == null) {
      return false;
    }

    return thisDate.getTime() > thatDate.getTime();
  };

  DateValue.prototype.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === undefined ? false : _ref$useDisplayValue;

    if (useDisplayValue) {
      return this.displayValue;
    }

    return this.columnValue;
  };

  _createClass(DateValue, [{
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var date = this.dateValue;

      if (date == null) {
        return null;
      }

      return _dateUtils2.default.formatLocalizedDate(date);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.textValue;
    }
  }, {
    key: 'isValid',
    get: function get() {
      if (this.isEmpty) {
        return true;
      }

      return _dateUtils2.default.isValidDate(this.textValue);
    }
  }, {
    key: 'dateValue',
    get: function get() {
      return _dateUtils2.default.parseDate(this.textValue);
    }
  }, {
    key: 'columnValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      return this.dateValue;

      // The following code can be used to convert a date to a unix timestamp integer
      //
      // const timestamp = this.textValue + 'T00:00:00Z';
      // const date = DateUtils.parseISOTimestamp(timestamp);
      // return date ? date.getTime() / 1000 : null;
    }
  }]);

  return DateValue;
}(_textualValue2.default);

exports.default = DateValue;
//# sourceMappingURL=date-value.js.map