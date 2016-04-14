'use strict';

exports.__esModule = true;

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _childElements = require('./child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ContainerElement = function (_Element) {
  _inherits(ContainerElement, _Element);

  function ContainerElement(parent, attributes) {
    _classCallCheck(this, ContainerElement);

    var _this = _possibleConstructorReturn(this, _Element.call(this, parent, attributes));

    _this.createChildElements(attributes.elements);
    return _this;
  }

  ContainerElement.prototype.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    for (var _iterator = this.elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

      element.resetOverrides();
    }
  };

  return ContainerElement;
}(_element2.default);

exports.default = ContainerElement;


_childElements2.default.includeInto(ContainerElement);
//# sourceMappingURL=container-element.js.map