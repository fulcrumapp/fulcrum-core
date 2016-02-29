'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignatureValue = function (_FormValue) {
  _inherits(SignatureValue, _FormValue);

  function SignatureValue(element, attributes) {
    _classCallCheck(this, SignatureValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SignatureValue).call(this, element, attributes));

    if (attributes) {
      _this._identifier = attributes.signature_id;
      _this._timestamp = attributes.timestamp;
    }
    return _this;
  }

  _createClass(SignatureValue, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        signature_id: this._identifier,
        timestamp: this._timestamp
      };
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      return false;
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      return false;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return false;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return '1 Signature';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'length',
    get: function get() {
      return 1;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return this._identifier;
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