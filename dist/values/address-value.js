"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _address = _interopRequireDefault(require("./address"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AddressValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(AddressValue, _FormValue);

  function AddressValue(element, attributes) {
    var _this;

    _this = _FormValue.call(this, element) || this;
    _this.address = new _address["default"](attributes);
    return _this;
  }

  var _proto = AddressValue.prototype;

  _proto.format = function format(_ref) {
    var _ref$part = _ref.part,
        part = _ref$part === void 0 ? null : _ref$part;

    if (this.isEmpty) {
      return null;
    }

    if (part) {
      return this.address.toJSON()[part];
    }

    return this.searchableValue;
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return this.address.toJSON();
  };

  _proto.isEqual = function isEqual(stringValue) {
    return false;
  };

  _proto.contains = function contains(stringValue) {
    return false;
  };

  _proto.startsWith = function startsWith(stringValue) {
    return false;
  };

  _proto.isLessThan = function isLessThan(stringValue) {
    return false;
  };

  _proto.isGreaterThan = function isGreaterThan(stringValue) {
    return false;
  };

  _createClass(AddressValue, [{
    key: "isEmpty",
    get: function get() {
      return this.address.isEmpty;
    }
  }, {
    key: "displayValue",
    get: function get() {
      return this.address.lines.join('\n');
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.address.lines.join(' ');
    }
  }, {
    key: "length",
    get: function get() {
      return this.displayValue.length;
    }
  }, {
    key: "columnValue",
    get: function get() {
      var value = {};
      var address = this.address.toJSON();

      for (var _i = 0, _Object$keys = Object.keys(address); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        value['f' + this.element.key + '_' + key] = address[key];
      }

      value['f' + this.element.key] = this.searchableValue;
      return value;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      return null; // TODO(zhm) implement
      // throw new Error('Not implemented');
    }
  }]);

  return AddressValue;
}(_formValue["default"]);

exports["default"] = AddressValue;
//# sourceMappingURL=address-value.js.map