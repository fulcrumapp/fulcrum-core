import TrackSegment from './track-segment';
import GPX from './gpx';
import KML from './kml';
import SRT from './srt';

export default class Track {
  constructor(id, attributes) {
    this._id = id;
    this._segments = [];

    if (Array.isArray(attributes)) {
      attributes = {tracks: [ {track: attributes} ]};
    }

    this._attributes = attributes;

    if (attributes.tracks) {
      for (const trackSegment of attributes.tracks) {
        const segment = new TrackSegment(trackSegment);

        if (segment.points.length) {
          this._segments.push(segment);
        }
      }
    }
  }

  get id() {
    return this._id;
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
          line.push([ point.longitude, point.latitude, point.time ]);
        }
      }

      if (line.length > 1) {
        lines.push(line);
      }
    }

    return lines;
  }

  toGPX() {
    return GPX.render([ this ]);
  }

  toKML() {
    return KML.render([ this ]);
  }

  toSRT() {
    return SRT.render([ this ]);
  }

  toJSONString() {
    return JSON.stringify(this._attributes);
  }

  toGeoJSONString() {
    return JSON.stringify({
      type: 'FeatureCollection',
      features: [
        this.toGeoJSONMultiLineString()
      ]
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
