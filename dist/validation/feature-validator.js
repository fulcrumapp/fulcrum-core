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
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var FeatureValidator = /*#__PURE__*/function () {
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
    for (var _iterator = _createForOfIteratorHelperLoose(elements), _step; !(_step = _iterator()).done;) {
      var element = _step.value;
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
            for (var _iterator2 = _createForOfIteratorHelperLoose(repeatableValue.items), _step2; !(_step2 = _iterator2()).done;) {
              var item = _step2.value;
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
    }

    // since the number is now normalized to en_US, check for the . separator
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
    for (var _iterator3 = _createForOfIteratorHelperLoose(errors), _step3; !(_step3 = _iterator3()).done;) {
      var error = _step3.value;
      messages.push(error.message);
    }
    return messages.join('\n\n');
  };
  return FeatureValidator;
}();
exports["default"] = FeatureValidator;
//# sourceMappingURL=feature-validator.js.map