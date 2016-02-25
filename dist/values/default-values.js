'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOW = 'now';

var DefaultValues = function () {
  function DefaultValues() {
    _classCallCheck(this, DefaultValues);
  }

  _createClass(DefaultValues, null, [{
    key: 'applyDefaultValue',
    value: function applyDefaultValue(defaultValue, element, formValues) {
      var value = formValues.get(element.key);

      var hasValue = value && !value.isEmpty;

      if (hasValue || defaultValue == null) {
        return;
      }

      if (element.isDateElement && defaultValue === NOW) {
        defaultValue = _dateUtils2.default.formatDate(new Date());
      } else if (element.isTimeElement && defaultValue === NOW) {
        defaultValue = _dateUtils2.default.formatTime(new Date());
      }

      var fieldValue = formValues.createValueFromString(element, defaultValue);

      if (fieldValue) {
        formValues.set(element.key, fieldValue);
      }
    }
  }, {
    key: 'applyPreviousDefaults',
    value: function applyPreviousDefaults(defaultValues, formValues, record) {
      if (defaultValues == null) {
        return;
      }

      var elements = DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(formValues.elements, record.form);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          var previousDefaultAsJSON = defaultValues[element.key];

          if (previousDefaultAsJSON) {
            var fieldValue = formValues.createValue(element, previousDefaultAsJSON);
            var currentValue = record.get(element.key, formValues);

            var isCurrentlyEmpty = currentValue == null || currentValue.isEmpty;

            if (fieldValue && isCurrentlyEmpty) {
              record.set(element.key, fieldValue, formValues);

              if (element.isRecordLinkElement) {
                DefaultValues.applyDefaultValuesForRecordLinkValue(fieldValue, formValues, record);
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
    key: 'applyDefaultValuesForRecordLinkValue',
    value: function applyDefaultValuesForRecordLinkValue(recordLinkValue, formValues, record) {
      var recordLinkElement = recordLinkValue.element;

      var itemValue = recordLinkValue.items[recordLinkValue.length - 1];

      // TODO(zhm) reload?
      // [itemValue.record reload];

      var otherRecord = itemValue.record;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = recordLinkElement.recordDefaults[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var recordDefault = _step2.value;

          var otherValue = otherRecord.get(recordDefault.sourceKey, otherRecord.formValues);

          // TODO(zhm) verify container here
          // FCMElement *newElement = [record.form elementByKey:recordDefault.destinationKey withinContainer:nil];
          var newElement = record.form.elementsByKey[recordDefault.destinationKey];

          if (newElement) {
            var newValue = formValues.createValueFromOtherValue(newElement, otherValue);

            if (newValue) {
              record.set(recordDefault.destinationKey, newValue, formValues);
            }
          }
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
  }, {
    key: 'applyDefaultValueForElement',
    value: function applyDefaultValueForElement(element, formValues) {
      var defaultValue = element.defaultValue;

      if (defaultValue == null) {
        return;
      }

      DefaultValues.applyDefaultValue(defaultValue, element, formValues);
    }
  }, {
    key: 'applyDefaultValuesForElements',
    value: function applyDefaultValuesForElements(elements, formValues, record) {
      var hasStatusDefault = record.form.statusField && _textUtils2.default.isPresent(record.form.statusField.defaultValue) && record.form.statusField.isEnabled;

      if (hasStatusDefault && _textUtils2.default.isEmpty(record.status)) {
        record.status = record.form.statusField.defaultValue;
      }

      DefaultValues.applyDefaultValuesForElementsRecursive(elements, formValues);
    }
  }, {
    key: 'applyDefaultValuesForElementsRecursive',
    value: function applyDefaultValuesForElementsRecursive(elements, formValues) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var element = _step3.value;

          if (element.isSectionElement) {
            DefaultValues.applyDefaultValuesForElementsRecursive(element.elements, formValues);
          } else {
            DefaultValues.applyDefaultValueForElement(element, formValues);
          }
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
    }
  }, {
    key: 'elementsWithPreviousDefaultsEnabledWithinElements',
    value: function elementsWithPreviousDefaultsEnabledWithinElements(elements, form) {
      var results = [];

      if (form && form.statusField.isEnabled && form.statusField.isDefaultPreviousValueEnabled) {
        results.push(form.statusField);
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = elements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var element = _step4.value;

          if (element.isSectionElement) {
            // when recursing don't pass in the form, so the status field is only added once
            Array.prototype.push.apply(results, DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(element.elements, null));
          } else if (element.isDefaultPreviousValueEnabled) {
            results.push(element);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return results;
    }
  }]);

  return DefaultValues;
}();

exports.default = DefaultValues;
//# sourceMappingURL=default-values.js.map