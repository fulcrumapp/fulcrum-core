import RepeatableItemValue from '../values/repeatable-item-value';
import Record from '../record';
import Condition from '../elements/condition';
import RequiredFieldValidationError from './required-field-validation-error';
import GeometryRequiredValidationError from './geometry-required-validation-error';
import PatternValidationError from './pattern-validation-error';
import LengthValidationError from './length-validation-error';
import NumericFormatValidationError from './numeric-format-validation-error';
import NumericRangeValidationError from './numeric-range-validation-error';
import DateFormatValidationError from './date-format-validation-error';
import TimeFormatValidationError from './time-format-validation-error';

export default class FeatureValidator {
  static validateFeature(feature, record, formValues) {
    if (feature instanceof Record) {
      return FeatureValidator.validateRecord(record, formValues);
    } else if (feature instanceof RepeatableItemValue) {
      return FeatureValidator.validateRepeatableItem(feature, record, formValues);
    }

    return [];
  }

  static validateRecord(record, formValues) {
    if (record == null) {
      return [];
    }

    const errors = [];

    if (record.isStatusFieldEnabled && record.status == null) {
      errors.push(new RequiredFieldValidationError(record.form.statusField));
    }

    if (record.form.isGeometryRequired) {
      if (!record.hasCoordinate) {
        errors.push(new GeometryRequiredValidationError());
      }
    }

    const cache = {};

    this.validateFieldsInElements(record.form.elements, record, formValues, errors, cache);

    return errors;
  }

  static validateRepeatableItem(repeatableItem, record, formValues) {
    if (repeatableItem == null) {
      return [];
    }

    const errors = [];

    if (repeatableItem.element.isGeometryRequired) {
      if (!repeatableItem.hasCoordinate) {
        errors.push(new GeometryRequiredValidationError());
      }
    }

    const cache = {};

    FeatureValidator.validateFieldsInElements(repeatableItem.element.elements, record, formValues, errors, cache);

    return errors;
  }

  static validateFieldsInElements(elements, record, formValues, errors, cache) {
    if (!cache) {
      cache = {};
    }

    for (const element of elements) {
      if (element.isSectionElement) {
        const visible = Condition.shouldElementBeVisible(element, record, formValues, cache);

        if (visible) {
          FeatureValidator.validateFieldsInElements(element.elements, record, formValues, errors, cache);
        }
      } else {
        const required = Condition.shouldElementBeRequired(element, record, formValues);
        const visible = Condition.shouldElementBeVisible(element, record, formValues, cache);

        const disabled = element.isDisabled;

        const validatable = (visible && !disabled);

        if (validatable) {
          if (required) {
            const fieldValue = formValues.get(element.key);

            if (fieldValue == null || fieldValue.isEmpty) {
              errors.push(new RequiredFieldValidationError(element));
            }
          }

          if (element.isTextElement) {
            if (element.isNumeric) {
              const textValue = formValues.get(element.key);

              const error = FeatureValidator.validateNumericField(element, textValue);

              if (error) {
                errors.push(error);
              }
            } else if (element.hasPattern) {
              const textValue = formValues.get(element.key);

              const error = FeatureValidator.validatePatternOfElement(element, textValue);

              if (error) {
                errors.push(error);
              }
            }
          }

          if (element.isDateElement) {
            const error = FeatureValidator.validateDateField(element, formValues.get(element.key));

            if (error) {
              errors.push(error);
            }
          }

          if (element.isTimeElement) {
            const error = FeatureValidator.validateTimeField(element, formValues.get(element.key));

            if (error) {
              errors.push(error);
            }
          }

          if (element.isLengthValidationSupported) {
            const fieldValue = formValues.get(element.key);
            const error = FeatureValidator.validateLengthForElement(element, fieldValue);

            if (error) {
              errors.push(error);
            }
          }
        }

        if (element.isRepeatableElement) {
          const repeatableValue = formValues.get(element.key);

          if (repeatableValue) {
            for (const item of repeatableValue.items) {
              const itemValues = item.formValues.copy();

              itemValues.merge(formValues);

              FeatureValidator.validateFieldsInElements(item.element.elements, record, itemValues, errors, null);
            }
          }
        }
      }
    }
  }

  static validatePatternOfElement(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    const regex = new RegExp(element.pattern);

    if (regex) {
      if (!regex.test(value.textValue)) {
        return new PatternValidationError(element);
      }
    }

    return null;
  }

  static validateLengthForElement(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    let hasMinLengthError = false;
    let hasMaxLengthError = false;

    if (element.hasMinLength) {
      hasMinLengthError = (value.length < element.minLength);
    }

    if (element.hasMaxLength) {
      hasMaxLengthError = (value.length > element.maxLength);
    }

    if (hasMinLengthError || hasMaxLengthError) {
      return new LengthValidationError(element);
    }

    return null;
  }

  static validateNumericField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isNumeric) {
      return new NumericFormatValidationError(element);
    }

    // since the number is now normalized to en_US, check for the . separator
    const decimalSeparator = '.';

    if (element.isIntegerFormat) {
      if (value.textValue.indexOf(decimalSeparator) > -1) {
        return new NumericFormatValidationError(element);
      }
    }

    const numberValue = +value.textValue;

    if ((element.hasMin && numberValue < element.min) || (element.hasMax && numberValue > element.max)) {
      return new NumericRangeValidationError(element);
    }

    return null;
  }

  static validateDateField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isValid) {
      return new DateFormatValidationError(element);
    }

    return null;
  }

  static validateTimeField(element, value) {
    if (value == null || value.isEmpty) {
      return null;
    }

    if (!value.isValid) {
      return new TimeFormatValidationError(element);
    }

    return null;
  }

  static formatErrors(errors) {
    const messages = [];

    for (const error of errors) {
      messages.push(error.message);
    }

    return messages.join('\n\n');
  }
}
