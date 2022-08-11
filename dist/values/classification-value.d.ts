export default class ClassificationValue extends FormValue {
    _choiceValues: any[];
    _otherValues: any[];
    get isEmpty(): boolean;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    get labelStrings(): any[];
    get valueStrings(): any[];
    get displayValue(): string;
    get searchableValue(): string;
    format({ useDisplayValue }: {
        useDisplayValue?: boolean | undefined;
    }): any[] | null;
    get length(): number;
    toJSON(): {
        choice_values: any[];
        other_values: any[];
    } | null;
    toSimpleJSON({ labels }?: {
        labels: any;
    }): any[] | null;
    get columnValue(): any[] | null;
    get multipleValues(): null;
    get hasOtherValue(): boolean;
    set otherValue(arg: any);
    get otherValue(): any;
    get selectedClassification(): any;
    setSelectedClassification(classification: any, otherValue: any): void;
    setSelectedClassificationJSON(classificationAsJSON: any, otherValue: any): void;
}
import FormValue from "./form-value";
