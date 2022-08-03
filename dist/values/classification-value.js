"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _classification = _interopRequireDefault(require("../elements/classification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DisplaySeparator = ' ▸ ';
var SearchSeparator = ' ';

var ClassificationValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(ClassificationValue, _FormValue);

  function ClassificationValue(element, attributes) {
    var _this;

    _this = _FormValue.call(this, element, attributes) || this;
    _this._choiceValues = [];
    _this._otherValues = [];

    if (attributes) {
      if (attributes.choice_values) {
        for (var _iterator = _createForOfIteratorHelperLoose(attributes.choice_values), _step; !(_step = _iterator()).done;) {
          var choice = _step.value;

          if (_textUtils["default"].isPresent(choice)) {
            _this._choiceValues.push(choice);
          }
        }
      }

      if (attributes.other_values) {
        for (var _iterator2 = _createForOfIteratorHelperLoose(attributes.other_values), _step2; !(_step2 = _iterator2()).done;) {
          var _choice = _step2.value;

          if (_textUtils["default"].isPresent(_choice)) {
            _this._otherValues.push(_choice);
          }
        }
      }
    }

    return _this;
  }

  var _proto = ClassificationValue.prototype;

  _proto.isEqual = function isEqual(value) {
    var classification = this.selectedClassification;
    var choiceValues = classification ? classification.toJSON() : null;
    var ESCAPED = /\\,/g;
    var parts = value.replace(ESCAPED, '\t\t').split(',').map(function (part) {
      return part.replace(/\t\t/g, ',');
    });
    var allMatchSoFar = false;
    var partIndex = 0;

    for (var _iterator3 = _createForOfIteratorHelperLoose(parts), _step3; !(_step3 = _iterator3()).done;) {
      var part = _step3.value;

      if (part != null && choiceValues && partIndex < choiceValues.length && choiceValues[partIndex].toLowerCase() === part.replace(ESCAPED, ',').toLowerCase()) {
        allMatchSoFar = true;
      } else {
        allMatchSoFar = false;
        break;
      }

      ++partIndex;
    }

    return allMatchSoFar;
  };

  _proto.contains = function contains(value) {
    return this.isEqual(value);
  };

  _proto.startsWith = function startsWith(value) {
    return this.contains(value);
  };

  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    return useDisplayValue && this.labelStrings.length > 0 ? this.labelStrings : this.valueStrings;
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    var choiceValues = this._choiceValues.slice();

    var otherValues = this._otherValues.slice();

    return {
      choice_values: choiceValues,
      other_values: otherValues
    };
  };

  _proto.toSimpleJSON = function toSimpleJSON(_temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        labels = _ref2.labels;

    if (this.isEmpty) {
      return null;
    }

    var strings = labels ? this.labelStrings : this.valueStrings;
    return strings;
  };

  _proto.setSelectedClassification = function setSelectedClassification(classification, otherValue) {
    if (classification instanceof _classification["default"]) {
      this.setSelectedClassificationJSON(classification.toJSON(), otherValue);
    } else {
      this.setSelectedClassificationJSON(null, otherValue);
    }
  };

  _proto.setSelectedClassificationJSON = function setSelectedClassificationJSON(classificationAsJSON, otherValue) {
    if (classificationAsJSON && classificationAsJSON.length) {
      this._choiceValues = classificationAsJSON;
    } else {
      this._choiceValues = [];
    }

    if (otherValue) {
      this._otherValues = [otherValue.toString()];
    } else {
      this._otherValues = [];
    }
  };

  _createClass(ClassificationValue, [{
    key: "isEmpty",
    get: function get() {
      if (this._choiceValues.length) {
        return false;
      }

      if (this._otherValues.length) {
        return false;
      }

      return true;
    }
  }, {
    key: "labelStrings",
    get: function get() {
      var labels = [];
      var classification = this.selectedClassification;

      if (classification) {
        for (var _iterator4 = _createForOfIteratorHelperLoose(classification.exploded), _step4; !(_step4 = _iterator4()).done;) {
          var item = _step4.value;

          if (item.label) {
            labels.push(item.label);
          }
        }
      }

      if (this.hasOtherValue) {
        labels.push(this.otherValue);
      }

      return labels;
    }
  }, {
    key: "valueStrings",
    get: function get() {
      var values = [];

      for (var _iterator5 = _createForOfIteratorHelperLoose(this._choiceValues), _step5; !(_step5 = _iterator5()).done;) {
        var value = _step5.value;
        values.push(value);
      }

      for (var _iterator6 = _createForOfIteratorHelperLoose(this._otherValues), _step6; !(_step6 = _iterator6()).done;) {
        var _value = _step6.value;
        values.push(_value);
      }

      return values;
    }
  }, {
    key: "displayValue",
    get: function get() {
      // When a classification entry has been removed but this record still has
      // the value associated with the removed entry, just show the raw value.
      if (this.labelStrings.length === 0) {
        return this.valueStrings.join(DisplaySeparator);
      }

      return this.labelStrings.join(DisplaySeparator);
    }
  }, {
    key: "searchableValue",
    get: function get() {
      var values = [];
      var classification = this.selectedClassification;

      if (classification) {
        for (var _iterator7 = _createForOfIteratorHelperLoose(classification.exploded), _step7; !(_step7 = _iterator7()).done;) {
          var item = _step7.value;

          if (item.label) {
            values.push(item.label);
          }

          if (item.value && item.value !== item.label) {
            values.push(item.value);
          }
        }
      }

      if (this.hasOtherValue) {
        values.push(this.otherValue);
      }

      return values.join(SearchSeparator);
    }
  }, {
    key: "length",
    get: function get() {
      return this._choiceValues.length + this._otherValues.length;
    }
  }, {
    key: "columnValue",
    get: function get() {
      var allValues = this.valueStrings;

      if (allValues.length === 0) {
        return null;
      }

      return allValues;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      return null;
    }
  }, {
    key: "hasOtherValue",
    get: function get() {
      return this._otherValues.length !== 0;
    }
  }, {
    key: "otherValue",
    get: function get() {
      if (!this.hasOtherValue) {
        return null;
      }

      return this._otherValues[0];
    },
    set: function set(value) {
      if (value && value.length) {
        this._otherValues = [value];
      } else {
        this._otherValues = [];
      }
    }
  }, {
    key: "selectedClassification",
    get: function get() {
      var result = null;

      if (this._choiceValues.length === 0) {
        return null;
      }

      var currentClassifications = this.element.classificationItems;

      for (var _iterator8 = _createForOfIteratorHelperLoose(this._choiceValues), _step8; !(_step8 = _iterator8()).done;) {
        var classificationValue = _step8.value;

        for (var _iterator9 = _createForOfIteratorHelperLoose(currentClassifications), _step9; !(_step9 = _iterator9()).done;) {
          var classification = _step9.value;

          if (_textUtils["default"].trim(classification.value) === _textUtils["default"].trim(classificationValue)) {
            result = classification;
            currentClassifications = classification.items;
            break;
          }
        }
      }

      return result;
    }
  }]);

  return ClassificationValue;
}(_formValue["default"]);

exports["default"] = ClassificationValue;
//# sourceMappingURL=classification-value.js.map