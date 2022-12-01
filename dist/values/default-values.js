"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __importDefault(require("../utils/date-utils"));
const text_utils_1 = __importDefault(require("../utils/text-utils"));
const async_1 = __importDefault(require("async"));
const NOW = 'now';
class DefaultValues {
    static applyDefaultValue(elementDefaultValue, element, formValues) {
        let defaultValue = elementDefaultValue;
        const value = formValues.get(element.key);
        const hasValue = value && !value.isEmpty;
        if (hasValue || defaultValue == null || defaultValue.length === 0) {
            return;
        }
        if (element.isDateElement && defaultValue === NOW) {
            defaultValue = date_utils_1.default.formatDate(new Date());
        }
        else if (element.isTimeElement && defaultValue === NOW) {
            defaultValue = date_utils_1.default.formatTime(new Date());
        }
        const fieldValue = formValues.createValueFromString(element, defaultValue);
        if (fieldValue) {
            formValues.set(element.key, fieldValue);
        }
    }
    static applyPreviousDefaults(dataSource, defaultValues, formValues, record, callback) {
        if (defaultValues == null) {
            return;
        }
        const elements = DefaultValues.elementsWithPreviousDefaultsEnabledWithinElements(formValues.elements, record.form);
        async_1.default.eachSeries(elements, (element, next) => {
            const previousDefaultAsJSON = defaultValues[element.key];
            // the default completion is just to continue the loop
            let completion = next;
            if (previousDefaultAsJSON) {
                const fieldValue = formValues.createValue(element, previousDefaultAsJSON);
                const currentValue = record.get(element.key, formValues);
                const isCurrentlyEmpty = (currentValue == null || currentValue.isEmpty);
                if (fieldValue && isCurrentlyEmpty) {
                    record.set(element.key, fieldValue, formValues);
                    if (element.isRecordLinkElement) {
                        completion = () => {
                            DefaultValues.applyDefaultValuesForRecordLinkValue(dataSource, fieldValue, formValues, record, next);
                        };
                    }
                }
            }
            completion();
        }, callback);
    }
    static applyDefaultValuesForRecordLinkValue(dataSource, recordLinkValue, formValues, record, callback) {
        const recordLinkElement = recordLinkValue.element;
        const itemValue = recordLinkValue.items[recordLinkValue.length - 1];
        const maybeLoadRecord = (itemValue, callback) => {
            if (itemValue.record) {
                callback();
            }
            else {
                itemValue.load(dataSource, callback);
            }
        };
        maybeLoadRecord(itemValue, () => {
            const otherRecord = itemValue.record;
            if (otherRecord) {
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
            callback();
        });
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
            text_utils_1.default.isPresent(record.form.statusField.defaultValue) &&
            record.form.statusField.isEnabled);
        if (hasStatusDefault && text_utils_1.default.isEmpty(record.status)) {
            record.status = record.form.statusField.defaultValue;
        }
        DefaultValues.applyDefaultValuesForElementsRecursive(elements, formValues);
    }
    static applyDefaultValuesForElementsRecursive(elements, formValues) {
        for (const element of elements) {
            if (element.isSectionElement) {
                DefaultValues.applyDefaultValuesForElementsRecursive(element.elements, formValues);
            }
            else {
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
            }
            else if (element.isDefaultPreviousValueEnabled) {
                results.push(element);
            }
        }
        return results;
    }
}
exports.default = DefaultValues;
//# sourceMappingURL=default-values.js.map