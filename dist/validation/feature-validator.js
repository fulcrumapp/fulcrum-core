"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repeatable_item_value_1 = __importDefault(require("../values/repeatable-item-value"));
const record_1 = __importDefault(require("../record"));
const condition_1 = __importDefault(require("../elements/condition"));
const custom_validation_error_1 = __importDefault(require("./custom-validation-error"));
const required_field_validation_error_1 = __importDefault(require("./required-field-validation-error"));
const geometry_required_validation_error_1 = __importDefault(require("./geometry-required-validation-error"));
const pattern_validation_error_1 = __importDefault(require("./pattern-validation-error"));
const length_validation_error_1 = __importDefault(require("./length-validation-error"));
const numeric_format_validation_error_1 = __importDefault(require("./numeric-format-validation-error"));
const numeric_range_validation_error_1 = __importDefault(require("./numeric-range-validation-error"));
const date_format_validation_error_1 = __importDefault(require("./date-format-validation-error"));
const time_format_validation_error_1 = __importDefault(require("./time-format-validation-error"));
class FeatureValidator {
    static validateFeature(feature, record, formValues) {
        console.log('fulcrum-core FeatureValidator feature', feature);
        console.log('fulcrum-core FeatureValidator record', record);
        console.log('fulcrum-core FeatureValidator formValues', formValues);
        if (feature instanceof record_1.default) {
            console.log('fulcrum-core FeatureValidator feature instanceof Record');
            return FeatureValidator.validateRecord(record, formValues);
        }
        else if (feature instanceof repeatable_item_value_1.default) {
            console.log('fulcrum-core FeatureValidator feature instanceof RepeatableItemValue');
            return FeatureValidator.validateRepeatableItem(feature, record, formValues);
        }
        return [];
    }
    static validateRecord(record, formValues) {
        if (record == null) {
            return [];
        }
        const errors = [];
        if (record.isStatusFieldEnabled) {
            if (record.status == null) {
                errors.push(new required_field_validation_error_1.default(record.form.statusField));
            }
            else if (record.form.statusField.statusForValue(record.status) == null) {
                errors.push(new custom_validation_error_1.default(`${record.status} is not a valid status.`));
            }
        }
        if (record.form.isGeometryRequired) {
            if (!record.hasLocation) {
                errors.push(new geometry_required_validation_error_1.default());
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
            if (!repeatableItem.hasLocation) {
                errors.push(new geometry_required_validation_error_1.default());
            }
        }
        const cache = {};
        FeatureValidator.validateFieldsInElements(repeatableItem.element.elements, record, formValues, errors, cache);
        return errors;
    }
    static validateFieldsInElements(elements, record, formValues, errors, visibilityCache) {
        const cache = visibilityCache || {};
        for (const element of elements) {
            if (element.isSectionElement) {
                const visible = condition_1.default.shouldElementBeVisible(element, record, formValues, cache);
                if (visible) {
                    FeatureValidator.validateFieldsInElements(element.elements, record, formValues, errors, cache);
                }
            }
            else {
                const required = condition_1.default.shouldElementBeRequired(element, record, formValues);
                console.log('fulcrum-core validateFieldsInElements element', element);
                console.log('fulcrum-core validateFieldsInElements required', required);
                const visible = condition_1.default.shouldElementBeVisible(element, record, formValues, cache);
                const disabled = element.isDisabled;
                const validatable = (visible && !disabled);
                if (validatable) {
                    if (required) {
                        const fieldValue = formValues.get(element.key);
                        const error = FeatureValidator.validateRequiredField(element, fieldValue);
                        if (error) {
                            errors.push(error);
                        }
                    }
                    if (element.isTextElement) {
                        if (element.isNumeric) {
                            const textValue = formValues.get(element.key);
                            const error = FeatureValidator.validateNumericField(element, textValue);
                            if (error) {
                                errors.push(error);
                            }
                        }
                        else if (element.hasPattern) {
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
    static validateRequiredField(element, value) {
        if (value == null || value.isEmpty) {
            return new required_field_validation_error_1.default(element);
        }
        return null;
    }
    static validatePatternOfElement(element, value) {
        if (value == null || value.isEmpty) {
            return null;
        }
        const regex = new RegExp('^(?:' + element.pattern + ')$');
        if (regex) {
            if (!regex.test(value.textValue)) {
                return new pattern_validation_error_1.default(element);
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
            return new length_validation_error_1.default(element);
        }
        return null;
    }
    static validateNumericField(element, value) {
        if (value == null || value.isEmpty) {
            return null;
        }
        if (!value.isNumeric) {
            return new numeric_format_validation_error_1.default(element);
        }
        // since the number is now normalized to en_US, check for the . separator
        const decimalSeparator = '.';
        if (element.isIntegerFormat) {
            if (value.textValue.indexOf(decimalSeparator) > -1) {
                return new numeric_format_validation_error_1.default(element);
            }
        }
        const numberValue = +value.textValue;
        if ((element.hasMin && numberValue < element.min) || (element.hasMax && numberValue > element.max)) {
            return new numeric_range_validation_error_1.default(element);
        }
        return null;
    }
    static validateDateField(element, value) {
        if (value == null || value.isEmpty) {
            return null;
        }
        if (!value.isValid) {
            return new date_format_validation_error_1.default(element);
        }
        return null;
    }
    static validateTimeField(element, value) {
        if (value == null || value.isEmpty) {
            return null;
        }
        if (!value.isValid) {
            return new time_format_validation_error_1.default(element);
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
exports.default = FeatureValidator;
//# sourceMappingURL=feature-validator.js.map