export default class LocationValue extends FormValue {
    _latitude: any;
    _longitude: any;
    _address: any;
    toJSON(): {
        latitude: any;
        longitude: any;
        address: any;
    };
    set latitude(lat: any);
    get latitude(): any;
    set longitude(lng: any);
    get longitude(): any;
    set address(address: any);
    get address(): any;
    get columnValue(): {};
    get isEmpty(): boolean;
}
import FormValue from './form-value';
