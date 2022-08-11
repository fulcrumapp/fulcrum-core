export default class Track {
    constructor(id: any, attributes: any);
    _id: any;
    _segments: TrackSegment[];
    _attributes: any;
    get id(): any;
    get isValid(): boolean;
    get segments(): TrackSegment[];
    get firstSegment(): TrackSegment;
    get lastSegment(): TrackSegment;
    get firstLocation(): import("./track-point").default;
    get lastLocation(): import("./track-point").default;
    get firstPoint(): import("./track-point").default;
    get lastPoint(): import("./track-point").default;
    get representativePoint(): any[] | null;
    _toLineSegments(): any[][][];
    toGPX(): string;
    toKML(): string;
    toSRT(): string;
    toJSONString(): string;
    toGeoJSONString(): string;
    toGeoJSONLines(): {
        type: string;
        properties: {};
        geometry: {
            type: string;
            coordinates: any[][];
        };
    };
    _geoJSONLines: {
        type: string;
        properties: {};
        geometry: {
            type: string;
            coordinates: any[][];
        };
    } | undefined;
    toGeoJSONMultiLineString(): {
        type: string;
        properties: {};
        geometry: {
            type: string;
            coordinates: any[][][];
        };
    } | null;
    _geoJSONMultiLineString: {
        type: string;
        properties: {};
        geometry: {
            type: string;
            coordinates: any[][][];
        };
    } | undefined;
    toGeoJSONSegments(): {
        type: string;
        features: {
            type: string;
            properties: {
                time: any;
            };
            geometry: {
                type: string;
                coordinates: any[][];
            };
        }[];
    };
    _geoJSONSegments: {
        type: string;
        features: {
            type: string;
            properties: {
                time: any;
            };
            geometry: {
                type: string;
                coordinates: any[][];
            };
        }[];
    } | undefined;
}
import TrackSegment from "./track-segment";
