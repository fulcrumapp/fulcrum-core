export default class DynamicValue extends FormValue {
    constructor(element: any, items: any);
    _items: import("./dynamic-item-value").default[];
    get ItemClass(): typeof import("./dynamic-item-value").default;
    get searchableValue(): null;
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
    get items(): import("./dynamic-item-value").default[];
    itemIndex(id: any): number;
    insertItem(item: any): void;
    removeItem(id: any): import("./dynamic-item-value").default | null;
    createNewItem(): import("./dynamic-item-value").default;
}
import FormValue from "./form-value";
import MultipleValueItem from "./multiple-value-item";
