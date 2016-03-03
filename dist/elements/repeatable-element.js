'use strict';

exports.__esModule = true;

var _containerElement = require('./container-element');

var _containerElement2 = _interopRequireDefault(_containerElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RepeatableElement = function (_ContainerElement) {
  _inherits(RepeatableElement, _ContainerElement);

  function RepeatableElement(parent, attributes) {
    _classCallCheck(this, RepeatableElement);

    var _this = _possibleConstructorReturn(this, _ContainerElement.call(this, parent, attributes));

    _this.titleFieldKeys = attributes.title_field_keys;

    _this.geometryTypes = attributes.geometry_types;

    _this.geometryRequired = !!attributes.geometry_required;
    return _this;
  }

  return RepeatableElement;
}(_containerElement2.default);

exports.default = RepeatableElement;
//# sourceMappingURL=repeatable-element.js.map