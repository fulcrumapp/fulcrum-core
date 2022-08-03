"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LocationValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(LocationValue, _FormValue);

  function LocationValue(element, attributes) {
    var _this;

    _this = _FormValue.call(this, element, attributes) || this;

    if (attributes) {
      _this._latitude = attributes.latitude;
      _this._longitude = attributes.longitude;
      _this._address = attributes.address;
    }

    return _this;
  }

  var _proto = LocationValue.prototype;

  _proto.toJSON = function toJSON() {
    var json = {};
    json.latitude = this._latitude || null;
    json.longitude = this._longitude || null;
    json.address = this._address || null;
    return json;
  };

  _createClass(LocationValue, [{
    key: "latitude",
    get: function get() {
      return this._latitude;
    },
    set: function set(lat) {
      this._latitude = lat;
    }
  }, {
    key: "longitude",
    get: function get() {
      return this._longitude;
    },
    set: function set(lng) {
      this._longitude = lng;
    }
  }, {
    key: "address",
    get: function get() {
      return this._address;
    },
    set: function set(address) {
      this._address = address;
    }
  }, {
    key: "columnValue",
    get: function get() {
      var value = {};
      value['f' + this.element.key + '_latitude'] = this._latitude;
      value['f' + this.element.key + '_longitude'] = this._longitude;
      value['f' + this.element.key + '_address'] = this._address;
      return value;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return !Object.keys(this._rawValue).length;
    }
  }]);

  return LocationValue;
}(_formValue["default"]);

exports["default"] = LocationValue;
//# sourceMappingURL=location-value.js.map