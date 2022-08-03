"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _containerElement = _interopRequireDefault(require("./container-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RepeatableElement = /*#__PURE__*/function (_ContainerElement) {
  _inheritsLoose(RepeatableElement, _ContainerElement);

  function RepeatableElement(parent, attributes) {
    var _this;

    _this = _ContainerElement.call(this, parent, attributes) || this;
    _this.titleFieldKeys = attributes.title_field_keys || [attributes.title_field_key];
    _this._geometryTypes = attributes.geometry_types;
    _this._geometryRequired = !!attributes.geometry_required;
    return _this;
  }

  _createClass(RepeatableElement, [{
    key: "isGeometryEnabled",
    get: function get() {
      return this._geometryTypes && this._geometryTypes.length > 0;
    }
  }, {
    key: "isGeometryRequired",
    get: function get() {
      return this.isGeometryEnabled && this._geometryRequired;
    }
  }, {
    key: "isLengthValidationSupported",
    get: function get() {
      return true;
    }
  }]);

  return RepeatableElement;
}(_containerElement["default"]);

exports["default"] = RepeatableElement;
//# sourceMappingURL=repeatable-element.js.map