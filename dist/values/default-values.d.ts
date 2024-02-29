export default class DefaultValues {
    static applyDefaultValue(elementDefaultValue: any, element: any, formValues: any): void;
    static applyPreviousDefaults(dataSource: any, defaultValues: any, formValues: any, record: any, callback: any): void;
    static applyDefaultValuesForRecordLinkValue(dataSource: any, recordLinkValue: any, formValues: any, record: any, callback: any): void;
    static applyDefaultValueForElement(element: any, formValues: any): void;
    static applyDefaultValuesForElements(elements: any, formValues: any, record: any): void;
    static applyDefaultValuesForElementsRecursive(elements: any, formValues: any): void;
    static elementsWithPreviousDefaultsEnabledWithinElements(elements: any, form: any): any[];
}
