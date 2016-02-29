'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeatureValidator = function () {
  function FeatureValidator() {
    _classCallCheck(this, FeatureValidator);
  }

  _createClass(FeatureValidator, null, [{
    key: 'validateFeature',
    value: function validateFeature(feature, record, formValues) {
      if (feature instanceof _record2.default) {
        return FeatureValidator.validateRecord(record, formValues);
      } else if (feature instanceof _repeatableItemValue2.default) {
        return FeatureValidator.validateRepeatableItem(feature, record, formValues);
      }

      return [];
    }
  }, {
    key: 'validateRecord',
    value: function validateRecord(record, formValues) {
      if (record == null) {
        return [];
      }

      var errors = [];

      if (record.isStatusFieldEnabled && record.status == null) {
        errors.push(new _requiredFieldValidationError2.default(record.form.statusField.label));
      }

      if (record.form.isGeometryRequired) {
        if (!record.hasCoordinate) {
          errors.push(new _geometryRequiredValidationError2.default());
        }
      }

      var cache = {};

      this.validateFieldsInElements(record.form.elements, record, formValues, errors, cache);

      return errors;
    }
  }, {
    key: 'validateRepeatableItem',
    value: function validateRepeatableItem(repeatableItem, record, formValues) {
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
    }
  }, {
    key: 'validateFieldsInElements',
    value: function validateFieldsInElements(elements, record, formValues, errors, cache) {
      if (!cache) {
        cache = {};
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (element.isSectionElement) {
            var visible = _condition2.default.shouldElementBeVisible(element, record, formValues, cache);

            if (visible) {
              FeatureValidator.validateFieldsInElements(element.elements, record, formValues, errors, cache);
            }
          } else {
            var required = _condition2.default.shouldElementBeRequired(element, record, formValues);
            var visible = _condition2.default.shouldElementBeVisible(element, record, formValues, cache);

            var disabled = element.isDisabled;

            var validatable = visible && !disabled;

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
                  var textValue = formValues.get(element.key);

                  var error = FeatureValidator.validatePatternOfElement(element, textValue);

                  if (error) {
                    errors.push(error);
                  }
                }
              }

              if (element.isLengthValidationSupported) {
                var fieldValue = formValues.get(element.key);
                var error = FeatureValidator.validateLengthForElement(element, fieldValue);

                if (error) {
                  errors.push(error);
                }
              }
            }

            if (element.isRepeatableElement) {
              var repeatableValue = formValues.get(element.key);

              if (repeatableValue) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = repeatableValue.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    var itemValues = item.formValues.copy();

                    itemValues.merge(formValues);

                    FeatureValidator.validateFieldsInElements(item.element.elements, record, itemValues, errors, null);
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'validatePatternOfElement',
    value: function validatePatternOfElement(element, value) {
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
    }
  }, {
    key: 'validateLengthForElement',
    value: function validateLengthForElement(element, value) {
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
    }
  }, {
    key: 'validateNumericField',
    value: function validateNumericField(element, value) {
      if (value == null || value.isEmpty) {
        return null;
      }

      if (!value.isNumeric) {
        return new _numericFormatValidationError2.default(element);
      }

      // since the number is now normalized to en_US, check for the . separator
      var decimalSeparator = '.';

      if (element.isInteger) {
        if (value.indexOf(decimalSeparator) > -1) {
          return new _numericFormatValidationError2.default(element);
        }
      }

      var numberValue = +value.textValue;

      if (numberValue < element.min || numberValue > element.max) {
        return new _numericRangeValidationError2.default(element);
      }

      return null;
    }
  }, {
    key: 'formatErrors',
    value: function formatErrors(errors) {
      var messages = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = errors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var error = _step3.value;

          messages.push(error.message);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      messages.join('\n\n');
    }
  }]);

  return FeatureValidator;
}();

exports.default = FeatureValidator;
//# sourceMappingURL=feature-validator.js.map