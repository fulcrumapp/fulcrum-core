export default class FeatureValidator {
    static validateFeature(feature: any, record: any, formValues: any): (CustomValidationError | RequiredFieldValidationError | GeometryRequiredValidationError)[];
    static validateRecord(record: any, formValues: any): (CustomValidationError | RequiredFieldValidationError | GeometryRequiredValidationError)[];
    static validateRepeatableItem(repeatableItem: any, record: any, formValues: any): GeometryRequiredValidationError[];
    static validateFieldsInElements(elements: any, record: any, formValues: any, errors: any, visibilityCache: any): void;
    static validateRequiredField(element: any, value: any): RequiredFieldValidationError | null;
    static validatePatternOfElement(element: any, value: any): PatternValidationError | null;
    static validateLengthForElement(element: any, value: any): LengthValidationError | null;
    static validateNumericField(element: any, value: any): NumericFormatValidationError | NumericRangeValidationError | null;
    static validateDateField(element: any, value: any): DateFormatValidationError | null;
    static validateTimeField(element: any, value: any): TimeFormatValidationError | null;
    static formatErrors(errors: any): string;
}
import CustomValidationError from "./custom-validation-error";
import RequiredFieldValidationError from "./required-field-validation-error";
import GeometryRequiredValidationError from "./geometry-required-validation-error";
import PatternValidationError from "./pattern-validation-error";
import LengthValidationError from "./length-validation-error";
import NumericFormatValidationError from "./numeric-format-validation-error";
import NumericRangeValidationError from "./numeric-range-validation-error";
import DateFormatValidationError from "./date-format-validation-error";
import TimeFormatValidationError from "./time-format-validation-error";
