export default class TextualValue extends FormValue {
    textValue: any;
    format({ useDisplayValue }: {
        useDisplayValue?: boolean | undefined;
    }): any;
    get isEmpty(): boolean;
    get displayValue(): any;
    get searchableValue(): any;
    get length(): any;
    get columnValue(): any;
    get multipleValues(): null;
    toJSON(): any;
    isEqual(stringValue: any): boolean;
    contains(stringValue: any): any;
    startsWith(stringValue: any): any;
    isLessThan(stringValue: any): boolean;
    isGreaterThan(stringValue: any): boolean;
    get numericValue(): number | null;
    get isNumeric(): boolean;
}
import FormValue from "./form-value";
