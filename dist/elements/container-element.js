"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _childElements = _interopRequireDefault(require("./child-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ContainerElement = /*#__PURE__*/function (_Element) {
  _inheritsLoose(ContainerElement, _Element);

  function ContainerElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;

    _this.createChildElements(attributes.elements);

    return _this;
  }

  var _proto = ContainerElement.prototype;

  _proto.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    for (var _iterator = _createForOfIteratorHelperLoose(this.elements), _step; !(_step = _iterator()).done;) {
      var element = _step.value;
      element.resetOverrides();
    }
  };

  ContainerElement.initialize = function initialize() {
    // this is a bit of a hack to get around circular dependencies. This gets
    // called once from within the factory to setup the class. Putting this
    // at global scope introduces circular dependency errors because ChildElements
    // ends up loading the factory.
    _childElements["default"].includeInto(ContainerElement);
  };

  return ContainerElement;
}(_element["default"]);

exports["default"] = ContainerElement;
//# sourceMappingURL=container-element.js.map