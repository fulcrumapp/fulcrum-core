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
  function DynamicItemValue(dynamicElementValue, attributes) {
    this.dynamicElementValue = dynamicElementValue;
    this._formValuesJSON = attributes.values;
    this._elementsJSON = attributes.elements;
    this._metadataJSON = attributes.metadata;
  }

  var _proto = DynamicItemValue.prototype;

  _proto.toJSON = function toJSON() {
    var json = {};
    json.values = this._formValuesJSON || null;
    json.elements = this._elementsJSON || null;
    json.metadata = this._metadataJSON || null;
    return json;
  };

  _createClass(DynamicItemValue, [{
    key: "metadata",
    get: function get() {
      return this._metadataJSON;
    }
  }, {
    key: "formValues",
    get: function get() {
      if (this._formValues == null) {
        this._formValues = new _formValues["default"](this, this._formValuesJSON);
      }

      return this._formValues;
    }
  }]);

  return DynamicItemValue;
}();

exports["default"] = DynamicItemValue;

_childElements["default"].includeInto(DynamicItemValue);
//# sourceMappingURL=dynamic-item-value.js.map