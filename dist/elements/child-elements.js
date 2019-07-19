"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mixmatch = _interopRequireDefault(require("mixmatch"));

var _elementFactory = _interopRequireDefault(require("./element-factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ChildElements =
/*#__PURE__*/
function (_Mixin) {
  _inheritsLoose(ChildElements, _Mixin);

  function ChildElements() {
    return _Mixin.apply(this, arguments) || this;
  }

  var _proto = ChildElements.prototype;

  _proto.createChildElements = function createChildElements(elements) {
    this._elements = [];

    if (elements) {
      for (var _iterator = elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

    for (var _iterator2 = this.flattenElements(recurseRepeatables), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var element = _ref2;

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

    for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var element = _ref3;
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

    for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var element = _ref4;
      flat[element[attr]] = element;

      if (element.elements) {
        var children = this._flattenElementsByAttribute(element.elements, attr);

        for (var _i5 = 0, _Object$keys = Object.keys(children); _i5 < _Object$keys.length; _i5++) {
          var key = _Object$keys[_i5];
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