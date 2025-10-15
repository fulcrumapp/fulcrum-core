export default class TextualValue extends FormValue {
    constructor(element: any, textValue: any);
    textValue: any;
    format({ useDisplayValue }: {
        useDisplayValue?: boolean | undefined;
    }): any;
    get displayValue(): any;
    get searchableValue(): any;
    get length(): any;
    get multipleValues(): null;
    isEqual(stringValue: any): boolean;
    contains(stringValue: any): any;
    startsWith(stringValue: any): any;
    isLessThan(stringValue: any): boolean;
    isGreaterThan(stringValue: any): boolean;
    get numericValue(): number | null;
    get isNumeric(): boolean;
}
import FormValue from "./form-value";
