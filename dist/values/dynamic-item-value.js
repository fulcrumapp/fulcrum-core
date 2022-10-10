"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _elementFactory = _interopRequireDefault(require("../elements/element-factory"));
var _formValues = _interopRequireDefault(require("./form-values"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var DynamicItemValue = /*#__PURE__*/function () {
  function DynamicItemValue(dynamicValue, attributes) {
    this.dynamicValue = dynamicValue;
    this._metadataJSON = attributes.metadata;
    this._elementsJSON = attributes.elements;
    this._valuesJSON = attributes.values;
  }
  var _proto = DynamicItemValue.prototype;
  _proto.toJSON = function toJSON() {
    var json = {};
    json.metadata = this._metadataJSON || null;
    json.elements = [];
    for (var _iterator = _createForOfIteratorHelperLoose(this.elements), _step; !(_step = _iterator()).done;) {
      var element = _step.value;
      json.elements.push(element.toJSON());
    }
    json.values = this.values.toJSON();
    return json;
  };
  _createClass(DynamicItemValue, [{
    key: "id",
    get: function get() {
      return this.metadata.id;
    }
  }, {
    key: "metadata",
    get: function get() {
      return this._metadataJSON;
    }
  }, {
    key: "elements",
    get: function get() {
      if (this._elements == null) {
        this._elements = [];
        for (var _iterator2 = _createForOfIteratorHelperLoose(this._elementsJSON), _step2; !(_step2 = _iterator2()).done;) {
          var elementJSON = _step2.value;
          var element = _elementFactory["default"].create(null, elementJSON);
          if (element) {
            this._elements.push(element);
          }
        }
      }
      return this._elements;
    }
  }, {
    key: "values",
    get: function get() {
      if (this._values == null) {
        this._values = new _formValues["default"](this, this._valuesJSON);
      }
      return this._values;
    }
  }]);
  return DynamicItemValue;
}();
exports["default"] = DynamicItemValue;
//# sourceMappingURL=dynamic-item-value.js.map