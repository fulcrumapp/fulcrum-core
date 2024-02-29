"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_point_1 = __importDefault(require("./track-point"));
class TrackSegment {
    constructor(attributes) {
        this._points = [];
        if (attributes.track) {
            for (const trackPoint of attributes.track) {
                const point = new track_point_1.default(trackPoint);
                this._points.push(point);
            }
        }
    }
    get points() {
        return this._points;
    }
    get firstPoint() {
        return this._points[0];
    }
    get lastPoint() {
        return this._points[this._points.length - 1];
    }
    get locations() {
        return this.points.filter(o => o.hasCoordinate);
    }
    get firstLocation() {
        return this.locations[0];
    }
    get lastLocation() {
        const locations = this.locations;
        return locations[locations.length - 1];
    }
}
exports.default = TrackSegment;
//# sourceMappingURL=track-segment.js.map