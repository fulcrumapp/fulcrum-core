'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _displayOptions = require('./display-options');

var _displayOptions2 = _interopRequireDefault(_displayOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalculatedElement = function (_TextualElement) {
  _inherits(CalculatedElement, _TextualElement);

  function CalculatedElement(parent, attributes) {
    _classCallCheck(this, CalculatedElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalculatedElement).call(this, parent, attributes));

    _this.expression = attributes.expression;
    _this.display = new _displayOptions2.default(attributes.display);
    return _this;
  }

  _createClass(CalculatedElement, null, [{
    key: 'findCalculatedElementRoot',
    value: function findCalculatedElementRoot(form, container) {
      if (container.type != null) {
        if (container.isSectionElement) {
          return CalculatedElement.findCalculatedElementRoot(form, container.parent);
        } else if (container.isRepeatableElement) {
          return container;
        }
      }
      return form;
    }
  }, {
    key: 'findCalculatedElementsForContainer',
    value: function findCalculatedElementsForContainer(container) {
      var elements = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = container.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (element.isCalculatedElement) {
            elements.push(element);
          } else if (element.isSectionElement) {
            elements = elements.concat(CalculatedElement.findCalculatedElementsForContainer(element));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return elements;
    }
  }]);

  return CalculatedElement;
}(_textualElement2.default);

exports.default = CalculatedElement;
//# sourceMappingURL=calculated-element.js.map