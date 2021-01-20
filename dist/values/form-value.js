"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValueFactory = _interopRequireDefault(require("./form-value-factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function notImplemented() {
  throw new Error('Not implemented');
}

var FormValue = /*#__PURE__*/function () {
  function FormValue(element, value) {
    this._element = element;
    this._rawValue = value;
  }

  var _proto = FormValue.prototype;

  _proto.format = function format(options) {
    notImplemented();
  };

  _proto.toJSON = function toJSON() {
    notImplemented();
  };

  _proto.toSimpleJSON = function toSimpleJSON() {
    return this.toJSON();
  };

  _proto.isEqual = function isEqual(value) {
    notImplemented();
  };

  _proto.contains = function contains(value) {
    notImplemented();
  };

  _proto.startsWith = function startsWith(value) {
    notImplemented();
  };

  _proto.isLessThan = function isLessThan(value) {
    notImplemented();
  };

  _proto.isGreaterThan = function isGreaterThan(value) {
    notImplemented();
  };

  FormValue.create = function create(element, attributes) {
    return _formValueFactory["default"].create(element, attributes);
  };

  _createClass(FormValue, [{
    key: "element",
    get: function get() {
      return this._element;
    },
    set: function set(element) {
      this._element = element;
    }
  }, {
    key: "isEmpty",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "displayValue",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "searchableValue",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "length",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "columnValue",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "multipleValues",
    get: function get() {
      notImplemented();
    }
  }]);

  return FormValue;
}();

exports["default"] = FormValue;
//# sourceMappingURL=form-value.js.map