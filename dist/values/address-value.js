'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _address = require('./address');

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressValue = (function (_FormValue) {
  _inherits(AddressValue, _FormValue);

  function AddressValue(element, attributes) {
    _classCallCheck(this, AddressValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddressValue).call(this, element));

    _this.address = new _address2.default(attributes);
    return _this;
  }

  _createClass(AddressValue, [{
    key: 'toJSON',
    value: function toJSON() {
      return this.address.toJSON();
    }
  }, {
    key: 'isEqual',
    value: function isEqual(stringValue) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(stringValue) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(stringValue) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(stringValue) {
      return false;
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(stringValue) {
      return false;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this.address.isEmpty();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return this.address.lines.join('\n');
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.address.lines.join(' ');
    }
  }, {
    key: 'length',
    get: function get() {
      return this.displayValue.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      throw new Error('Not implemented');
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      throw new Error('Not implemented');
    }
  }]);

  return AddressValue;
})(_formValue2.default);

exports.default = AddressValue;
//# sourceMappingURL=address-value.js.map