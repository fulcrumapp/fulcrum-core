"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _repeatableItemValue = _interopRequireDefault(require("../values/repeatable-item-value"));

var _record = _interopRequireDefault(require("../record"));

var _condition = _interopRequireDefault(require("../elements/condition"));

var _customValidationError = _interopRequireDefault(require("./custom-validation-error"));

var _requiredFieldValidationError = _interopRequireDefault(require("./required-field-validation-error"));

var _geometryRequiredValidationError = _interopRequireDefault(require("./geometry-required-validation-error"));

var _patternValidationError = _interopRequireDefault(require("./pattern-validation-error"));

var _lengthValidationError = _interopRequireDefault(require("./length-validation-error"));

var _numericFormatValidationError = _interopRequireDefault(require("./numeric-format-validation-error"));

var _numericRangeValidationError = _interopRequireDefault(require("./numeric-range-validation-error"));

var _dateFormatValidationError = _interopRequireDefault(require("./date-format-validation-error"));

var _timeFormatValidationError = _interopRequireDefault(require("./time-format-validation-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FeatureValidator =
/*#__PURE__*/
function () {
  function FeatureValidator() {}

  FeatureValidator.validateFeature = function validateFeature(feature, record, formValues) {
    if (feature instanceof _record["default"]) {
      return FeatureValidator.validateRecord(record, formValues);
    } else if (feature instanceof _repeatableItemValue["default"]) {
      return FeatureValidator.validateRepeatableItem(feature, record, formValues);
    }

    return [];
  };

  FeatureValidator.validateRecord = function validateRecord(record, formValues) {
    if (record == null) {
      return [];
    }

    var errors = [];

    if (record.isStatusFieldEnabled) {
      if (record.status == null) {
        errors.push(new _requiredFieldValidationError["default"](record.form.statusField));
      } else if (record.form.statusField.statusForValue(record.status) == null) {
        errors.push(new _customValidationError["default"](record.status + " is not a valid status."));
      }
    }

    if (record.form.isGeometryRequired) {
      if (!record.hasCoordinate) {
        errors.push(new _geometryRequiredValidationError["default"]());
      }
    }

    var cache = {};
    this.validateFieldsInElements(record.form.elements, record, formValues, errors, cache);
    return errors;
  };

  FeatureValidator.validateRepeatableItem = function validateRepeatableItem(repeatableItem, record, formValues) {
    if (repeatableItem == null) {
      return [];
    }

    var errors = [];

    if (repeatableItem.element.isGeometryRequired) {
      if (!repeatableItem.hasCoordinate) {
        errors.push(new _geometryRequiredValidationError["default"]());
      }
    }

    var cache = {};
    FeatureValidator.validateFieldsInElements(repeatableItem.element.elements, record, formValues, errors, cache);
    return errors;
  };

  FeatureValidator.validateFieldsInElements = function validateFieldsInElements(elements, record, formValues, errors, visibilityCache) {
    var cache = visibilityCache || {};

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

      if (element.isSectionElement) {
        var visible = _condition["default"].shouldElementBeVisible(element, record, formValues, cache);

        if (visible) {
          FeatureValidator.validateFieldsInElements(element.elements, record, formValues, errors, cache);
        }
      } else {
        var required = _condition["default"].shouldElementBeRequired(element, record, formValues);

        var _visible = _condition["default"].shouldElementBeVisible(element, record, formValues, cache);

        var disabled = element.isDisabled;
        var validatable = _visible && !disabled;

        if (validatable) {
          if (required) {
            var fieldValue = formValues.get(element.key);
            var error = FeatureValidator.validateRequiredField(element, fieldValue);

            if (error) {
              errors.push(error);
            }
          }

          if (element.isTextElement) {
            if (element.isNumeric) {
              var textValue = formValues.get(element.key);

              var _error = FeatureValidator.validateNumericField(element, textValue);

              if (_error) {
                errors.push(_error);
              }
            } else if (element.hasPattern) {
              var _textValue = formValues.get(element.key);

              var _error2 = FeatureValidator.validatePatternOfElement(element, _textValue);

              if (_error2) {
                errors.push(_error2);
              }
            }
          }

          if (element.isDateElement) {
            var _error3 = FeatureValidator.validateDateField(element, formValues.get(element.key));

            if (_error3) {
              errors.push(_error3);
            }
          }

          if (element.isTimeElement) {
            var _error4 = FeatureValidator.validateTimeField(element, formValues.get(element.key));

            if (_error4) {
              errors.push(_error4);
            }
          }

          if (element.isLengthValidationSupported) {
            var _fieldValue = formValues.get(element.key);

            var _error5 = FeatureValidator.validateLengthForElement(element, _fieldValue);

            if (_error5) {
              errors.push(_error5);
            }
          }
        }

        if (element.isRepeatableElement) {
          var repeatableValue = formValues.get(element.key);

          if (repeatableValue) {
            for (var _iterator2 = repeatableValue.items, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var item = _ref2;
              var itemValues = item.formValues.copy();
              itemValues.merge(formValues);
              FeatureValidator.validateFieldsInElements(item.element.elements, record, itemValues, errors, null);
            }
          }
        }
      }
    }
  };

  FeatureValidator.validateRequiredField = function validateRequiredField(element, value) {
    if (value == null || value.isEmpty) {
      return new _requiredFieldValidationError["default"](element);
    }

    if (element.isCheckboxElement && !value.isChecked) {
      return new _requiredFieldValidationError["default"](element);
    }

    return null;
  };

  FeatureValidator.validatePatternOfElement = function validatePatternOfElement(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    var regex = new RegExp('^(?:' + element.pattern + ')$');

    if (regex) {
      if (!regex.test(value.textValue)) {
        return new _patternValidationError["default"](element);
      }
    }

    return null;
  };

  FeatureValidator.validateLengthForElement = function validateLengthForElement(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    var hasMinLengthError = false;
    var hasMaxLengthError = false;

    if (element.hasMinLength) {
      hasMinLengthError = value.length < element.minLength;
    }

    if (element.hasMaxLength) {
      hasMaxLengthError = value.length > element.maxLength;
    }

    if (hasMinLengthError || hasMaxLengthError) {
      return new _lengthValidationError["default"](element);
    }

    return null;
  };

  FeatureValidator.validateNumericField = function validateNumericField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isNumeric) {
      return new _numericFormatValidationError["default"](element);
    } // since the number is now normalized to en_US, check for the . separator


    var decimalSeparator = '.';

    if (element.isIntegerFormat) {
      if (value.textValue.indexOf(decimalSeparator) > -1) {
        return new _numericFormatValidationError["default"](element);
      }
    }

    var numberValue = +value.textValue;

    if (element.hasMin && numberValue < element.min || element.hasMax && numberValue > element.max) {
      return new _numericRangeValidationError["default"](element);
    }

    return null;
  };

  FeatureValidator.validateDateField = function validateDateField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isValid) {
      return new _dateFormatValidationError["default"](element);
    }

    return null;
  };

  FeatureValidator.validateTimeField = function validateTimeField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isValid) {
      return new _timeFormatValidationError["default"](element);
    }

    return null;
  };

  FeatureValidator.formatErrors = function formatErrors(errors) {
    var messages = [];

    for (var _iterator3 = errors, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var error = _ref3;
      messages.push(error.message);
    }

    return messages.join('\n\n');
  };

  return FeatureValidator;
}();

exports["default"] = FeatureValidator;
//# sourceMappingURL=feature-validator.js.map