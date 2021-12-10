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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SearchValueSeparator = ' ';

var FormValues =
/*#__PURE__*/
function () {
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

    for (var _i2 = 0, _Object$keys = Object.keys(this._values); _i2 < _Object$keys.length; _i2++) {
      var key = _Object$keys[_i2];
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

    for (var _i3 = 0, _Object$keys2 = Object.keys(this._values); _i3 < _Object$keys2.length; _i3++) {
      var key = _Object$keys2[_i3];
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

    for (var _iterator2 = this.all, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i4 >= _iterator2.length) break;
        _ref2 = _iterator2[_i4++];
      } else {
        _i4 = _iterator2.next();
        if (_i4.done) break;
        _ref2 = _i4.value;
      }

      var value = _ref2;
      // deep copy all of the field values
      copy.set(value.element.key, copy.createValue(value.element, value != null ? value.toJSON() : null));
    }

    return copy;
  };

  _proto.merge = function merge(formValues) {
    if (!(formValues instanceof FormValues)) {
      throw new Error('Invalid values');
    }

    for (var _i5 = 0, _Object$keys3 = Object.keys(formValues._values); _i5 < _Object$keys3.length; _i5++) {
      var key = _Object$keys3[_i5];
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

    for (var _iterator3 = this.all, _isArray3 = Array.isArray(_iterator3), _i6 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i6 >= _iterator3.length) break;
        _ref3 = _iterator3[_i6++];
      } else {
        _i6 = _iterator3.next();
        if (_i6.done) break;
        _ref3 = _i6.value;
      }

      var formValue = _ref3;
      var element = formValue.element; // don't clear out fields that are:
      //   * are explicitly marked hidden
      //   * or have any parents explicitly marked as hidden
      //   * or have any parents explicitly marked to preserve values

      var skipElement = element.isHidden || element.hasHiddenParent || element.isPreserved;

      if (!skipElement) {
        var shouldBeVisible = _condition["default"].shouldElementBeVisible(element, record, valuesForConditions, cache);

        if (!shouldBeVisible) {
          elementsToRemove.push(element);
        }
      }
    }

    for (var _i7 = 0, _elementsToRemove = elementsToRemove; _i7 < _elementsToRemove.length; _i7++) {
      var _element = _elementsToRemove[_i7];
      var blankValue = this.createValue(_element, null);
      this.set(_element.key, blankValue);
    }
  };

  _createClass(FormValues, [{
    key: "all",
    get: function get() {
      var result = [];

      for (var _i8 = 0, _Object$keys4 = Object.keys(this._values); _i8 < _Object$keys4.length; _i8++) {
        var key = _Object$keys4[_i8];
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

      for (var _i9 = 0, _Object$keys5 = Object.keys(this._values); _i9 < _Object$keys5.length; _i9++) {
        var key = _Object$keys5[_i9];
        var formValue = this._values[key];

        if (formValue) {
          var searchValue = formValue.searchableValue;

          if (searchValue != null) {
            searchValues.push(searchValue);
          }
        }
      }

      return searchValues.join(SearchValueSeparator);
    }
  }, {
    key: "mediaValues",
    get: function get() {
      var values = [];

      for (var _iterator4 = this.all, _isArray4 = Array.isArray(_iterator4), _i10 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i10 >= _iterator4.length) break;
          _ref4 = _iterator4[_i10++];
        } else {
          _i10 = _iterator4.next();
          if (_i10.done) break;
          _ref4 = _i10.value;
        }

        var formValue = _ref4;

        if (formValue instanceof _mediaValue["default"]) {
          values.push.apply(values, formValue.items);
        } else if (formValue instanceof _signatureValue["default"]) {
          values.push(formValue);
        } else if (formValue instanceof _repeatableValue["default"]) {
          for (var _iterator5 = formValue.items, _isArray5 = Array.isArray(_iterator5), _i11 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
              if (_i11 >= _iterator5.length) break;
              _ref5 = _iterator5[_i11++];
            } else {
              _i11 = _iterator5.next();
              if (_i11.done) break;
              _ref5 = _i11.value;
            }

            var item = _ref5;
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

      for (var _iterator6 = this.all, _isArray6 = Array.isArray(_iterator6), _i12 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray6) {
          if (_i12 >= _iterator6.length) break;
          _ref6 = _iterator6[_i12++];
        } else {
          _i12 = _iterator6.next();
          if (_i12.done) break;
          _ref6 = _i12.value;
        }

        var formValue = _ref6;

        if (formValue instanceof _repeatableValue["default"]) {
          items.push.apply(items, formValue.items);

          for (var _iterator7 = formValue.items, _isArray7 = Array.isArray(_iterator7), _i13 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
            var _ref7;

            if (_isArray7) {
              if (_i13 >= _iterator7.length) break;
              _ref7 = _iterator7[_i13++];
            } else {
              _i13 = _iterator7.next();
              if (_i13.done) break;
              _ref7 = _i13.value;
            }

            var item = _ref7;
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

      for (var _iterator8 = this.all, _isArray8 = Array.isArray(_iterator8), _i14 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray8) {
          if (_i14 >= _iterator8.length) break;
          _ref8 = _iterator8[_i14++];
        } else {
          _i14 = _iterator8.next();
          if (_i14.done) break;
          _ref8 = _i14.value;
        }

        var formValue = _ref8;

        if (formValue instanceof _recordLinkValue["default"]) {
          items.push.apply(items, formValue.items);
        } else if (formValue instanceof _repeatableValue["default"]) {
          for (var _iterator9 = formValue.items, _isArray9 = Array.isArray(_iterator9), _i15 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
            var _ref9;

            if (_isArray9) {
              if (_i15 >= _iterator9.length) break;
              _ref9 = _iterator9[_i15++];
            } else {
              _i15 = _iterator9.next();
              if (_i15.done) break;
              _ref9 = _i15.value;
            }

            var item = _ref9;
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