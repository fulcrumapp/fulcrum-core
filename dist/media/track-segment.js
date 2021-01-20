"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _trackPoint = _interopRequireDefault(require("./track-point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrackSegment =
/*#__PURE__*/
function () {
  function TrackSegment(attributes) {
    this._points = [];

    if (attributes.track) {
      for (var _iterator = attributes.track, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var trackPoint = _ref;
        var point = new _trackPoint["default"](trackPoint);

        this._points.push(point);
      }
    }
  }

  _createClass(TrackSegment, [{
    key: "points",
    get: function get() {
      return this._points;
    }
  }, {
    key: "firstPoint",
    get: function get() {
      return this._points[0];
    }
  }, {
    key: "lastPoint",
    get: function get() {
      return this._points[this._points.length - 1];
    }
  }, {
    key: "locations",
    get: function get() {
      return this.points.filter(function (o) {
        return o.hasCoordinate;
      });
    }
  }, {
    key: "firstLocation",
    get: function get() {
      return this.locations[0];
    }
  }, {
    key: "lastLocation",
    get: function get() {
      var locations = this.locations;
      return locations[locations.length - 1];
    }
  }]);

  return TrackSegment;
}();

exports["default"] = TrackSegment;
//# sourceMappingURL=track-segment.js.map