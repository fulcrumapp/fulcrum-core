export default class Condition {
    static isEqual(formValue: any, stringValue: any): any;
    static isEmpty(formValue: any): any;
    static contains(formValue: any, stringValue: any): any;
    static startsWith(formValue: any, stringValue: any): any;
    static isLessThan(formValue: any, stringValue: any): any;
    static isGreaterThan(formValue: any, stringValue: any): any;
    static shouldElementBeVisible(element: any, record: any, values: any, visibilityCache: any): any;
    static shouldElementBeVisibleRecursive(element: any, record: any, values: any, cache: any): any;
    static shouldElementBeRequired(element: any, record: any, values: any): any;
    static valueForCondition(condition: any, values: any, record: any): any;
    static elementForCondition(condition: any, record: any): any;
    constructor(element: any, attributes: any);
    element: any;
    fieldKey: any;
    operator: any;
    value: any;
    toJSON(): {
        field_key: any;
        operator: any;
        value: any;
    };
    isSatisfied(record: any, values: any, cache: any): any;
    _isSatisfied(record: any, values: any, isReferencedFieldSatisfied: any): any;
}
