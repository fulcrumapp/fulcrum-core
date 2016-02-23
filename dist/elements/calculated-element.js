'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _displayOptions = require('./display-options');

var _displayOptions2 = _interopRequireDefault(_displayOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CalculatedElement extends _textualElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.expression = attributes.expression;
    this.display = new _displayOptions2.default(attributes.display);
  }

  static findCalculatedElementRoot(form, container) {
    if (container.type != null) {
      if (container.isSectionElement) {
        return CalculatedElement.findCalculatedElementRoot(form, container.parent);
      } else if (container.isRepeatableElement) {
        return container;
      }
    }
    return form;
  }

  static findCalculatedElementsForContainer(container) {
    let elements = [];

    for (let element of container.elements) {
      if (element.isCalculatedElement) {
        elements.push(element);
      } else if (element.isSectionElement) {
        elements = elements.concat(CalculatedElement.findCalculatedElementsForContainer(element));
      }
    }

    return elements;
  }
}
exports.default = CalculatedElement;
//# sourceMappingURL=calculated-element.js.map