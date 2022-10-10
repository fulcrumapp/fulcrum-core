"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _dateUtils = _interopRequireDefault(require("../utils/date-utils"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _async = _interopRequireDefault(require("async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NOW = 'now';

var DefaultValues =
/*#__PURE__*/
function () {
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
        for (var _iterator = recordLinkElement.recordDefaults, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var recordDefault = _ref;
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
    for (var _iterator2 = elements, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var element = _ref2;

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

    for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var element = _ref3;

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