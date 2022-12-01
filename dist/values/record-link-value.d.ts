export default class RecordLinkValue extends FormValue {
    _items: RecordLinkItemValue[];
    get isEmpty(): boolean;
    get displayValue(): string | null;
    get searchableValue(): string | null;
    get length(): number;
    format({ part }: {
        part?: null | undefined;
    }): any[] | null;
    toJSON(): {
        record_id: any;
    }[];
    get columnValue(): any[] | null;
    get multipleValues(): MultipleValueItem[];
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    isLessThan(value: any): boolean;
    isGreaterThan(value: any): boolean;
    get items(): RecordLinkItemValue[];
    addRecord(record: any): void;
    itemIndex(id: any): number;
    insertItem(item: any): void;
    removeItem(id: any): RecordLinkItemValue | null;
}
import FormValue from "./form-value";
import RecordLinkItemValue from "./record-link-item-value";
import MultipleValueItem from "./multiple-value-item";
