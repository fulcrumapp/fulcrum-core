"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _trackSegment = _interopRequireDefault(require("./track-segment"));

var _gpx = _interopRequireDefault(require("./gpx"));

var _kml = _interopRequireDefault(require("./kml"));

var _srt = _interopRequireDefault(require("./srt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Track =
/*#__PURE__*/
function () {
  function Track(id, attributes) {
    this._id = id;
    this._segments = [];

    if (Array.isArray(attributes)) {
      attributes = {
        tracks: [{
          track: attributes
        }]
      };
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
        var segment = new _trackSegment["default"](trackSegment);

        if (segment.points.length) {
          this._segments.push(segment);
        }
      }
    }
  }

  var _proto = Track.prototype;

  _proto._toLineSegments = function _toLineSegments() {
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

  _proto.toGPX = function toGPX() {
    return _gpx["default"].render([this]);
  };

  _proto.toKML = function toKML() {
    return _kml["default"].render([this]);
  };

  _proto.toSRT = function toSRT() {
    return _srt["default"].render([this]);
  };

  _proto.toJSONString = function toJSONString() {
    return JSON.stringify(this._attributes);
  };

  _proto.toGeoJSONString = function toGeoJSONString() {
    var lineString = this.toGeoJSONMultiLineString();
    var features = lineString ? [lineString] : [];
    return JSON.stringify({
      type: 'FeatureCollection',
      features: features
    });
  };

  _proto.toGeoJSONLines = function toGeoJSONLines() {
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

  _proto.toGeoJSONMultiLineString = function toGeoJSONMultiLineString() {
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

  _proto.toGeoJSONSegments = function toGeoJSONSegments() {
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
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.firstLocation != null;
    }
  }, {
    key: "segments",
    get: function get() {
      return this._segments;
    }
  }, {
    key: "firstSegment",
    get: function get() {
      return this._segments[0];
    }
  }, {
    key: "lastSegment",
    get: function get() {
      return this._segments[this._segments.length - 1];
    }
  }, {
    key: "firstLocation",
    get: function get() {
      return this.firstSegment && this.firstSegment.firstLocation;
    }
  }, {
    key: "lastLocation",
    get: function get() {
      return this.lastSegment && this.lastSegment.lastLocation;
    }
  }, {
    key: "firstPoint",
    get: function get() {
      return this.firstSegment && this.firstSegment.firstPoint;
    }
  }, {
    key: "lastPoint",
    get: function get() {
      return this.lastSegment && this.lastSegment.lastPoint;
    }
  }, {
    key: "representativePoint",
    get: function get() {
      if (this.firstSegment) {
        return this.toGeoJSONLines().geometry.coordinates[0];
      }

      return null;
    }
  }]);

  return Track;
}();

exports["default"] = Track;
//# sourceMappingURL=track.js.map