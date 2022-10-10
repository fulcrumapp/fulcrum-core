"use strict";

exports.__esModule = true;
exports["default"] = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// [0]: Millisecond Offset Since Recording Start
// [1]: Latitude
// [2]: Longitude
// [3]: Altitude
// [4]: Horizontal Accuracy
// [5]: Vertical Accuracy
// [6]: Course
// [7]: Speed
// [8]: Viewport Bearing (Optional)
// [9]: Viewport Inclination (Optional)
var TrackPoint = /*#__PURE__*/function () {
  function TrackPoint(values) {
    this._values = values;
  }
  _createClass(TrackPoint, [{
    key: "values",
    get: function get() {
      return this._values;
    }
  }, {
    key: "time",
    get: function get() {
      return this.values[TrackPoint.IDX_TIME];
    }
  }, {
    key: "latitude",
    get: function get() {
      return this.values[TrackPoint.IDX_LATITUDE];
    }
  }, {
    key: "longitude",
    get: function get() {
      return this.values[TrackPoint.IDX_LONGITUDE];
    }
  }, {
    key: "altitude",
    get: function get() {
      return this.values[TrackPoint.IDX_ALTITUDE];
    }
  }, {
    key: "horizontalAccuracy",
    get: function get() {
      return this.values[TrackPoint.IDX_HORIZONTAL_ACCURACY];
    }
  }, {
    key: "verticalAccuracy",
    get: function get() {
      return this.values[TrackPoint.IDX_VERTICAL_ACCURACY];
    }
  }, {
    key: "course",
    get: function get() {
      return this.values[TrackPoint.IDX_COURSE];
    }
  }, {
    key: "speed",
    get: function get() {
      return this.values[TrackPoint.IDX_SPEED];
    }
  }, {
    key: "viewport",
    get: function get() {
      return this.values[TrackPoint.IDX_VIEWPORT];
    }
  }, {
    key: "inclination",
    get: function get() {
      return this.values[TrackPoint.IDX_INCLINATION];
    }
  }, {
    key: "hasCoordinate",
    get: function get() {
      return this.latitude != null && this.longitude != null && this.latitude !== 0 && this.longitude !== 0;
    }
  }]);
  return TrackPoint;
}();
exports["default"] = TrackPoint;
_defineProperty(TrackPoint, "IDX_TIME", 0);
_defineProperty(TrackPoint, "IDX_LATITUDE", 1);
_defineProperty(TrackPoint, "IDX_LONGITUDE", 2);
_defineProperty(TrackPoint, "IDX_ALTITUDE", 3);
_defineProperty(TrackPoint, "IDX_HORIZONTAL_ACCURACY", 4);
_defineProperty(TrackPoint, "IDX_VERTICAL_ACCURACY", 5);
_defineProperty(TrackPoint, "IDX_COURSE", 6);
_defineProperty(TrackPoint, "IDX_SPEED", 7);
_defineProperty(TrackPoint, "IDX_VIEWPORT", 8);
_defineProperty(TrackPoint, "IDX_INCLINATION", 9);
//# sourceMappingURL=track-point.js.map