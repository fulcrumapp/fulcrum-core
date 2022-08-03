"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValueFactory = _interopRequireDefault(require("./form-value-factory"));

var _formValue = _interopRequireDefault(require("./form-value"));

var _textualElement = _interopRequireDefault(require("../elements/textual-element"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _condition = _interopRequireDefault(require("../elements/condition"));

var _mediaValue = _interopRequireDefault(require("./media-value"));

var _signatureValue = _interopRequireDefault(require("./signature-value"));

var _repeatableValue = _interopRequireDefault(require("./repeatable-value"));

var _recordLinkValue = _interopRequireDefault(require("./record-link-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SearchValueSeparator = ' ';

var FormValues = /*#__PURE__*/function () {
  function FormValues(container, attributes) {
    this._values = {};
    this.container = container;
    this.loadValues(container.elements, attributes || {});
  }

  var _proto = FormValues.prototype;

  _proto.get = function get(key) {
    return this._values[key];
  };

  _proto.set = function set(key, value) {
    if (value && !(value instanceof _formValue["default"])) {
      throw new Error('Invalid value ' + value);
    }

    if (value != null) {
      this._values[key] = value;
    } else {
      delete this._values[key];
    }
  };

  _proto.find = function find(dataName) {
    var element = this.container.elementsByDataName[dataName];

    if (element) {
      return this.get(element.key);
    }

    return null;
  };

  _proto.loadValues = function loadValues(elements, attributes) {
    for (var _iterator = _createForOfIteratorHelperLoose(elements), _step; !(_step = _iterator()).done;) {
      var element = _step.value;
      this.loadValue(element, attributes);
    }
  };

  _proto.loadValue = function loadValue(element, attributes) {
    if (element.isSectionElement) {
      this.loadValues(element.elements, attributes);
    } else {
      var rawValue = attributes[element.key];

      if (rawValue != null) {
        var formValue = _formValueFactory["default"].create(element, rawValue);

        this.set(element.key, formValue);
      }
    }
  };

  _proto.toJSON = function toJSON() {
    var json = {};

    for (var _i = 0, _Object$keys = Object.keys(this._values); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var formValue = this._values[key];

      if (formValue) {
        var jsonValue = formValue.toJSON();

        if (jsonValue) {
          json[key] = jsonValue;
        }
      }
    }

    return json;
  };

  _proto.toSimpleJSON = function toSimpleJSON() {
    var json = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(this._values); _i2 < _Object$keys2.length; _i2++) {
      var key = _Object$keys2[_i2];
      var formValue = this._values[key];

      if (formValue) {
        var jsonValue = formValue.toSimpleJSON();

        if (jsonValue) {
          json[formValue.element.dataName] = jsonValue;
        }
      }
    }

    return json;
  };

  _proto.copy = function copy() {
    var copy = new FormValues(this.container);

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.all), _step2; !(_step2 = _iterator2()).done;) {
      var value = _step2.value;
      // deep copy all of the field values
      copy.set(value.element.key, copy.createValue(value.element, value != null ? value.toJSON() : null));
    }

    return copy;
  };

  _proto.merge = function merge(formValues) {
    if (!(formValues instanceof FormValues)) {
      throw new Error('Invalid values');
    }

    for (var _i3 = 0, _Object$keys3 = Object.keys(formValues._values); _i3 < _Object$keys3.length; _i3++) {
      var key = _Object$keys3[_i3];
      var formValue = formValues._values[key];
      this.set(key, formValue);
    }
  };

  _proto.createValue = function createValue(element, rawValue) {
    if (element == null) {
      throw new Error('element cannot be null');
    }

    return _formValueFactory["default"].create(element, rawValue != null ? rawValue : null);
  };

  _proto.createValueFromString = function createValueFromString(element, string) {
    if (element.isTextElement) {
      return this.createValue(element, string);
    } else if (element.isChoiceElement) {
      var choice = element.choiceByValue(string);

      if (choice) {
        return this.createValue(element, {
          choice_values: [choice.value]
        });
      }
    } else if (element.isYesNoElement) {
      return this.createValue(element, string);
    } else if (element.isBarcodeElement) {
      return this.createValue(element, string);
    } else if (element.isClassificationElement) {
      return this.createValue(element, {
        choice_values: [string]
      });
    } else if (element.isDateElement) {
      return this.createValue(element, string);
    } else if (element.isTimeElement) {
      return this.createValue(element, string);
    } else if (element.isHyperlinkElement) {
      return this.createValue(element, string);
    }

    return null;
  };

  _proto.createValueFromOtherValue = function createValueFromOtherValue(element, otherValue) {
    if (otherValue == null) {
      return this.createValue(element, null);
    }

    var destinationIsTextual = element instanceof _textualElement["default"];
    var otherIsTextual = otherValue.element instanceof _textualElement["default"];

    if (destinationIsTextual && otherIsTextual) {
      // converting text -> text
      // if the other field is a calculated field and it's being copied to a regular text field,
      // use the display value instead of the raw value so it can use the display formatting logic
      var stringValue = otherValue.textValue;

      if (otherValue.element.isCalculatedElement && element.isTextElement) {
        if (!element.isNumeric) {
          stringValue = otherValue.displayValue;
        }
      }

      return this.createValue(element, stringValue);
    } else if (destinationIsTextual && !otherIsTextual) {
      // converting choice -> text
      if (otherValue.element.isChoiceElement || otherValue.element.isClassificationElement) {
        var displayValue = otherValue.displayValue;

        if (_textUtils["default"].isPresent(displayValue)) {
          return this.createValue(element, displayValue);
        }
      }
    } else if (!destinationIsTextual && otherIsTextual) {
      // converting text -> choice
      if (element.isChoiceElement) {
        if (!otherValue.isEmpty) {
          return this.createValueFromString(element, otherValue.textValue);
        }
      }
    } else if (!destinationIsTextual && !otherIsTextual) {
      // choice -> choice
      if (element.isChoiceElement && otherValue.element.isChoiceElement || element.isClassificationElement && otherValue.element.isClassificationElement) {
        return this.createValue(element, otherValue.toJSON());
      } else if (element.isAddressElement && otherValue.element.isAddressElement) {
        // address -> address
        return this.createValue(element, otherValue.toJSON());
      }
    }

    return null;
  };

  _proto.clearInvisibleValues = function clearInvisibleValues(valuesForConditions, record) {
    var elementsToRemove = [];
    var cache = {};

    for (var _iterator3 = _createForOfIteratorHelperLoose(this.all), _step3; !(_step3 = _iterator3()).done;) {
      var formValue = _step3.value;
      var _element = formValue.element; // don't clear out fields that are:
      //   * are explicitly marked hidden
      //   * or have any parents explicitly marked as hidden
      //   * or have any parents explicitly marked to preserve values

      var skipElement = _element.isHidden || _element.hasHiddenParent || _element.isPreserved;

      if (!skipElement) {
        var shouldBeVisible = _condition["default"].shouldElementBeVisible(_element, record, valuesForConditions, cache);

        if (!shouldBeVisible) {
          elementsToRemove.push(_element);
        }
      }
    }

    for (var _i4 = 0, _elementsToRemove = elementsToRemove; _i4 < _elementsToRemove.length; _i4++) {
      var element = _elementsToRemove[_i4];
      var blankValue = this.createValue(element, null);
      this.set(element.key, blankValue);
    }
  };

  _createClass(FormValues, [{
    key: "all",
    get: function get() {
      var result = [];

      for (var _i5 = 0, _Object$keys4 = Object.keys(this._values); _i5 < _Object$keys4.length; _i5++) {
        var key = _Object$keys4[_i5];
        result.push(this._values[key]);
      }

      return result;
    }
  }, {
    key: "elements",
    get: function get() {
      return this.container.elements;
    }
  }, {
    key: "searchableValue",
    get: function get() {
      var searchValues = [];

      for (var _i6 = 0, _Object$keys5 = Object.keys(this._values); _i6 < _Object$keys5.length; _i6++) {
        var key = _Object$keys5[_i6];
        var formValue = this._values[key];

        if (formValue) {
          var searchValue = formValue.searchableValue;

          if (searchValue != null) {
            searchValues.push(searchValue.trim());
          }
        }
      }

      return searchValues.join(SearchValueSeparator).trim();
    }
  }, {
    key: "mediaValues",
    get: function get() {
      var values = [];

      for (var _iterator4 = _createForOfIteratorHelperLoose(this.all), _step4; !(_step4 = _iterator4()).done;) {
        var formValue = _step4.value;

        if (formValue instanceof _mediaValue["default"]) {
          values.push.apply(values, formValue.items);
        } else if (formValue instanceof _signatureValue["default"]) {
          values.push(formValue);
        } else if (formValue instanceof _repeatableValue["default"]) {
          for (var _iterator5 = _createForOfIteratorHelperLoose(formValue.items), _step5; !(_step5 = _iterator5()).done;) {
            var item = _step5.value;
            values.push.apply(values, item.formValues.mediaValues);
          }
        }
      }

      return values;
    }
  }, {
    key: "repeatableItems",
    get: function get() {
      var items = [];

      for (var _iterator6 = _createForOfIteratorHelperLoose(this.all), _step6; !(_step6 = _iterator6()).done;) {
        var formValue = _step6.value;

        if (formValue instanceof _repeatableValue["default"]) {
          items.push.apply(items, formValue.items);

          for (var _iterator7 = _createForOfIteratorHelperLoose(formValue.items), _step7; !(_step7 = _iterator7()).done;) {
            var item = _step7.value;
            items.push.apply(items, item.formValues.repeatableItems);
          }
        }
      }

      return items;
    }
  }, {
    key: "recordLinkItems",
    get: function get() {
      var items = [];

      for (var _iterator8 = _createForOfIteratorHelperLoose(this.all), _step8; !(_step8 = _iterator8()).done;) {
        var formValue = _step8.value;

        if (formValue instanceof _recordLinkValue["default"]) {
          items.push.apply(items, formValue.items);
        } else if (formValue instanceof _repeatableValue["default"]) {
          for (var _iterator9 = _createForOfIteratorHelperLoose(formValue.items), _step9; !(_step9 = _iterator9()).done;) {
            var item = _step9.value;
            items.push.apply(items, item.formValues.recordLinkItems);
          }
        }
      }

      return items;
    }
  }]);

  return FormValues;
}();

exports["default"] = FormValues;
//# sourceMappingURL=form-values.js.map