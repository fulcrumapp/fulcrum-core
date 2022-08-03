"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _lodash = _interopRequireDefault(require("lodash.includes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ChoiceDisplaySeparator = ', ';
var ChoiceSearchSeparator = ' ';

var ChoiceValue = /*#__PURE__*/function (_FormValue) {
  _inheritsLoose(ChoiceValue, _FormValue);

  function ChoiceValue(element, attributes) {
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

  var _proto = ChoiceValue.prototype;

  _proto.format = function format(_ref) {
    var _ref$useDisplayValue = _ref.useDisplayValue,
        useDisplayValue = _ref$useDisplayValue === void 0 ? false : _ref$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    var values = useDisplayValue ? this.labelStrings.sort() : this.valueStrings.sort();

    if (!this.element.multiple) {
      return values[0];
    }

    return values;
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    var choiceValues = [];
    var otherValues = [];

    for (var _iterator3 = _createForOfIteratorHelperLoose(this._choiceValues), _step3; !(_step3 = _iterator3()).done;) {
      var rawValue = _step3.value;
      choiceValues.push(rawValue);
    }

    for (var _iterator4 = _createForOfIteratorHelperLoose(this._otherValues), _step4; !(_step4 = _iterator4()).done;) {
      var otherValue = _step4.value;
      otherValues.push(otherValue);
    }

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
    return this.element.multiple ? strings : strings[0];
  };

  _proto.isEqual = function isEqual(value) {
    if ((0, _lodash["default"])(this.selectedValues, value)) {
      return true;
    }

    return this.otherValue === value;
  };

  _proto.contains = function contains(value) {
    return this.isEqual(value);
  };

  _proto.startsWith = function startsWith(value) {
    return this.contains(value);
  } // isLessThan(value) {
  //   notImplemented();
  // }
  // isGreaterThan(value) {
  //   notImplemented();
  // }
  ;

  _createClass(ChoiceValue, [{
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

      for (var _iterator5 = _createForOfIteratorHelperLoose(this._choiceValues), _step5; !(_step5 = _iterator5()).done;) {
        var rawValue = _step5.value;
        var choice = this.element.choiceByValue(rawValue);
        var label = choice != null ? choice.label : rawValue;

        if (_textUtils["default"].isPresent(label)) {
          labels.push(label);
        }
      }

      for (var _iterator6 = _createForOfIteratorHelperLoose(this._otherValues), _step6; !(_step6 = _iterator6()).done;) {
        var otherValue = _step6.value;
        labels.push(otherValue);
      }

      return labels;
    }
  }, {
    key: "valueStrings",
    get: function get() {
      var values = [];

      for (var _iterator7 = _createForOfIteratorHelperLoose(this._choiceValues), _step7; !(_step7 = _iterator7()).done;) {
        var rawValue = _step7.value;
        values.push(rawValue);
      }

      for (var _iterator8 = _createForOfIteratorHelperLoose(this._otherValues), _step8; !(_step8 = _iterator8()).done;) {
        var otherValue = _step8.value;
        values.push(otherValue);
      }

      return values;
    }
  }, {
    key: "displayValue",
    get: function get() {
      return this.labelStrings.join(ChoiceDisplaySeparator);
    }
  }, {
    key: "searchableValue",
    get: function get() {
      var values = [];

      for (var _iterator9 = _createForOfIteratorHelperLoose(this._choiceValues), _step9; !(_step9 = _iterator9()).done;) {
        var rawValue = _step9.value;
        var choice = this.element.choiceByValue(rawValue);

        if (choice != null) {
          values.push(choice.label);

          if (choice.label !== choice.value) {
            values.push(choice.value);
          }
        } else {
          values.push(rawValue);
        }
      }

      for (var _iterator10 = _createForOfIteratorHelperLoose(this._otherValues), _step10; !(_step10 = _iterator10()).done;) {
        var otherValue = _step10.value;
        values.push(otherValue);
      }

      return values.join(ChoiceSearchSeparator);
    }
  }, {
    key: "length",
    get: function get() {
      return this._choiceValues.length + this._otherValues.length;
    }
  }, {
    key: "columnValue",
    get: function get() {
      var allValues = this.valueStrings.sort();

      if (allValues.length === 0) {
        return null;
      }

      if (!this.element.multiple) {
        return allValues[0];
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
    key: "selectedValues",
    get: function get() {
      return this._choiceValues.slice();
    },
    set: function set(values) {
      this._choiceValues = (values || []).slice();
    }
  }, {
    key: "otherValues",
    get: function get() {
      return this._otherValues.slice();
    },
    set: function set(values) {
      this._otherValues = (values || []).slice();
    }
  }, {
    key: "otherValue",
    get: function get() {
      if (!this.hasOtherValue) {
        return null;
      }

      return this._otherValues[0];
    }
  }]);

  return ChoiceValue;
}(_formValue["default"]);

exports["default"] = ChoiceValue;
//# sourceMappingURL=choice-value.js.map