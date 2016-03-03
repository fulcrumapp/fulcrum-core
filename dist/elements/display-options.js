'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DisplayOptions = function () {
  function DisplayOptions(attributes) {
    _classCallCheck(this, DisplayOptions);

    this.style = attributes.style;
    this.currency = attributes.currency;
  }

  DisplayOptions.prototype.format = function format(value) {
    if (!_textUtils2.default.isPresent(value)) {
      return value;
    }

    switch (true) {
      case this.isNumber:
        {
          return _numberUtils2.default.localizedStringFromMachineString(value, true);
        }

      case this.isDate:
        {
          var date = _dateUtils2.default.parseDate(value);

          if (date != null) {
            return _dateUtils2.default.formatLocalizedDate(date);
          }

          break;
        }

      case this.isCurrency:
        {
          return _numberUtils2.default.formatCurrency(value, this.currency);
        }

      default:
        break;
    }

    return value;
  };

  _createClass(DisplayOptions, [{
    key: 'isCurrency',
    get: function get() {
      return this.style === 'currency';
    }
  }, {
    key: 'isNumber',
    get: function get() {
      return this.style === 'number';
    }
  }, {
    key: 'isDate',
    get: function get() {
      return this.style === 'date';
    }
  }, {
    key: 'isText',
    get: function get() {
      return this.style === 'text';
    }
  }]);

  return DisplayOptions;
}();

exports.default = DisplayOptions;
//# sourceMappingURL=display-options.js.map