export default class Address {
    constructor(attributes: any);
    streetNumber: any;
    streetName: any;
    suite: any;
    city: any;
    county: any;
    state: any;
    postalCode: any;
    country: any;
    toJSON(): {
        sub_thoroughfare: any;
        thoroughfare: any;
        suite: any;
        locality: any;
        sub_admin_area: any;
        admin_area: any;
        postal_code: any;
        country: any;
    };
    clear(): void;
    get isEmpty(): boolean;
    get lines(): string[];
    get line1(): string;
    get line2(): string;
    get line3(): string;
    line(...parts: any[]): string;
}
