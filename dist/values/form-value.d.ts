export default class FormValue {
    element: any;
    protected _rawValue: any;
    constructor(element: any, value: any);
    get isEmpty(): boolean;
    get displayValue(): string | null;
    get searchableValue(): string | null;
    get length(): number;
    get columnValue(): any;
    get multipleValues(): any[] | null;
    format(options?: any): any;
    toJSON(): any;
    toSimpleJSON(): any;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    isLessThan(value: any): boolean;
    isGreaterThan(value: any): boolean;
    static create(element: any, attributes: any): any;
}
