'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _trackSegment = require('./track-segment');

var _trackSegment2 = _interopRequireDefault(_trackSegment);

var _gpx = require('./gpx');

var _gpx2 = _interopRequireDefault(_gpx);

var _kml = require('./kml');

var _kml2 = _interopRequireDefault(_kml);

var _srt = require('./srt');

var _srt2 = _interopRequireDefault(_srt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function () {
  function Track(id, attributes) {
    _classCallCheck(this, Track);

    this._id = id;
    this._segments = [];

    if (Array.isArray(attributes)) {
      attributes = { tracks: [{ track: attributes }] };
    }

    this._attributes = attributes;

    if (attributes.tracks) {
      for (var _iterator = attributes.tracks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var trackSegment = _ref;

        var segment = new _trackSegment2.default(trackSegment);

        if (segment.points.length) {
          this._segments.push(segment);
        }
      }
    }
  }

  Track.prototype._toLineSegments = function _toLineSegments() {
    var lines = [];

    for (var _iterator2 = this.segments, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var segment = _ref2;

      var line = [];

      for (var _iterator3 = segment.points, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var point = _ref3;

        if (point.hasCoordinate) {
          line.push([point.longitude, point.latitude, point.time]);
        }
      }

      if (line.length > 1) {
        lines.push(line);
      }
    }

    return lines;
  };

  Track.prototype.toGPX = function toGPX() {
    return _gpx2.default.render([this]);
  };

  Track.prototype.toKML = function toKML() {
    return _kml2.default.render([this]);
  };

  Track.prototype.toSRT = function toSRT() {
    return _srt2.default.render([this]);
  };

  Track.prototype.toJSON = function toJSON() {
    return this._attributes;
  };

  Track.prototype.toGeoJSON = function toGeoJSON() {
    return JSON.stringify(this.toGeoJSONMultiLineString());
  };

  Track.prototype.toGeoJSONLines = function toGeoJSONLines() {
    if (this._geoJSONLines) {
      return this._geoJSONLines;
    }

    var lines = this._toLineSegments();

    this._geoJSONLines = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: lines[0]
      }
    };

    return this._geoJSONLines;
  };

  Track.prototype.toGeoJSONMultiLineString = function toGeoJSONMultiLineString() {
    if (this._geoJSONMultiLineString) {
      return this._geoJSONMultiLineString;
    }

    var lines = this._toLineSegments();

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
  };

  Track.prototype.toGeoJSONSegments = function toGeoJSONSegments() {
    if (this._geoJSONSegments) {
      return this._geoJSONSegments;
    }

    var lines = [];

    var previousPoint = null;

    for (var _iterator4 = this.segments, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var segment = _ref4;

      for (var _iterator5 = segment.points, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref5 = _i5.value;
        }

        var point = _ref5;

        if (point.hasCoordinate) {
          if (previousPoint) {
            lines.push({
              type: 'Feature',
              properties: {
                time: point.time
              },
              geometry: {
                type: 'LineString',
                coordinates: [[previousPoint.longitude, previousPoint.latitude], [point.longitude, point.latitude]]
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
  };

  _createClass(Track, [{
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'segments',
    get: function get() {
      return this._segments;
    }
  }, {
    key: 'firstSegment',
    get: function get() {
      return this._segments[0];
    }
  }, {
    key: 'lastSegment',
    get: function get() {
      return this._segments[this._segments.length - 1];
    }
  }, {
    key: 'representativePoint',
    get: function get() {
      if (this.firstSegment) {
        return this.toGeoJSONLines().geometry.coordinates[0];
      }

      return null;
    }
  }]);

  return Track;
}();

exports.default = Track;
//# sourceMappingURL=track.js.map