'use strict';

exports.__esModule = true;

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _displayOptions = require('./display-options');

var _displayOptions2 = _interopRequireDefault(_displayOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CalculatedElement = function (_TextualElement) {
  _inherits(CalculatedElement, _TextualElement);

  function CalculatedElement(parent, attributes) {
    _classCallCheck(this, CalculatedElement);

    var _this = _possibleConstructorReturn(this, _TextualElement.call(this, parent, attributes));

    _this.expression = attributes.expression;
    _this.display = new _displayOptions2.default(attributes.display);
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
}(_textualElement2.default);

exports.default = CalculatedElement;
//# sourceMappingURL=calculated-element.js.map