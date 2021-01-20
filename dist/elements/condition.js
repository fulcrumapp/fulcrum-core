"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Condition = /*#__PURE__*/function () {
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

      for (var _iterator = _createForOfIteratorHelperLoose(element.elements), _step; !(_step = _iterator()).done;) {
        var childElement = _step.value;
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
      for (var _iterator2 = _createForOfIteratorHelperLoose(element.visibleConditions), _step2; !(_step2 = _iterator2()).done;) {
        var condition = _step2.value;
        var isSatisfied = condition.isSatisfied(record, values, cache);

        if (isSatisfied) {
          shouldBeVisible = true;
          break;
        }
      }
    } else if (element.visibleConditionsType === 'all') {
      shouldBeVisible = true;

      for (var _iterator3 = _createForOfIteratorHelperLoose(element.visibleConditions), _step3; !(_step3 = _iterator3()).done;) {
        var _condition = _step3.value;

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
      for (var _iterator4 = _createForOfIteratorHelperLoose(element.requiredConditions), _step4; !(_step4 = _iterator4()).done;) {
        var condition = _step4.value;
        var isSatisfied = condition.isSatisfied(record, values, cache);

        if (isSatisfied) {
          shouldBeRequired = true;
          break;
        }
      }
    } else if (element.requiredConditionsType === 'all') {
      shouldBeRequired = true;

      for (var _iterator5 = _createForOfIteratorHelperLoose(element.requiredConditions), _step5; !(_step5 = _iterator5()).done;) {
        var _condition2 = _step5.value;

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