'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mixmatch = require('mixmatch');

var _mixmatch2 = _interopRequireDefault(_mixmatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ElementFactory = null;

var ChildElements = function (_Mixin) {
  _inherits(ChildElements, _Mixin);

  function ChildElements() {
    _classCallCheck(this, ChildElements);

    return _possibleConstructorReturn(this, _Mixin.apply(this, arguments));
  }

  ChildElements.prototype.createChildElements = function createChildElements(elements) {
    this.elements = [];

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

      // hack for circular dependency, not ideal
      ElementFactory = ElementFactory || require('./element-factory').default;
      this.elements.push(ElementFactory.create(this, element));
    }
  };

  ChildElements.prototype.elementsOfType = function elementsOfType(type) {
    var result = [];

    for (var _iterator2 = this.allElements, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

  ChildElements.prototype._flattenElements = function _flattenElements(elements) {
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

      if (element.elements) {
        flat = flat.concat(this._flattenElements(element.elements));
      }
    }

    return flat;
  };

  ChildElements.prototype._flattenElementsByAttribute = function _flattenElementsByAttribute(elements, attr) {
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

        for (var _iterator5 = Object.keys(children), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
          var _ref5;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref5 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref5 = _i5.value;
          }

          var key = _ref5;

          flat[key] = children[key];
        }
      }
    }

    return flat;
  };

  _createClass(ChildElements, [{
    key: 'allElements',
    get: function get() {
      return this._flattenElements(this.elements);
    }
  }, {
    key: 'elementsByKey',
    get: function get() {
      if (this._elementsByKey == null) {
        this._elementsByKey = this._flattenElementsByAttribute(this.elements, 'key');
      }

      return this._elementsByKey;
    }
  }, {
    key: 'elementsByDataName',
    get: function get() {
      if (this._elementsByDataName == null) {
        this._elementsByDataName = this._flattenElementsByAttribute(this.elements, 'dataName');
      }

      return this._elementsByDataName;
    }
  }]);

  return ChildElements;
}(_mixmatch2.default);

exports.default = ChildElements;
//# sourceMappingURL=child-elements.js.map