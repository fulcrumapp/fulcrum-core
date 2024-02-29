export default class AddressValue extends FormValue {
    address: Address;
    get isEmpty(): boolean;
    get displayValue(): string;
    get searchableValue(): string;
    get length(): number;
    get columnValue(): {};
    get multipleValues(): null;
    format({ part }: {
        part?: null | undefined;
    }): string | null;
    toJSON(): {
        sub_thoroughfare: any;
        thoroughfare: any;
        suite: any;
        locality: any;
        sub_admin_area: any;
        admin_area: any;
        postal_code: any;
        country: any;
    } | null;
    isEqual(stringValue: any): boolean;
    contains(stringValue: any): boolean;
    startsWith(stringValue: any): boolean;
    isLessThan(stringValue: any): boolean;
    isGreaterThan(stringValue: any): boolean;
}
import FormValue from './form-value';
import Address from './address';
