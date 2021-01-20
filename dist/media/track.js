"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _trackSegment = _interopRequireDefault(require("./track-segment"));

var _gpx = _interopRequireDefault(require("./gpx"));

var _kml = _interopRequireDefault(require("./kml"));

var _srt = _interopRequireDefault(require("./srt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Track = /*#__PURE__*/function () {
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
      for (var _iterator = _createForOfIteratorHelperLoose(attributes.tracks), _step; !(_step = _iterator()).done;) {
        var trackSegment = _step.value;
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

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.segments), _step2; !(_step2 = _iterator2()).done;) {
      var segment = _step2.value;
      var line = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(segment.points), _step3; !(_step3 = _iterator3()).done;) {
        var point = _step3.value;

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

    for (var _iterator4 = _createForOfIteratorHelperLoose(this.segments), _step4; !(_step4 = _iterator4()).done;) {
      var segment = _step4.value;

      for (var _iterator5 = _createForOfIteratorHelperLoose(segment.points), _step5; !(_step5 = _iterator5()).done;) {
        var point = _step5.value;

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