"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _childElements = _interopRequireDefault(require("../elements/child-elements"));

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
    json.elements = this._elementsJSON || null;
    json.values = this.values.toJSON() || null;
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

_childElements["default"].includeInto(DynamicItemValue);
//# sourceMappingURL=dynamic-item-value.js.map