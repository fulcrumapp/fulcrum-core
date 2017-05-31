import TrackPoint from './track-point';

export default class TrackSegment {
  constructor(attributes) {
    this._points = [];

    if (attributes.track) {
      for (const trackPoint of attributes.track) {
        const point = new TrackPoint(trackPoint);

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
}
