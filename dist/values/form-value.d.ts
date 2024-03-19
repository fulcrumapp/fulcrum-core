export default class FormValue {
    static create(element: any, attributes: any): any;
    constructor(element: any, value: any);
    _element: any;
    _rawValue: any;
    _isRepeatableItem: boolean;
    set element(arg: any);
    get element(): any;
    get isEmpty(): void;
    get displayValue(): void;
    get searchableValue(): void;
    get length(): void;
    get columnValue(): void;
    get multipleValues(): void;
    format(options: any): void;
    toJSON(): void;
    toSimpleJSON(): void;
    isEqual(value: any): void;
    contains(value: any): void;
    startsWith(value: any): void;
    isLessThan(value: any): void;
    isGreaterThan(value: any): void;
}
