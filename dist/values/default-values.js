"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _dateUtils = _interopRequireDefault(require("../utils/date-utils"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _async = _interopRequireDefault(require("async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var NOW = 'now';

var DefaultValues = /*#__PURE__*/function () {
  function DefaultValues() {}

  DefaultValues.applyDefaultValue = function applyDefaultValue(elementDefaultValue, element, formValues) {
    var defaultValue = elementDefaultValue;
    var value = formValues.get(element.key);
    var hasValue = value && !value.isEmpty;

    if (hasValue || defaultValue == null || defaultValue.length === 0) {
      return;
    }

    if (element.isDateElement && defaultValue === NOW) {
      defaultValue = _dateUtils["default"].formatDate(new Date());
    } else if (element.isTimeElement && defaultValue === NOW) {
      defaultValue = _dateUtils["default"].formatTime(new Date());
    }

    var fieldValue = formValues.createValueFromString(element, defaultValue);

    if (fieldValue) {
      formValues.set(element.key, fieldValue);
    }
  };

  DefaultValues.applyPreviousDefaults = function applyPreviousDefaults(dataSource, defaultValues, formValues, record, callback) {
    if (defaultValues == null) {
      return;
    }

    var elements = DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(formValues.elements, record.form);

    _async["default"].eachSeries(elements, function (element, next) {
      var previousDefaultAsJSON = defaultValues[element.key]; // the default completion is just to continue the loop

      var completion = next;

      if (previousDefaultAsJSON) {
        var fieldValue = formValues.createValue(element, previousDefaultAsJSON);
        var currentValue = record.get(element.key, formValues);
        var isCurrentlyEmpty = currentValue == null || currentValue.isEmpty;

        if (fieldValue && isCurrentlyEmpty) {
          record.set(element.key, fieldValue, formValues);

          if (element.isRecordLinkElement) {
            completion = function completion() {
              DefaultValues.applyDefaultValuesForRecordLinkValue(dataSource, fieldValue, formValues, record, next);
            };
          }
        }
      }

      completion();
    }, callback);
  };

  DefaultValues.applyDefaultValuesForRecordLinkValue = function applyDefaultValuesForRecordLinkValue(dataSource, recordLinkValue, formValues, record, callback) {
    var recordLinkElement = recordLinkValue.element;
    var itemValue = recordLinkValue.items[recordLinkValue.length - 1];

    var maybeLoadRecord = function maybeLoadRecord(itemValue, callback) {
      if (itemValue.record) {
        callback();
      } else {
        itemValue.load(dataSource, callback);
      }
    };

    maybeLoadRecord(itemValue, function () {
      var otherRecord = itemValue.record;

      if (otherRecord) {
        for (var _iterator = _createForOfIteratorHelperLoose(recordLinkElement.recordDefaults), _step; !(_step = _iterator()).done;) {
          var recordDefault = _step.value;
          var otherValue = otherRecord.get(recordDefault.sourceKey, otherRecord.formValues); // TODO(zhm) verify container here
          // FCMElement *newElement = [record.form elementByKey:recordDefault.destinationKey withinContainer:nil];

          var newElement = record.form.elementsByKey[recordDefault.destinationKey];

          if (newElement) {
            var newValue = formValues.createValueFromOtherValue(newElement, otherValue);

            if (newValue) {
              record.set(recordDefault.destinationKey, newValue, formValues);
            }
          }
        }
      }

      callback();
    });
  };

  DefaultValues.applyDefaultValueForElement = function applyDefaultValueForElement(element, formValues) {
    var defaultValue = element.defaultValue;

    if (defaultValue == null) {
      return;
    }

    DefaultValues.applyDefaultValue(defaultValue, element, formValues);
  };

  DefaultValues.applyDefaultValuesForElements = function applyDefaultValuesForElements(elements, formValues, record) {
    var hasStatusDefault = record.form.statusField && _textUtils["default"].isPresent(record.form.statusField.defaultValue) && record.form.statusField.isEnabled;

    if (hasStatusDefault && _textUtils["default"].isEmpty(record.status)) {
      record.status = record.form.statusField.defaultValue;
    }

    DefaultValues.applyDefaultValuesForElementsRecursive(elements, formValues);
  };

  DefaultValues.applyDefaultValuesForElementsRecursive = function applyDefaultValuesForElementsRecursive(elements, formValues) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(elements), _step2; !(_step2 = _iterator2()).done;) {
      var element = _step2.value;

      if (element.isSectionElement) {
        DefaultValues.applyDefaultValuesForElementsRecursive(element.elements, formValues);
      } else {
        DefaultValues.applyDefaultValueForElement(element, formValues);
      }
    }
  };

  DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements = function elementsWithPreviousDefaultsEnabledWithinElements(elements, form) {
    var results = [];

    if (form && form.statusField.isEnabled && form.statusField.isDefaultPreviousValueEnabled) {
      results.push(form.statusField);
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(elements), _step3; !(_step3 = _iterator3()).done;) {
      var element = _step3.value;

      if (element.isSectionElement) {
        // when recursing don't pass in the form, so the status field is only added once
        Array.prototype.push.apply(results, DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(element.elements, null));
      } else if (element.isDefaultPreviousValueEnabled) {
        results.push(element);
      }
    }

    return results;
  };

  return DefaultValues;
}();

exports["default"] = DefaultValues;
//# sourceMappingURL=default-values.js.map