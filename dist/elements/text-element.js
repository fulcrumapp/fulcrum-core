"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TextElement =
/*#__PURE__*/
function (_TextualElement) {
  _inheritsLoose(TextElement, _TextualElement);

  function TextElement(parent, attributes) {
    var _this;

    _this = _TextualElement.call(this, parent, attributes) || this;
    _this._isNumeric = !!attributes.numeric;
    _this.format = attributes.format;
    _this.min = null;
    _this.max = null;

    if (attributes.min != null) {
      _this.min = +attributes.min;
    }

    if (attributes.max != null) {
      _this.max = +attributes.max;
    }

    if (isNaN(_this.min)) {
      _this.min = null;
    }

    if (isNaN(_this.max)) {
      _this.max = null;
    }

    _this.pattern = attributes.pattern;
    _this.patternDescription = attributes.pattern_description;
    return _this;
  }

  var _proto = TextElement.prototype;

  _proto.toJSON = function toJSON() {
    var json = _TextualElement.prototype.toJSON.call(this);

    json.numeric = this.isNumeric;

    if (this.isNumeric) {
      json.format = this.format || 'decimal';
      json.min = this.hasMin ? this.min : null;
      json.max = this.hasMax ? this.max : null;
    } else {
      json.pattern = this.hasPattern ? this.pattern : null;
      json.pattern_description = this.hasPatternDescription ? this.patternDescription : null;
    }

    json.min_length = this._minLength;
    json.max_length = this._maxLength;
    json.default_previous_value = !!this._defaultPreviousValue;
    return json;
  };

  _createClass(TextElement, [{
    key: "isLengthValidationSupported",
    get: function get() {
      return true;
    }
  }, {
    key: "isDecimalFormat",
    get: function get() {
      return this._isNumeric && this.format === 'decimal';
    }
  }, {
    key: "isIntegerFormat",
    get: function get() {
      return this._isNumeric && this.format === 'integer';
    }
  }, {
    key: "isNumeric",
    get: function get() {
      return this._isNumeric;
    }
  }, {
    key: "hasMin",
    get: function get() {
      return this.min != null;
    }
  }, {
    key: "hasMax",
    get: function get() {
      return this.max != null;
    }
  }, {
    key: "hasPattern",
    get: function get() {
      return this.pattern && this.pattern.length;
    }
  }, {
    key: "hasPatternDescription",
    get: function get() {
      return this.patternDescription && this.patternDescription.length;
    }
  }]);

  return TextElement;
}(_textualElement["default"]);

exports["default"] = TextElement;
//# sourceMappingURL=text-element.js.map