export default class BooleanValue extends FormValue {
    booleanValue: boolean;
    format({ useDisplayValue }: {
        useDisplayValue?: boolean | undefined;
    }): string | boolean;
    get displayValue(): string;
    get length(): number;
    get isEmpty(): boolean;
    get searchableValue(): string;
    get columnValue(): boolean;
    get multipleValues(): null;
    toJSON(): boolean;
    isEqual(booleanValue: any): boolean;
}
import FormValue from "./form-value";
