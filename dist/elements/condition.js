"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Condition =
/*#__PURE__*/
function () {
  function Condition(element, attributes) {
    this.element = element;
    this.fieldKey = attributes.field_key;
    this.operator = attributes.operator;
    this.value = attributes.value;
  }

  Condition.isEqual = function isEqual(formValue, stringValue) {
    if (formValue == null) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    return formValue.isEqual(stringValue);
  };

  Condition.isEmpty = function isEmpty(formValue) {
    return formValue == null || formValue.isEmpty;
  };

  Condition.contains = function contains(formValue, stringValue) {
    if (formValue == null) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    return formValue.contains(stringValue);
  };

  Condition.startsWith = function startsWith(formValue, stringValue) {
    if (formValue == null) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    return formValue.startsWith(stringValue);
  };

  Condition.isLessThan = function isLessThan(formValue, stringValue) {
    if (formValue == null) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    return formValue.isLessThan(stringValue);
  };

  Condition.isGreaterThan = function isGreaterThan(formValue, stringValue) {
    if (formValue == null) {
      return _textUtils["default"].isEmpty(stringValue);
    }

    return formValue.isGreaterThan(stringValue);
  };

  Condition.shouldElementBeVisible = function shouldElementBeVisible(element, record, values, visibilityCache) {
    if (visibilityCache != null && visibilityCache[element.key] != null) {
      return visibilityCache[element.key];
    }

    var cache = visibilityCache || {};
    var shouldBeVisible = Condition.shouldElementBeVisibleRecursive(element, record, values, cache);

    if (element.isSectionElement) {
      var hasVisibleChildren = false;

      for (var _iterator = element.elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var childElement = _ref;
        var visible = Condition.shouldElementBeVisibleRecursive(childElement, record, values, cache);

        if (visible) {
          hasVisibleChildren = true;
          break;
        }
      }

      shouldBeVisible = shouldBeVisible && hasVisibleChildren;
    }

    return shouldBeVisible;
  };

  Condition.shouldElementBeVisibleRecursive = function shouldElementBeVisibleRecursive(element, record, values, cache) {
    if (cache != null && cache[element.key] != null) {
      return cache[element.key];
    } // break circular conditions by assigning an early `true` value so if this
    // method is re-entered again for the same element before the recursion
    // ends, it early exits instead of blowing the stack


    cache[element.key] = true; // if the override value is set, always return it (SETHIDDEN() always wins)

    if (element.overrideIsHidden != null) {
      cache[element.key] = !element.isHidden;
      return !element.isHidden;
    }

    if (element.isHidden || element.hasHiddenParent) {
      cache[element.key] = false;
      return false;
    }

    var shouldBeVisible = false;

    if (!element.hasVisibilityConditions) {
      shouldBeVisible = true;
    }

    if (element.visibleConditionsType === 'any') {
      for (var _iterator2 = element.visibleConditions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var condition = _ref2;
        var isSatisfied = condition.isSatisfied(record, values, cache);

        if (isSatisfied) {
          shouldBeVisible = true;
          break;
        }
      }
    } else if (element.visibleConditionsType === 'all') {
      shouldBeVisible = true;

      for (var _iterator3 = element.visibleConditions, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var _condition = _ref3;

        var _isSatisfied2 = _condition.isSatisfied(record, values, cache);

        if (!_isSatisfied2) {
          shouldBeVisible = false;
        }
      }
    } // Make sure all parent elements are also visible according to these same rules.
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
  };

  Condition.shouldElementBeRequired = function shouldElementBeRequired(element, record, values) {
    // If there are no conditions, or if the override value is set, always return
    // the current required flag. (SETREQUIRED() always wins)
    if (!element.hasRequiredConditions || element.overrideIsRequired != null) {
      return element.isRequired;
    }

    var cache = {};
    var shouldBeRequired = false;

    if (element.requiredConditionsType === 'any') {
      for (var _iterator4 = element.requiredConditions, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var condition = _ref4;
        var isSatisfied = condition.isSatisfied(record, values, cache);

        if (isSatisfied) {
          shouldBeRequired = true;
          break;
        }
      }
    } else if (element.requiredConditionsType === 'all') {
      shouldBeRequired = true;

      for (var _iterator5 = element.requiredConditions, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref5 = _i5.value;
        }

        var _condition2 = _ref5;

        var _isSatisfied3 = _condition2.isSatisfied(record, values, cache);

        if (!_isSatisfied3) {
          shouldBeRequired = false;
          break;
        }
      }
    }

    return shouldBeRequired;
  };

  Condition.valueForCondition = function valueForCondition(condition, values, record) {
    if (condition.fieldKey === '@status') {
      return record.statusValue;
    }

    return values.get(condition.fieldKey);
  };

  Condition.elementForCondition = function elementForCondition(condition, record) {
    if (condition.fieldKey === '@status') {
      return record.statusValue.element;
    }

    return record.form.elementsByKey[condition.fieldKey];
  };

  var _proto = Condition.prototype;

  _proto.isSatisfied = function isSatisfied(record, values, cache) {
    var referencedElement = Condition.elementForCondition(this, record);
    var isReferencedFieldSatisfied = true;

    if (referencedElement != null) {
      // If the referenced element or one its parents is explicitly marked as hidden, it's a special
      // case and the referenced element should always be considered satisfied so that it's possible
      // to put conditions on explicitly hidden values.
      var skipElement = referencedElement.isHidden || referencedElement.hasHiddenParent;

      if (!skipElement) {
        isReferencedFieldSatisfied = Condition.shouldElementBeVisibleRecursive(referencedElement, record, values, cache);
      }
    }

    return this._isSatisfied(record, values, isReferencedFieldSatisfied);
  };

  _proto._isSatisfied = function _isSatisfied(record, values, isReferencedFieldSatisfied) {
    var formValue = null; // if all of this field's conditions aren't also satisfied, treat the value as nil (empty). This has the same
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
        return Condition.isGreaterThan(formValue, this.value);

      case 'less_than':
        return Condition.isLessThan(formValue, this.value);

      default:
        break;
    }

    return true;
  };

  return Condition;
}();

exports["default"] = Condition;
//# sourceMappingURL=condition.js.map