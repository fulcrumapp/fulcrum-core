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

var _condition = require('../elements/condition');

var _condition2 = _interopRequireDefault(_condition);

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _signatureValue = require('./signature-value');

var _signatureValue2 = _interopRequireDefault(_signatureValue);

var _repeatableValue = require('./repeatable-value');

var _repeatableValue2 = _interopRequireDefault(_repeatableValue);

var _recordLinkValue = require('./record-link-value');

var _recordLinkValue2 = _interopRequireDefault(_recordLinkValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchValueSeparator = ' ';

var FormValues = function () {
  function FormValues(container, attributes) {
    _classCallCheck(this, FormValues);

    this._values = {};
    this.container = container;
    this.loadValues(container.elements, attributes || {});
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

  FormValues.prototype.toSimpleJSON = function toSimpleJSON() {
    var json = {};

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

      if (formValue) {
        var jsonValue = formValue.toSimpleJSON();

        if (jsonValue) {
          json[formValue.element.dataName] = jsonValue;
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

    for (var _iterator4 = Object.keys(formValues._values), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
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

      var formValue = formValues._values[key];

      this.set(key, formValue);
    }
  };

  FormValues.prototype.createValue = function createValue(element, rawValue) {
    if (element == null) {
      throw new Error('element cannot be null');
    }

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

  FormValues.prototype.clearInvisibleValues = function clearInvisibleValues(valuesForConditions, record) {
    var elementsToRemove = [];

    var cache = {};

    for (var _iterator5 = this.all, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var formValue = _ref5;

      var element = formValue.element;

      // don't clear out fields that are:
      //   * are explicitly marked hidden
      //   * or have any parents explicitly marked as hidden
      //   * or have any parents explicitly marked to preserve values
      var skipElement = element.isHidden || element.hasHiddenParent || element.isPreserved;

      if (!skipElement) {
        var shouldBeVisible = _condition2.default.shouldElementBeVisible(element, record, valuesForConditions, cache);

        if (!shouldBeVisible) {
          elementsToRemove.push(element);
        }
      }
    }

    for (var _iterator6 = elementsToRemove, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref6 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref6 = _i6.value;
      }

      var _element = _ref6;

      var blankValue = this.createValue(_element, null);

      this.set(_element.key, blankValue);
    }
  };

  _createClass(FormValues, [{
    key: 'all',
    get: function get() {
      var result = [];

      for (var _iterator7 = Object.keys(this._values), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray7) {
          if (_i7 >= _iterator7.length) break;
          _ref7 = _iterator7[_i7++];
        } else {
          _i7 = _iterator7.next();
          if (_i7.done) break;
          _ref7 = _i7.value;
        }

        var key = _ref7;

        result.push(this._values[key]);
      }

      return result;
    }
  }, {
    key: 'elements',
    get: function get() {
      return this.container.elements;
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var searchValues = [];

      for (var _iterator8 = Object.keys(this._values), _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref8 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref8 = _i8.value;
        }

        var key = _ref8;

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
    key: 'mediaValues',
    get: function get() {
      var values = [];

      for (var _iterator9 = this.all, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray9) {
          if (_i9 >= _iterator9.length) break;
          _ref9 = _iterator9[_i9++];
        } else {
          _i9 = _iterator9.next();
          if (_i9.done) break;
          _ref9 = _i9.value;
        }

        var formValue = _ref9;

        if (formValue instanceof _mediaValue2.default) {
          values.push.apply(values, formValue.items);
        } else if (formValue instanceof _signatureValue2.default) {
          values.push(formValue);
        } else if (formValue instanceof _repeatableValue2.default) {
          for (var _iterator10 = formValue.items, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
            var _ref10;

            if (_isArray10) {
              if (_i10 >= _iterator10.length) break;
              _ref10 = _iterator10[_i10++];
            } else {
              _i10 = _iterator10.next();
              if (_i10.done) break;
              _ref10 = _i10.value;
            }

            var item = _ref10;

            values.push.apply(values, item.formValues.mediaValues);
          }
        }
      }

      return values;
    }
  }, {
    key: 'repeatableItems',
    get: function get() {
      var items = [];

      for (var _iterator11 = this.all, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
        var _ref11;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) break;
          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done) break;
          _ref11 = _i11.value;
        }

        var formValue = _ref11;

        if (formValue instanceof _repeatableValue2.default) {
          items.push.apply(items, formValue.items);

          for (var _iterator12 = formValue.items, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
            var _ref12;

            if (_isArray12) {
              if (_i12 >= _iterator12.length) break;
              _ref12 = _iterator12[_i12++];
            } else {
              _i12 = _iterator12.next();
              if (_i12.done) break;
              _ref12 = _i12.value;
            }

            var item = _ref12;

            items.push.apply(items, item.formValues.repeatableItems);
          }
        }
      }

      return items;
    }
  }, {
    key: 'recordLinkItems',
    get: function get() {
      var items = [];

      for (var _iterator13 = this.all, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
        var _ref13;

        if (_isArray13) {
          if (_i13 >= _iterator13.length) break;
          _ref13 = _iterator13[_i13++];
        } else {
          _i13 = _iterator13.next();
          if (_i13.done) break;
          _ref13 = _i13.value;
        }

        var formValue = _ref13;

        if (formValue instanceof _recordLinkValue2.default) {
          items.push.apply(items, formValue.items);
        } else if (formValue instanceof _repeatableValue2.default) {
          for (var _iterator14 = formValue.items, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
            var _ref14;

            if (_isArray14) {
              if (_i14 >= _iterator14.length) break;
              _ref14 = _iterator14[_i14++];
            } else {
              _i14 = _iterator14.next();
              if (_i14.done) break;
              _ref14 = _i14.value;
            }

            var item = _ref14;

            items.push.apply(items, item.formValues.recordLinkItems);
          }
        }
      }

      return items;
    }
  }]);

  return FormValues;
}();

exports.default = FormValues;
//# sourceMappingURL=form-values.js.map