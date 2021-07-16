"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

var _displayOptions = _interopRequireDefault(require("./display-options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CalculatedElement =
/*#__PURE__*/
function (_TextualElement) {
  _inheritsLoose(CalculatedElement, _TextualElement);

  function CalculatedElement(parent, attributes) {
    var _this;

    _this = _TextualElement.call(this, parent, attributes) || this;
    _this._attributes.display = attributes.display.attributes;
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

    for (var _iterator = container.elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var element = _ref;

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