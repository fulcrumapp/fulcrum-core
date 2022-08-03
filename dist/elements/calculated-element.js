"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

var _displayOptions = _interopRequireDefault(require("./display-options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CalculatedElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(CalculatedElement, _TextualElement);

  function CalculatedElement(parent, attributes) {
    var _this;

    _this = _TextualElement.call(this, parent, attributes) || this;
    _this.expression = attributes.expression;
    _this.display = new _displayOptions["default"](attributes.display);
    return _this;
  }

  CalculatedElement.findCalculatedElementRoot = function findCalculatedElementRoot(form, container) {
    if (container.type != null) {
      if (container.isSectionElement) {
        return CalculatedElement.findCalculatedElementRoot(form, container.parent);
      } else if (container.isRepeatableElement) {
        return container;
      }
    }

    return form;
  };

  CalculatedElement.findCalculatedElementsForContainer = function findCalculatedElementsForContainer(container) {
    var elements = [];

    for (var _iterator = _createForOfIteratorHelperLoose(container.elements), _step; !(_step = _iterator()).done;) {
      var element = _step.value;

      if (element.isCalculatedElement) {
        elements.push(element);
      } else if (element.isSectionElement) {
        elements = elements.concat(CalculatedElement.findCalculatedElementsForContainer(element));
      }
    }

    return elements;
  };

  return CalculatedElement;
}(_textualElement["default"]);

exports["default"] = CalculatedElement;
//# sourceMappingURL=calculated-element.js.map