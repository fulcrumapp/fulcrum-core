export default class TrackPoint {
    static IDX_TIME: number;
    static IDX_LATITUDE: number;
    static IDX_LONGITUDE: number;
    static IDX_ALTITUDE: number;
    static IDX_HORIZONTAL_ACCURACY: number;
    static IDX_VERTICAL_ACCURACY: number;
    static IDX_COURSE: number;
    static IDX_SPEED: number;
    static IDX_VIEWPORT: number;
    static IDX_INCLINATION: number;
    constructor(values: any);
    _values: any;
    get values(): any;
    get time(): any;
    get latitude(): any;
    get longitude(): any;
    get altitude(): any;
    get horizontalAccuracy(): any;
    get verticalAccuracy(): any;
    get course(): any;
    get speed(): any;
    get viewport(): any;
    get inclination(): any;
    get hasCoordinate(): boolean;
}
