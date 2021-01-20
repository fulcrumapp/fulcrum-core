"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Address =
/*#__PURE__*/
function () {
  function Address(attributes) {
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

  var _proto = Address.prototype;

  _proto.toJSON = function toJSON() {
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

  _proto.clear = function clear() {
    this.streetNumber = null;
    this.streetName = null;
    this.suite = null;
    this.city = null;
    this.county = null;
    this.state = null;
    this.postalCode = null;
    this.country = null;
  };

  _proto.line = function line() {
    var result = [];

    for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
      parts[_key] = arguments[_key];
    }

    for (var _i = 0, _parts = parts; _i < _parts.length; _i++) {
      var part = _parts[_i];

      if (_textUtils["default"].isPresent(part)) {
        result.push(part);
      }
    }

    return result.join(' ');
  };

  _createClass(Address, [{
    key: "isEmpty",
    get: function get() {
      return !(_textUtils["default"].isPresent(this.streetNumber) || _textUtils["default"].isPresent(this.streetName) || _textUtils["default"].isPresent(this.suite) || _textUtils["default"].isPresent(this.city) || _textUtils["default"].isPresent(this.county) || _textUtils["default"].isPresent(this.state) || _textUtils["default"].isPresent(this.postalCode) || _textUtils["default"].isPresent(this.country));
    }
  }, {
    key: "lines",
    get: function get() {
      var result = [];
      var line1 = this.line1;
      var line2 = this.line2;
      var line3 = this.line3;

      if (_textUtils["default"].isPresent(line1)) {
        result.push(line1);
      }

      if (_textUtils["default"].isPresent(line2)) {
        result.push(line2);
      }

      if (_textUtils["default"].isPresent(line3)) {
        result.push(line3);
      }

      return result;
    }
  }, {
    key: "line1",
    get: function get() {
      return this.line(this.streetNumber, this.streetName, this.suite);
    }
  }, {
    key: "line2",
    get: function get() {
      return this.line(this.city, this.state, this.postalCode);
    }
  }, {
    key: "line3",
    get: function get() {
      return this.line(this.country);
    }
  }]);

  return Address;
}();

exports["default"] = Address;
//# sourceMappingURL=address.js.map