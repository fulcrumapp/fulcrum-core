"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _mixmatch = _interopRequireDefault(require("mixmatch"));
var _elementFactory = _interopRequireDefault(require("./element-factory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ChildElements = /*#__PURE__*/function (_Mixin) {
  _inheritsLoose(ChildElements, _Mixin);
  function ChildElements() {
    return _Mixin.apply(this, arguments) || this;
  }
  var _proto = ChildElements.prototype;
  _proto.createChildElements = function createChildElements(elements) {
    this._elements = [];
    if (elements) {
      for (var _iterator = _createForOfIteratorHelperLoose(elements), _step; !(_step = _iterator()).done;) {
        var element = _step.value;
        var el = _elementFactory["default"].create(this, element);
        if (el) {
          this._elements.push(el);
        }
      }
    }
  };
  _proto.elementsOfType = function elementsOfType(type, recurseRepeatables) {
    if (recurseRepeatables === void 0) {
      recurseRepeatables = true;
    }
    var result = [];
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.flattenElements(recurseRepeatables)), _step2; !(_step2 = _iterator2()).done;) {
      var element = _step2.value;
      if (element.type === type) {
        result.push(element);
      }
    }
    return result;
  };
  _proto.flattenElements = function flattenElements(recurseRepeatables) {
    if (recurseRepeatables === void 0) {
      recurseRepeatables = true;
    }
    return this._flattenElements(this.elements, recurseRepeatables);
  };
  _proto._flattenElements = function _flattenElements(elements, recurseRepeatables) {
    if (recurseRepeatables === void 0) {
      recurseRepeatables = true;
    }
    var flat = [];
    for (var _iterator3 = _createForOfIteratorHelperLoose(elements), _step3; !(_step3 = _iterator3()).done;) {
      var element = _step3.value;
      flat.push(element);
      var recurse = true;
      if (!recurseRepeatables && element.isRepeatableElement) {
        recurse = false;
      }
      if (recurse && element.elements) {
        flat = flat.concat(this._flattenElements(element.elements, recurseRepeatables));
      }
    }
    return flat;
  };
  _proto._flattenElementsByAttribute = function _flattenElementsByAttribute(elements, attr) {
    var flat = {};
    for (var _iterator4 = _createForOfIteratorHelperLoose(elements), _step4; !(_step4 = _iterator4()).done;) {
      var element = _step4.value;
      flat[element[attr]] = element;
      if (element.elements) {
        var children = this._flattenElementsByAttribute(element.elements, attr);
        for (var _i = 0, _Object$keys = Object.keys(children); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          flat[key] = children[key];
        }
      }
    }
    return flat;
  };
  _createClass(ChildElements, [{
    key: "elements",
    get: function get() {
      if (!this._elements) {
        this.createChildElements(this._elementsJSON);
      }
      return this._elements;
    }
  }, {
    key: "allElements",
    get: function get() {
      return this._flattenElements(this.elements);
    }
  }, {
    key: "elementsByKey",
    get: function get() {
      if (this._elementsByKey == null) {
        this._elementsByKey = this._flattenElementsByAttribute(this.elements, 'key');
      }
      return this._elementsByKey;
    }
  }, {
    key: "elementsByDataName",
    get: function get() {
      if (this._elementsByDataName == null) {
        this._elementsByDataName = this._flattenElementsByAttribute(this.elements, 'dataName');
      }
      return this._elementsByDataName;
    }
  }]);
  return ChildElements;
}(_mixmatch["default"]);
exports["default"] = ChildElements;
//# sourceMappingURL=child-elements.js.map