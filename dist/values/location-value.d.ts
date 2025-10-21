export default class LocationValue extends FormValue {
    constructor(element: any, attributes: any);
    _latitude: any;
    _longitude: any;
    _address: any;
    toJSON(): {
        latitude: any;
        longitude: any;
        address: any;
    };
    set latitude(arg: any);
    get latitude(): any;
    set longitude(arg: any);
    get longitude(): any;
    set address(arg: any);
    get address(): any;
    get columnValue(): {};
}
import FormValue from "./form-value";
