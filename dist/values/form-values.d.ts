export default class FormValues {
    constructor(container: any, attributes: any);
    _values: {};
    container: any;
    get all(): any[];
    get(key: any): any;
    set(key: any, value: any): void;
    find(dataName: any): any;
    loadValues(elements: any, attributes: any): void;
    loadValue(element: any, attributes: any): void;
    toJSON(): {};
    toSimpleJSON(): {};
    copy(): FormValues;
    merge(formValues: any): void;
    createValue(element: any, rawValue: any): any;
    createValueFromString(element: any, string: any): any;
    createValueFromOtherValue(element: any, otherValue: any): any;
    get elements(): any;
    get searchableValue(): string;
    clearInvisibleValues(valuesForConditions: any, record: any): void;
    get mediaValues(): SignatureValue[];
    get repeatableItems(): any[];
    get recordLinkItems(): any[];
}
import SignatureValue from './signature-value';
