export default class RepeatableValue extends FormValue {
    _items: import("./repeatable-item-value").default[];
    get isEmpty(): boolean;
    get displayValue(): string;
    get searchableValue(): string | null;
    format(options: any): string | number | null;
    get length(): number;
    toJSON(): {
        id: any;
        created_at: string | null;
        updated_at: string | null;
        form_values: {};
        geometry: any;
        created_location: {
            latitude: any;
            longitude: any;
            altitude: any;
            horizontal_accuracy: any;
        } | null;
        updated_location: {
            latitude: any;
            longitude: any;
            altitude: any;
            horizontal_accuracy: any;
        } | null;
        created_duration: any;
        updated_duration: any;
        edited_duration: any;
        created_by_id: any;
        updated_by_id: any;
        version: any;
        changeset_id: any;
    }[] | null;
    toSimpleJSON(): {
        id: any;
        created_at: string | null;
        updated_at: string | null;
        form_values: {};
        geometry: any;
        created_location: {
            latitude: any;
            longitude: any;
            altitude: any;
            horizontal_accuracy: any;
        } | null;
        updated_location: {
            latitude: any;
            longitude: any;
            altitude: any;
            horizontal_accuracy: any;
        } | null;
        created_duration: any;
        updated_duration: any;
        edited_duration: any;
        created_by_id: any;
        updated_by_id: any;
        version: any;
        changeset_id: any;
    }[] | null;
    get columnValue(): null;
    get multipleValues(): null;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    isLessThan(value: any): boolean;
    isGreaterThan(value: any): boolean;
    mapItems(callback: any): any[];
    get items(): import("./repeatable-item-value").default[];
    forEachItem(callback: any): void;
    itemIndex(id: any): number;
    insertItem(item: any): void;
    removeItem(id: any): import("./repeatable-item-value").default | null;
    createNewItem(): import("./repeatable-item-value").default;
}
import FormValue from "./form-value";
