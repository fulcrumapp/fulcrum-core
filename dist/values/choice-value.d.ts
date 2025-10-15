export default class ChoiceValue extends FormValue {
    constructor(element: any, attributes: any);
    _choiceValues: any[];
    _otherValues: any[];
    format({ useDisplayValue }: {
        useDisplayValue?: boolean | undefined;
    }): any;
    get labelStrings(): any[];
    get valueStrings(): any[];
    get displayValue(): string;
    get searchableValue(): string;
    toJSON(): {
        choice_values: any[];
        other_values: any[];
    } | null;
    toSimpleJSON({ labels }?: {
        labels: any;
    }): any;
    get multipleValues(): null;
    get hasOtherValue(): boolean;
    set selectedValues(arg: any[]);
    get selectedValues(): any[];
    set otherValues(arg: any[]);
    get otherValues(): any[];
    get otherValue(): any;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
}
import FormValue from "./form-value";
