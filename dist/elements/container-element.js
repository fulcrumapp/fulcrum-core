"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _childElements = _interopRequireDefault(require("./child-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ContainerElement =
/*#__PURE__*/
function (_Element) {
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