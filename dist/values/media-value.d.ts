export default class MediaValue extends FormValue {
    constructor(element: any, items: any);
    _items: any[];
    get displayValue(): string;
    format({ part, formatMediaURL, formatMediaViewerURL, formatMediaName, ...args }: {
        [x: string]: any;
        part?: null | undefined;
        formatMediaURL: any;
        formatMediaViewerURL: any;
        formatMediaName: any;
    }): any;
    get columnValue(): {} | null;
    get multipleValues(): MultipleValueItem[];
    toJSON(): any[] | null;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    isLessThan(value: any): boolean;
    isGreaterThan(value: any): boolean;
    mapItems(callback: any): any[];
    addItem(id: any, caption: any): any;
    removeItem(id: any): any;
    get hasCaptions(): boolean;
    get items(): any[];
}
import FormValue from "./form-value";
import MultipleValueItem from "./multiple-value-item";
