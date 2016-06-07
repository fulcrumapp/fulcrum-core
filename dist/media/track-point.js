"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var TrackPoint = function () {
  function TrackPoint(values) {
    _classCallCheck(this, TrackPoint);

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

TrackPoint.IDX_TIME = 0;
TrackPoint.IDX_LATITUDE = 1;
TrackPoint.IDX_LONGITUDE = 2;
TrackPoint.IDX_ALTITUDE = 3;
TrackPoint.IDX_HORIZONTAL_ACCURACY = 4;
TrackPoint.IDX_VERTICAL_ACCURACY = 5;
TrackPoint.IDX_COURSE = 6;
TrackPoint.IDX_SPEED = 7;
TrackPoint.IDX_VIEWPORT = 8;
TrackPoint.IDX_INCLINATION = 9;
exports.default = TrackPoint;
//# sourceMappingURL=track-point.js.map