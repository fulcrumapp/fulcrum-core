'use strict';

exports.__esModule = true;

var _repeatableItemValue = require('../values/repeatable-item-value');

var _repeatableItemValue2 = _interopRequireDefault(_repeatableItemValue);

var _record = require('../record');

var _record2 = _interopRequireDefault(_record);

var _condition = require('../elements/condition');

var _condition2 = _interopRequireDefault(_condition);

var _requiredFieldValidationError = require('./required-field-validation-error');

var _requiredFieldValidationError2 = _interopRequireDefault(_requiredFieldValidationError);

var _geometryRequiredValidationError = require('./geometry-required-validation-error');

var _geometryRequiredValidationError2 = _interopRequireDefault(_geometryRequiredValidationError);

var _patternValidationError = require('./pattern-validation-error');

var _patternValidationError2 = _interopRequireDefault(_patternValidationError);

var _lengthValidationError = require('./length-validation-error');

var _lengthValidationError2 = _interopRequireDefault(_lengthValidationError);

var _numericFormatValidationError = require('./numeric-format-validation-error');

var _numericFormatValidationError2 = _interopRequireDefault(_numericFormatValidationError);

var _numericRangeValidationError = require('./numeric-range-validation-error');

var _numericRangeValidationError2 = _interopRequireDefault(_numericRangeValidationError);

var _dateFormatValidationError = require('./date-format-validation-error');

var _dateFormatValidationError2 = _interopRequireDefault(_dateFormatValidationError);

var _timeFormatValidationError = require('./time-format-validation-error');

var _timeFormatValidationError2 = _interopRequireDefault(_timeFormatValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeatureValidator = function () {
  function FeatureValidator() {
    _classCallCheck(this, FeatureValidator);
  }

  FeatureValidator.validateFeature = function validateFeature(feature, record, formValues) {
    if (feature instanceof _record2.default) {
      return FeatureValidator.validateRecord(record, formValues);
    } else if (feature instanceof _repeatableItemValue2.default) {
      return FeatureValidator.validateRepeatableItem(feature, record, formValues);
    }

    return [];
  };

  FeatureValidator.validateRecord = function validateRecord(record, formValues) {
    if (record == null) {
      return [];
    }

    var errors = [];

    if (record.isStatusFieldEnabled && record.status == null) {
      errors.push(new _requiredFieldValidationError2.default(record.form.statusField));
    }

    if (record.form.isGeometryRequired) {
      if (!record.hasCoordinate) {
        errors.push(new _geometryRequiredValidationError2.default());
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
        errors.push(new _geometryRequiredValidationError2.default());
      }
    }

    var cache = {};

    FeatureValidator.validateFieldsInElements(repeatableItem.element.elements, record, formValues, errors, cache);

    return errors;
  };

  FeatureValidator.validateFieldsInElements = function validateFieldsInElements(elements, record, formValues, errors, cache) {
    if (!cache) {
      cache = {};
    }

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
        var visible = _condition2.default.shouldElementBeVisible(element, record, formValues, cache);

        if (visible) {
          FeatureValidator.validateFieldsInElements(element.elements, record, formValues, errors, cache);
        }
      } else {
        var required = _condition2.default.shouldElementBeRequired(element, record, formValues);
        var _visible = _condition2.default.shouldElementBeVisible(element, record, formValues, cache);

        var disabled = element.isDisabled;

        var validatable = _visible && !disabled;

        if (validatable) {
          if (required) {
            var fieldValue = formValues.get(element.key);

            if (fieldValue == null || fieldValue.isEmpty) {
              errors.push(new _requiredFieldValidationError2.default(element));
            }
          }

          if (element.isTextElement) {
            if (element.isNumeric) {
              var textValue = formValues.get(element.key);

              var error = FeatureValidator.validateNumericField(element, textValue);

              if (error) {
                errors.push(error);
              }
            } else if (element.hasPattern) {
              var _textValue = formValues.get(element.key);

              var _error = FeatureValidator.validatePatternOfElement(element, _textValue);

              if (_error) {
                errors.push(_error);
              }
            }
          }

          if (element.isDateElement) {
            var _error2 = FeatureValidator.validateDateField(element, formValues.get(element.key));

            if (_error2) {
              errors.push(_error2);
            }
          }

          if (element.isTimeElement) {
            var _error3 = FeatureValidator.validateTimeField(element, formValues.get(element.key));

            if (_error3) {
              errors.push(_error3);
            }
          }

          if (element.isLengthValidationSupported) {
            var _fieldValue = formValues.get(element.key);
            var _error4 = FeatureValidator.validateLengthForElement(element, _fieldValue);

            if (_error4) {
              errors.push(_error4);
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

  FeatureValidator.validatePatternOfElement = function validatePatternOfElement(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    var regex = new RegExp(element.pattern);

    if (regex) {
      if (!regex.test(value.textValue)) {
        return new _patternValidationError2.default(element);
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
      return new _lengthValidationError2.default(element);
    }

    return null;
  };

  FeatureValidator.validateNumericField = function validateNumericField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isNumeric) {
      return new _numericFormatValidationError2.default(element);
    }

    // since the number is now normalized to en_US, check for the . separator
    var decimalSeparator = '.';

    if (element.isIntegerFormat) {
      if (value.textValue.indexOf(decimalSeparator) > -1) {
        return new _numericFormatValidationError2.default(element);
      }
    }

    var numberValue = +value.textValue;

    if (element.hasMin && numberValue < element.min || element.hasMax && numberValue > element.max) {
      return new _numericRangeValidationError2.default(element);
    }

    return null;
  };

  FeatureValidator.validateDateField = function validateDateField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isValid) {
      return new _dateFormatValidationError2.default(element);
    }

    return null;
  };

  FeatureValidator.validateTimeField = function validateTimeField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isValid) {
      return new _timeFormatValidationError2.default(element);
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

exports.default = FeatureValidator;
//# sourceMappingURL=feature-validator.js.map