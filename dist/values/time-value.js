'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeValue = function (_TextualValue) {
  _inherits(TimeValue, _TextualValue);

  function TimeValue() {
    _classCallCheck(this, TimeValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeValue).apply(this, arguments));
  }

  _createClass(TimeValue, [{
    key: 'isLessThan',
    value: function isLessThan(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      var thisTime = this.timeValue();
      var thatTime = _dateUtils2.default.parseTime(stringValue);

      if (thisTime == null || thatTime == null) {
        return false;
      }

      return thisTime.getTime() < thatTime.getTime();
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      var thisTime = this.timeValue();
      var thatTime = _dateUtils2.default.parseTime(stringValue);

      if (thisTime == null || thatTime == null) {
        return false;
      }

      return thisTime.getTime() > thatTime.getTime();
    }
  }, {
    key: 'timeValue',
    value: function timeValue() {
      return _dateUtils2.default.parseTime(this.textValue);
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var time = this.timeValue();

      if (time == null) {
        return null;
      }

      return time;
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.textValue;
    }
  }]);

  return TimeValue;
}(_textualValue2.default);

exports.default = TimeValue;
//# sourceMappingURL=time-value.js.map