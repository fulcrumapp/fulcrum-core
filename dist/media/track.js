"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_segment_1 = __importDefault(require("./track-segment"));
const gpx_1 = __importDefault(require("./gpx"));
const kml_1 = __importDefault(require("./kml"));
const srt_1 = __importDefault(require("./srt"));
class Track {
    constructor(id, attributes) {
        this._id = id;
        this._segments = [];
        if (Array.isArray(attributes)) {
            attributes = { tracks: [{ track: attributes }] };
        }
        this._attributes = attributes;
        if (attributes.tracks) {
            for (const trackSegment of attributes.tracks) {
                const segment = new track_segment_1.default(trackSegment);
                if (segment.points.length) {
                    this._segments.push(segment);
                }
            }
        }
    }
    get id() {
        return this._id;
    }
    get isValid() {
        return this.firstLocation != null;
    }
    get segments() {
        return this._segments;
    }
    get firstSegment() {
        return this._segments[0];
    }
    get lastSegment() {
        return this._segments[this._segments.length - 1];
    }
    get firstLocation() {
        return this.firstSegment && this.firstSegment.firstLocation;
    }
    get lastLocation() {
        return this.lastSegment && this.lastSegment.lastLocation;
    }
    get firstPoint() {
        return this.firstSegment && this.firstSegment.firstPoint;
    }
    get lastPoint() {
        return this.lastSegment && this.lastSegment.lastPoint;
    }
    get representativePoint() {
        if (this.firstSegment) {
            return this.toGeoJSONLines().geometry.coordinates[0];
        }
        return null;
    }
    _toLineSegments() {
        const lines = [];
        for (const segment of this.segments) {
            const line = [];
            for (const point of segment.points) {
                if (point.hasCoordinate) {
                    line.push([point.longitude, point.latitude, point.time]);
                }
            }
            if (line.length > 1) {
                lines.push(line);
            }
        }
        return lines;
    }
    toGPX() {
        return gpx_1.default.render([this]);
    }
    toKML() {
        return kml_1.default.render([this]);
    }
    toSRT() {
        return srt_1.default.render([this]);
    }
    toJSONString() {
        return JSON.stringify(this._attributes);
    }
    toGeoJSONString() {
        const lineString = this.toGeoJSONMultiLineString();
        const features = lineString ? [lineString] : [];
        return JSON.stringify({
            type: 'FeatureCollection',
            features: features
        });
    }
    toGeoJSONLines() {
        if (this._geoJSONLines) {
            return this._geoJSONLines;
        }
        const lines = this._toLineSegments();
        this._geoJSONLines = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: lines[0]
            }
        };
        return this._geoJSONLines;
    }
    toGeoJSONMultiLineString() {
        if (this._geoJSONMultiLineString) {
            return this._geoJSONMultiLineString;
        }
        const lines = this._toLineSegments();
        if (lines.length === 0) {
            return null;
        }
        this._geoJSONMultiLineString = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'MultiLineString',
                coordinates: lines
            }
        };
        return this._geoJSONMultiLineString;
    }
    toGeoJSONSegments() {
        if (this._geoJSONSegments) {
            return this._geoJSONSegments;
        }
        const lines = [];
        let previousPoint = null;
        for (const segment of this.segments) {
            for (const point of segment.points) {
                if (point.hasCoordinate) {
                    if (previousPoint) {
                        lines.push({
                            type: 'Feature',
                            properties: {
                                time: point.time
                            },
                            geometry: {
                                type: 'LineString',
                                coordinates: [
                                    [previousPoint.longitude, previousPoint.latitude],
                                    [point.longitude, point.latitude]
                                ]
                            }
                        });
                    }
                    previousPoint = point;
                }
            }
        }
        this._geoJSONSegments = {
            type: 'FeatureCollection',
            features: lines
        };
        return this._geoJSONSegments;
    }
}
exports.default = Track;
//# sourceMappingURL=track.js.map