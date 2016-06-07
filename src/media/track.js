import TrackSegment from './track-segment';

export default class Track {
  constructor(attributes) {
    this._segments = [];

    if (attributes.tracks) {
      for (const trackSegment of attributes.tracks) {
        const segment = new TrackSegment(trackSegment);

        if (segment.points.length) {
          this._segments.push(segment);
        }
      }
    }
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
          line.push([ point.longitude, point.latitude ]);
        }
      }

      lines.push(line);
    }

    return lines;
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
        coordinates: lines[0],
        crs: {
          type: 'name',
          properties: {
            name: 'EPSG:4326'
          }
        }
      }
    };

    return this._geoJSONLines;
  }

  toGeoJSONMultiLineString() {
    if (this._geoJSONMultiLineString) {
      return this._geoJSONMultiLineString;
    }

    const lines = this._toLineSegments();

    this._geoJSONMultiLineString = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'MultiLineString',
        coordinates: lines,
        crs: {
          type: 'name',
          properties: {
            name: 'EPSG:4326'
          }
        }
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
                  [ previousPoint.longitude, previousPoint.latitude ],
                  [ point.longitude, point.latitude ]
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
