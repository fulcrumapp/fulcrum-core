import DateUtils from '../utils/date-utils';
import TextUtils from '../utils/text-utils';

const NOW = 'now';

export default class DefaultValues {
  static applyDefaultValue(defaultValue, element, formValues) {
    const value = formValues.get(element.key);

    const hasValue = value && !value.isEmpty;

    if (hasValue || defaultValue == null) {
      return;
    }

    if (element.isDateElement && defaultValue === NOW) {
      defaultValue = DateUtils.formatDate(new Date());
    } else if (element.isTimeElement && defaultValue === NOW) {
      defaultValue = DateUtils.formatTime(new Date());
    }

    const fieldValue = formValues.createValueFromString(element, defaultValue);

    if (fieldValue) {
      formValues.set(element.key, fieldValue);
    }
  }

  static applyPreviousDefaults(defaultValues, formValues, record) {
    if (defaultValues == null) {
      return;
    }

    const elements = DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(formValues.elements, record.form);

    for (const element of elements) {
      const previousDefaultAsJSON = defaultValues[element.key];

      if (previousDefaultAsJSON) {
        const fieldValue = formValues.createValue(element, previousDefaultAsJSON);
        const currentValue = record.get(element.key, formValues);

        const isCurrentlyEmpty = (currentValue == null || currentValue.isEmpty);

        if (fieldValue && isCurrentlyEmpty) {
          record.set(element.key, fieldValue, formValues);

          if (element.isRecordLinkElement) {
            DefaultValues.applyDefaultValuesForRecordLinkValue(fieldValue, formValues, record);
          }
        }
      }
    }
  }

  static applyDefaultValuesForRecordLinkValue(recordLinkValue, formValues, record) {
    const recordLinkElement = recordLinkValue.element;

    const itemValue = recordLinkValue.items[recordLinkValue.length - 1];

    // TODO(zhm) reload?
    // [itemValue.record reload];

    const otherRecord = itemValue.record;

    for (const recordDefault of recordLinkElement.recordDefaults) {
      const otherValue = otherRecord.get(recordDefault.sourceKey, otherRecord.formValues);

      // TODO(zhm) verify container here
      // FCMElement *newElement = [record.form elementByKey:recordDefault.destinationKey withinContainer:nil];
      const newElement = record.form.elementsByKey[recordDefault.destinationKey];

      if (newElement) {
        const newValue = formValues.createValueFromOtherValue(newElement, otherValue);

        if (newValue) {
          record.set(recordDefault.destinationKey, newValue, formValues);
        }
      }
    }
  }

  static applyDefaultValueForElement(element, formValues) {
    const defaultValue = element.defaultValue;

    if (defaultValue == null) {
      return;
    }

    DefaultValues.applyDefaultValue(defaultValue, element, formValues);
  }

  static applyDefaultValuesForElements(elements, formValues, record) {
    const hasStatusDefault = (record.form.statusField &&
                              TextUtils.isPresent(record.form.statusField.defaultValue) &&
                              record.form.statusField.isEnabled);

    if (hasStatusDefault && TextUtils.isEmpty(record.status)) {
      record.status = record.form.statusField.defaultValue;
    }

    DefaultValues.applyDefaultValuesForElementsRecursive(elements, formValues);
  }

  static applyDefaultValuesForElementsRecursive(elements, formValues) {
    for (const element of elements) {
      if (element.isSectionElement) {
        DefaultValues.applyDefaultValuesForElementsRecursive(element.elements, formValues);
      } else {
        DefaultValues.applyDefaultValueForElement(element, formValues);
      }
    }
  }

  static elementsWithPreviousDefaultsEnabledWithinElements(elements, form) {
    const results = [];

    if (form && form.statusField.isEnabled && form.statusField.isDefaultPreviousValueEnabled) {
      results.push(form.statusField);
    }

    for (const element of elements) {
      if (element.isSectionElement) {
        // when recursing don't pass in the form, so the status field is only added once
        Array.prototype.push.apply(results, DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(element.elements, null));
      } else if (element.isDefaultPreviousValueEnabled) {
        results.push(element);
      }
    }

    return results;
  }
}
