export default class DynamicItemValue {
    constructor(dynamicValue: any, attributes: any);
    dynamicValue: any;
    _metadataJSON: any;
    _elementsJSON: any;
    _valuesJSON: any;
    toJSON(): {
        metadata: any;
        elements: any[];
        values: {};
    };
    get id(): any;
    get metadata(): any;
    get elements(): any[];
    _elements: any[] | undefined;
    get values(): FormValues;
    _values: FormValues | undefined;
}
import FormValues from "./form-values";
