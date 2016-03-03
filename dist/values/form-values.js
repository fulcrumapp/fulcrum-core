'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValueFactory = require('./form-value-factory');

var _formValueFactory2 = _interopRequireDefault(_formValueFactory);

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textualElement = require('../elements/textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchValueSeparator = ' ';

var FormValues = function () {
  function FormValues(container, attributes) {
    _classCallCheck(this, FormValues);

    this._values = {};
    this.container = container;
    this.loadValues(container.elements, attributes);
  }

  FormValues.prototype.get = function get(key) {
    return this._values[key];
  };

  FormValues.prototype.set = function set(key, value) {
    if (value && !(value instanceof _formValue2.default)) {
      throw new Error('Invalid value ' + value);
    }

    if (value != null) {
      this._values[key] = value;
    } else {
      delete this._values[key];
    }
  };

  FormValues.prototype.find = function find(dataName) {
    var element = this.container.elementsByDataName[dataName];

    if (element) {
      return this.get(element.key);
    }

    return null;
  };

  FormValues.prototype.loadValues = function loadValues(elements, attributes) {
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

  FormValues.prototype.loadValue = function loadValue(element, attributes) {
    if (element.isSectionElement) {
      this.loadValues(element.elements, attributes);
    } else {
      var rawValue = attributes[element.key];

      if (rawValue != null) {
        var formValue = _formValueFactory2.default.create(element, rawValue);

        this.set(element.key, formValue);
      }
    }
  };

  FormValues.prototype.toJSON = function toJSON() {
    var json = {};

    for (var _iterator2 = Object.keys(this._values), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var key = _ref2;

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

  FormValues.prototype.copy = function copy() {
    return new FormValues(this.container, this.toJSON());
  };

  FormValues.prototype.merge = function merge(formValues) {
    if (!(formValues instanceof FormValues)) {
      throw new Error('Invalid values');
    }

    for (var _iterator3 = Object.keys(this._values), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var key = _ref3;

      var formValue = this._values[key];

      this.set(key, formValue);
    }
  };

  FormValues.prototype.createValue = function createValue(element, rawValue) {
    return _formValueFactory2.default.create(element, rawValue != null ? rawValue : null);
  };

  FormValues.prototype.createValueFromString = function createValueFromString(element, string) {
    if (element.isTextElement) {
      return this.createValue(element, string);
    } else if (element.isChoiceElement) {
      var choice = element.choiceByValue(string);

      if (choice) {
        return this.createValue(element, { choice_values: [choice.value] });
      }
    } else if (element.isYesNoElement) {
      return this.createValue(element, string);
    } else if (element.isBarcodeElement) {
      return this.createValue(element, string);
    } else if (element.isClassificationElement) {
      return this.createValue(element, { choice_values: [string] });
    } else if (element.isDateElement) {
      return this.createValue(element, string);
    } else if (element.isTimeElement) {
      return this.createValue(element, string);
    } else if (element.isHyperlinkElement) {
      return this.createValue(element, string);
    }

    return null;
  };

  FormValues.prototype.createValueFromOtherValue = function createValueFromOtherValue(element, otherValue) {
    if (otherValue == null) {
      return this.createValue(element, null);
    }

    var destinationIsTextual = element instanceof _textualElement2.default;
    var otherIsTextual = otherValue.element instanceof _textualElement2.default;

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

        if (_textUtils2.default.isPresent(displayValue)) {
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

  _createClass(FormValues, [{
    key: 'all',
    get: function get() {
      var result = [];

      for (var _iterator4 = Object.keys(this._values), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var key = _ref4;

        result.push(this._values[key]);
      }

      return result;
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var searchValues = [];

      for (var _iterator5 = Object.keys(this._values), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
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
  }]);

  return FormValues;
}();

exports.default = FormValues;
//# sourceMappingURL=form-values.js.map