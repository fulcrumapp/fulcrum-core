'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address(attributes) {
    _classCallCheck(this, Address);

    if (attributes) {
      this.streetNumber = attributes.sub_thoroughfare;
      this.streetName = attributes.thoroughfare;
      this.suite = attributes.suite;
      this.city = attributes.locality;
      this.county = attributes.sub_admin_area;
      this.state = attributes.admin_area;
      this.postalCode = attributes.postal_code;
      this.country = attributes.country;
    }
  }

  Address.prototype.toJSON = function toJSON() {
    var json = {};

    json.sub_thoroughfare = this.streetNumber || null;
    json.thoroughfare = this.streetName || null;
    json.suite = this.suite || null;
    json.locality = this.city || null;
    json.sub_admin_area = this.county || null;
    json.admin_area = this.state || null;
    json.postal_code = this.postalCode || null;
    json.country = this.country || null;

    return json;
  };

  Address.prototype.clear = function clear() {
    this.streetNumber = null;
    this.streetName = null;
    this.suite = null;
    this.city = null;
    this.county = null;
    this.state = null;
    this.postalCode = null;
    this.country = null;
  };

  Address.prototype.isEmpty = function isEmpty() {
    return !(_textUtils2.default.isPresent(this.streetNumber) || _textUtils2.default.isPresent(this.streetName) || _textUtils2.default.isPresent(this.suite) || _textUtils2.default.isPresent(this.city) || _textUtils2.default.isPresent(this.county) || _textUtils2.default.isPresent(this.state) || _textUtils2.default.isPresent(this.postalCode) || _textUtils2.default.isPresent(this.country));
  };

  Address.prototype.line = function line() {
    var result = [];

    for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
      parts[_key] = arguments[_key];
    }

    for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var part = _ref;

      if (_textUtils2.default.isPresent(part)) {
        result.push(part);
      }
    }

    return result.join(' ');
  };

  _createClass(Address, [{
    key: 'lines',
    get: function get() {
      var result = [];

      var line1 = this.line1;
      var line2 = this.line2;
      var line3 = this.line3;

      if (_textUtils2.default.isPresent(line1)) {
        result.push(line1);
      }

      if (_textUtils2.default.isPresent(line2)) {
        result.push(line2);
      }

      if (_textUtils2.default.isPresent(line3)) {
        result.push(line3);
      }

      return result;
    }
  }, {
    key: 'line1',
    get: function get() {
      return this.line(this.streetNumber, this.streetName, this.suite);
    }
  }, {
    key: 'line2',
    get: function get() {
      return this.line(this.city, this.state, this.postalCode);
    }
  }, {
    key: 'line3',
    get: function get() {
      return this.line(this.country);
    }
  }]);

  return Address;
}();

exports.default = Address;
//# sourceMappingURL=address.js.map