export default class TrackSegment {
    constructor(attributes: any);
    _points: TrackPoint[];
    get points(): TrackPoint[];
    get firstPoint(): TrackPoint;
    get lastPoint(): TrackPoint;
    get locations(): TrackPoint[];
    get firstLocation(): TrackPoint;
    get lastLocation(): TrackPoint;
}
import TrackPoint from './track-point';
