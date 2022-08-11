export default class SignatureValue extends FormValue {
    _identifier: any;
    _timestamp: Date | null | undefined;
    set id(arg: any);
    get id(): any;
    set timestamp(arg: Date | null | undefined);
    get timestamp(): Date | null | undefined;
    clear(): void;
    get isEmpty(): boolean;
    get displayValue(): "1 Signature" | null;
    get searchableValue(): null;
    format({ part, formatSignatureURL, formatSignatureViewerURL, formatSignatureName, ...args }: {
        [x: string]: any;
        part?: null | undefined;
        formatSignatureURL: any;
        formatSignatureViewerURL: any;
        formatSignatureName: any;
    }): any;
    get length(): 1 | 0;
    get columnValue(): {} | null;
    get multipleValues(): null;
    toJSON(): {
        signature_id: any;
        timestamp: any;
    } | null;
    isEqual(value: any): boolean;
    contains(value: any): boolean;
    startsWith(value: any): boolean;
    isLessThan(value: any): boolean;
    isGreaterThan(value: any): boolean;
}
import FormValue from "./form-value";
