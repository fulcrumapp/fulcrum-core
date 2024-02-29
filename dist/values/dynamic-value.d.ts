export default class DynamicValue extends FormValue {
    _items: DynamicItemValue[];
    get ItemClass(): typeof DynamicItemValue;
    get isEmpty(): boolean;
    get searchableValue(): null;
    get length(): number;
    format({ part }: {
        part?: null | undefined;
    }): any[] | null;
    get columnValue(): {} | null;
    toJSON(): {
        metadata: any;
        elements: any[];
        values: {};
    }[] | null;
    get multipleValues(): MultipleValueItem[];
    get displayValue(): string;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    isLessThan(value: any): boolean;
    isGreaterThan(value: any): boolean;
    mapItems(callback: any): any[];
    get items(): DynamicItemValue[];
    itemIndex(id: any): number;
    insertItem(item: any): void;
    removeItem(id: any): DynamicItemValue | null;
    createNewItem(): DynamicItemValue;
}
import FormValue from './form-value';
import DynamicItemValue from './dynamic-item-value';
import MultipleValueItem from './multiple-value-item';
