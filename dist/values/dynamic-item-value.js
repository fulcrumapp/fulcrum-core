"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _elementFactory = _interopRequireDefault(require("../elements/element-factory"));

var _formValues = _interopRequireDefault(require("./form-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DynamicItemValue =
/*#__PURE__*/
function () {
  function DynamicItemValue(dynamicValue, attributes) {
    this.dynamicValue = dynamicValue;
    this._metadataJSON = attributes.metadata;
    this._elementsJSON = attributes.elements;
    this._valuesJSON = attributes.values;
  }

  var _proto = DynamicItemValue.prototype;

  _proto.toJSON = function toJSON() {
    var json = {};
    json.metadata = this._metadataJSON || null;
    json.elements = [];

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
      json.elements.push(element.toJSON());
    }

    json.values = this.values.toJSON();
    return json;
  };

  _createClass(DynamicItemValue, [{
    key: "id",
    get: function get() {
      return this.metadata.id;
    }
  }, {
    key: "metadata",
    get: function get() {
      return this._metadataJSON;
    }
  }, {
    key: "elements",
    get: function get() {
      if (this._elements == null) {
        this._elements = [];

        for (var _iterator2 = this._elementsJSON, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var elementJSON = _ref2;

          var element = _elementFactory["default"].create(null, elementJSON);

          if (element) {
            this._elements.push(element);
          }
        }
      }

      return this._elements;
    }
  }, {
    key: "values",
    get: function get() {
      if (this._values == null) {
        this._values = new _formValues["default"](this, this._valuesJSON);
      }

      return this._values;
    }
  }]);

  return DynamicItemValue;
}();

exports["default"] = DynamicItemValue;
//# sourceMappingURL=dynamic-item-value.js.map