'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Condition = (function () {
  function Condition(element, attributes) {
    _classCallCheck(this, Condition);

    this.element = element;
    this.fieldKey = attributes.field_key;
    this.operator = attributes.operator;
    this.value = attributes.value;
  }

  _createClass(Condition, [{
    key: 'isSatisfied',
    value: function isSatisfied(record, values, cache) {
      var referencedElement = Condition.elementForCondition(this, record);

      var isReferencedFieldSatisfied = true;

      if (referencedElement != null) {
        // If the referenced element or one its parents is explicitly marked as hidden, it's a special
        // case and the referenced element should always be considered satisfied so that it's possible
        // to put conditions on explicitly hidden values.

        var skipElement = referencedElement.hidden || referencedElement.hasHiddenParent;

        if (!skipElement) {
          isReferencedFieldSatisfied = Condition.shouldElementBeVisibleRecursive(referencedElement, record, values, cache);
        }
      }

      return this._isSatisfied(record, values, isReferencedFieldSatisfied);
    }
  }, {
    key: '_isSatisfied',
    value: function _isSatisfied(record, values, isReferencedFieldSatisfied) {
      var formValue = null;

      // if all of this field's conditions aren't also satisfied, treat the value as nil (empty). This has the same
      // effect as 'clearing' invisible values by treating them as blank when their conditions aren't met, regardless
      // of the actual preserved value in the field. If a field is invisible, its value is always nil with respect
      // to condition logic.

      if (isReferencedFieldSatisfied) {
        formValue = Condition.valueForCondition(this, values, record);
      }

      switch (this.operator) {
        case 'equal_to':
          return Condition.isEqual(formValue, this.value);

        case 'not_equal_to':
          return !Condition.isEqual(formValue, this.value);

        case 'is_empty':
          return Condition.isEmpty(formValue);

        case 'is_not_empty':
          return !Condition.isEmpty(formValue);

        case 'contains':
          return Condition.contains(formValue, this.value);

        case 'starts_with':
          return Condition.startsWith(formValue, this.value);

        case 'greater_than':
          return Condition.greaterThan(formValue, this.value);

        case 'less_than':
          return Condition.lessThan(formValue, this.value);

        default:
          break;
      }

      return true;
    }
  }], [{
    key: 'isEqual',
    value: function isEqual(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.isEqual(stringValue);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(formValue) {
      return formValue === null || formValue.isEmpty();
    }
  }, {
    key: 'contains',
    value: function contains(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.contains(stringValue);
    }
  }, {
    key: 'startsWith',
    value: function startsWith(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.startsWith(stringValue);
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.isLessThan(stringValue);
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.isGreaterThan(stringValue);
    }
  }, {
    key: 'shouldElementBeVisible',
    value: function shouldElementBeVisible(element, record, values, cache) {
      if (cache != null && cache[element.key] != null) {
        return cache[element.key];
      }

      cache = cache || {};

      var shouldBeVisible = Condition.shouldElementBeVisibleRecursive(element, record, values, cache);

      if (element.isSectionElement()) {
        var hasVisibleChildren = false;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = element.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var childElement = _step.value;

            var visible = Condition.shouldElementBeVisibleRecursive(childElement, record, values, cache);

            if (visible) {
              hasVisibleChildren = true;
              break;
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

        shouldBeVisible = shouldBeVisible && hasVisibleChildren;
      }

      return shouldBeVisible;
    }
  }, {
    key: 'shouldElementBeVisibleRecursive',
    value: function shouldElementBeVisibleRecursive(element, record, values, cache) {
      if (cache != null && cache[element.key] != null) {
        return cache[element.key];
      }

      // break circular conditions by assigning an early `true` value so if this
      // method is re-entered again for the same element before the recursion
      // ends, it early exits instead of blowing the stack
      cache[element.key] = true;

      if (element.hidden || element.hasHiddenParent) {
        cache[element.key] = false;
        return false;
      }

      var shouldBeVisible = false;

      if (!element.hasVisibilityConditions) {
        shouldBeVisible = true;
      }

      if (element.visibleConditionsType === 'any') {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = element.visibleConditions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var condition = _step2.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (isSatisfied) {
              shouldBeVisible = true;
              break;
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
      } else if (element.visibleConditionsType === 'all') {
        shouldBeVisible = true;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = element.visibleConditions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var condition = _step3.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (!isSatisfied) {
              shouldBeVisible = false;
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

      // Make sure all parent elements are also visible according to these same rules.
      // If a section is hidden because of a rule, all child elements are implicitly hidden
      // and should return NO from this method. This makes it very easy to determine value relevance
      // by looking at only the field values without having to worry about Section elements and
      // dependencies. See clearInvisibleValuesWithConditionValues for usage of this method that
      // relies on this behavior.

      var parentsVisible = true;

      var iterator = element.parent;

      while (iterator != null) {
        var parentVisible = Condition.shouldElementBeVisibleRecursive(iterator, record, values, cache);

        if (!parentVisible) {
          parentsVisible = false;
          break;
        }

        iterator = iterator.parent;
      }

      var result = parentsVisible && shouldBeVisible;

      cache[element.key] = result;

      return result;
    }
  }, {
    key: 'shouldElementBeRequired',
    value: function shouldElementBeRequired(element, record, values) {
      if (!element.hasRequiredConditions) {
        return element.required;
      }

      var cache = {};

      var shouldBeRequired = false;

      if (element.requiredConditionsType === 'any') {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = element.requiredConditions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var condition = _step4.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (isSatisfied) {
              shouldBeRequired = true;
              break;
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
      } else if (element.requiredConditionsType === 'all') {
        shouldBeRequired = true;

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = element.requiredConditions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var condition = _step5.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (!isSatisfied) {
              shouldBeRequired = false;
              break;
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      return shouldBeRequired;
    }
  }, {
    key: 'valueForCondition',
    value: function valueForCondition(condition, values, record) {
      if (condition.fieldKey === '@status') {
        return record.statusValue();
      }
      return values.getFormValue(condition.fieldKey);
    }
  }, {
    key: 'elementForCondition',
    value: function elementForCondition(condition, record) {
      if (condition.fieldKey === '@status') {
        return record.statusValue().statusElement;
      }
      return record.form.elementsByKey[condition.fieldKey];
    }
  }]);

  return Condition;
})();

exports.default = Condition;
//# sourceMappingURL=condition.js.map