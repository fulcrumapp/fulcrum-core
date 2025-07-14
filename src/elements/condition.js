import TextUtils from '../utils/text-utils';

export default class Condition {
  constructor(element, attributes) {
    this.element = element;
    this.fieldKey = attributes.field_key;
    this.operator = attributes.operator;
    this.value = attributes.value;
  }

  static isEqual(formValue, stringValue) {
    if (formValue == null) {
      return TextUtils.isEmpty(stringValue);
    }
    return formValue.isEqual(stringValue);
  }

  static isEmpty(formValue) {
    return formValue == null || formValue.isEmpty;
  }

  static contains(formValue, stringValue) {
    if (formValue == null) {
      return TextUtils.isEmpty(stringValue);
    }
    return formValue.contains(stringValue);
  }

  static startsWith(formValue, stringValue) {
    if (formValue == null) {
      return TextUtils.isEmpty(stringValue);
    }
    return formValue.startsWith(stringValue);
  }

  static isLessThan(formValue, stringValue) {
    if (formValue == null) {
      return TextUtils.isEmpty(stringValue);
    }
    return formValue.isLessThan(stringValue);
  }

  static isGreaterThan(formValue, stringValue) {
    if (formValue == null) {
      return TextUtils.isEmpty(stringValue);
    }
    return formValue.isGreaterThan(stringValue);
  }

  static shouldElementBeVisible(element, record, values, visibilityCache) {
    if (visibilityCache != null && visibilityCache[element.key] != null) {
      return visibilityCache[element.key];
    }

    const cache = visibilityCache || {};

    let shouldBeVisible = Condition.shouldElementBeVisibleRecursive(element, record, values, cache);

    if (element.isSectionElement) {
      let hasVisibleChildren = false;

      for (const childElement of element.elements) {
        const visible = Condition.shouldElementBeVisibleRecursive(childElement, record, values, cache);

        if (visible) {
          hasVisibleChildren = true;
          break;
        }
      }

      shouldBeVisible = shouldBeVisible && hasVisibleChildren;
    }

    return shouldBeVisible;
  }

  static shouldElementBeVisibleRecursive(element, record, values, cache) {
    if (cache != null && cache[element.key] != null) {
      return cache[element.key];
    }

    // break circular conditions by assigning an early `true` value so if this
    // method is re-entered again for the same element before the recursion
    // ends, it early exits instead of blowing the stack
    cache[element.key] = true;

    // if the override value is set, always return it (SETHIDDEN() always wins)
    if (element.overrideIsHidden != null) {
      cache[element.key] = !element.isHidden;
      return !element.isHidden;
    }

    if (element.isHidden || element.hasHiddenParent) {
      cache[element.key] = false;
      return false;
    }

    let shouldBeVisible = false;

    if (!element.hasVisibilityConditions) {
      shouldBeVisible = true;
    }

    if (element.visibleConditionsType === 'any') {
      for (const condition of element.visibleConditions) {
        const isSatisfied = condition.isSatisfied(record, values, cache);

        if (isSatisfied) {
          shouldBeVisible = true;
          break;
        }
      }
    } else if (element.visibleConditionsType === 'all') {
      shouldBeVisible = true;

      for (const condition of element.visibleConditions) {
        const isSatisfied = condition.isSatisfied(record, values, cache);

        if (!isSatisfied) {
          shouldBeVisible = false;
        }
      }
    }

    // Make sure all parent elements are also visible according to these same rules.
    // If a section is hidden because of a rule, all child elements are implicitly hidden
    // and should return NO from this method. This makes it very easy to determine value relevance
    // by looking at only the field values without having to worry about Section elements and
    // dependencies. See clearInvisibleValuesWithConditionValues for usage of this method that
    // relies on this behavior.

    let parentsVisible = true;

    let iterator = element.parent;

    while (iterator != null) {
      const parentVisible = Condition.shouldElementBeVisibleRecursive(iterator, record, values, cache);

      if (!parentVisible) {
        parentsVisible = false;
        break;
      }

      iterator = iterator.parent;
    }

    const result = parentsVisible && shouldBeVisible;

    cache[element.key] = result;

    return result;
  }

  static shouldElementBeRequired(element, record, values) {
    // If there are no conditions, or if the override value is set, always return
    // the current required flag. (SETREQUIRED() always wins)
    if (!element.hasRequiredConditions || element.overrideIsRequired != null) {
      return element.isRequired;
    }

    const cache = {};

    let shouldBeRequired = false;

    if (element.requiredConditionsType === 'any') {
      for (const condition of element.requiredConditions) {
        const isSatisfied = condition.isSatisfied(record, values, cache);

        if (isSatisfied) {
          shouldBeRequired = true;
          break;
        }
      }
    } else if (element.requiredConditionsType === 'all') {
      shouldBeRequired = true;

      for (const condition of element.requiredConditions) {
        const isSatisfied = condition.isSatisfied(record, values, cache);

        if (!isSatisfied) {
          shouldBeRequired = false;
          break;
        }
      }
    }

    return shouldBeRequired;
  }

  static valueForCondition(condition, values, record) {
    if (condition.fieldKey === '@status') {
      return record.statusValue;
    }

    return values.get(condition.fieldKey);
  }

  static elementForCondition(condition, record) {
    if (condition.fieldKey === '@status') {
      return record.statusValue.element;
    }
    return record.form.elementsByKey[condition.fieldKey];
  }

  toJSON() {
    return {
      field_key: this.fieldKey,
      operator: this.operator,
      value: this.value
    };
  }

  isSatisfied(record, values, cache) {
    const referencedElement = Condition.elementForCondition(this, record);
    const valueShouldBePreserved = referencedElement?.visibleConditionsBehavior === 'preserve';

    let isReferencedFieldSatisfied = true;

    if (referencedElement != null) {
      // If the referenced element or one its parents is explicitly marked as hidden, it's a special
      // case and the referenced element should always be considered satisfied so that it's possible
      // to put conditions on hidden values. Also applies to elements hidden by visibility rules.
      const skipElement = referencedElement.isHidden
        || referencedElement.hasHiddenParent
        || (!(Condition.shouldElementBeVisible(referencedElement, record, values, cache)) && !valueShouldBePreserved);

      if (!skipElement) {
        isReferencedFieldSatisfied = Condition.shouldElementBeVisibleRecursive(referencedElement, record, values, cache);
      }
    }

    return this._isSatisfied(record, values, isReferencedFieldSatisfied);
  }

  _isSatisfied(record, values, isReferencedFieldSatisfied) {
    let formValue = null;

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
        return Condition.isGreaterThan(formValue, this.value);

      case 'less_than':
        return Condition.isLessThan(formValue, this.value);

      default:
        break;
    }

    return true;
  }
}
