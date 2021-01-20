"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _dateUtils = _interopRequireDefault(require("../utils/date-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SignatureValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(SignatureValue, _FormValue);

  function SignatureValue(element, attributes) {
    var _this;

    _this = _FormValue.call(this, element, attributes) || this;

    if (attributes) {
      _this._identifier = attributes.signature_id;
      _this._timestamp = _dateUtils["default"].parseISOTimestamp(attributes.timestamp);
    }

    return _this;
  }

  var _proto = SignatureValue.prototype;

  _proto.clear = function clear() {
    this._identifier = null;
    this._timestamp = null;
  };

  _proto.format = function format(_ref) {
    var _ref$part = _ref.part,
        part = _ref$part === void 0 ? null : _ref$part,
        formatSignatureURL = _ref.formatSignatureURL,
        formatSignatureViewerURL = _ref.formatSignatureViewerURL,
        formatSignatureName = _ref.formatSignatureName,
        args = _objectWithoutPropertiesLoose(_ref, ["part", "formatSignatureURL", "formatSignatureViewerURL", "formatSignatureName"]);

    if (this.isEmpty) {
      return null;
    }

    if (part === 'timestamp') {
      return this.timestamp;
    } else if (part === 'view' && formatSignatureViewerURL) {
      return formatSignatureViewerURL(this, args);
    } else if (part === 'url' && formatSignatureURL) {
      return formatSignatureURL(this, args);
    } else if (part === 'name' && formatSignatureName) {
      return formatSignatureName(this, args);
    }

    return this.id;
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    return {
      signature_id: this._identifier,
      timestamp: _dateUtils["default"].formatISOTimestamp(this._timestamp)
    };
  };

  _proto.isEqual = function isEqual(value) {
    return false;
  };

  _proto.contains = function contains(value) {
    return false;
  };

  _proto.startsWith = function startsWith(value) {
    return false;
  };

  _proto.isLessThan = function isLessThan(value) {
    return false;
  };

  _proto.isGreaterThan = function isGreaterThan(value) {
    return false;
  };

  _createClass(SignatureValue, [{
    key: "id",
    get: function get() {
      return this._identifier;
    },
    set: function set(id) {
      this._identifier = id;
    }
  }, {
    key: "timestamp",
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
    key: "isEmpty",
    get: function get() {
      return this._identifier == null;
    }
  }, {
    key: "displayValue",
    get: function get() {
      return this.isEmpty ? null : '1 Signature';
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return null;
    }
  }, {
    key: "length",
    get: function get() {
      return this.isEmpty ? 0 : 1;
    }
  }, {
    key: "columnValue",
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
    key: "multipleValues",
    get: function get() {
      return null;
    }
  }]);

  return SignatureValue;
}(_formValue["default"]);

exports["default"] = SignatureValue;
//# sourceMappingURL=signature-value.js.map