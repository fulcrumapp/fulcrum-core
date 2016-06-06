'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SignatureValue = function (_FormValue) {
  _inherits(SignatureValue, _FormValue);

  function SignatureValue(element, attributes) {
    _classCallCheck(this, SignatureValue);

    var _this = _possibleConstructorReturn(this, _FormValue.call(this, element, attributes));

    if (attributes) {
      _this._identifier = attributes.signature_id;
      _this._timestamp = _dateUtils2.default.parseISOTimestamp(attributes.timestamp);
    }
    return _this;
  }

  SignatureValue.prototype.clear = function clear() {
    this._identifier = null;
    this._timestamp = null;
  };

  SignatureValue.prototype.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return {
      signature_id: this._identifier,
      timestamp: _dateUtils2.default.formatISOTimestamp(this._timestamp)
    };
  };

  SignatureValue.prototype.isEqual = function isEqual(value) {
    return false;
  };

  SignatureValue.prototype.contains = function contains(value) {
    return false;
  };

  SignatureValue.prototype.startsWith = function startsWith(value) {
    return false;
  };

  SignatureValue.prototype.isLessThan = function isLessThan(value) {
    return false;
  };

  SignatureValue.prototype.isGreaterThan = function isGreaterThan(value) {
    return false;
  };

  _createClass(SignatureValue, [{
    key: 'id',
    get: function get() {
      return this._identifier;
    },
    set: function set(id) {
      this._identifier = id;
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this._timestamp;
    },
    set: function set(timestamp) {
      if (!(timestamp instanceof Date)) {
        throw new TypeError('timestamp must be a Date');
      }

      this._timestamp = timestamp;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this._identifier == null;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return this.isEmpty ? null : '1 Signature';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.isEmpty ? 0 : 1;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var value = {};

      value['f' + this.element.key + '_timestamp'] = this.timestamp;
      value['f' + this.element.key] = this._identifier;

      return value;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }]);

  return SignatureValue;
}(_formValue2.default);

exports.default = SignatureValue;
//# sourceMappingURL=signature-value.js.map