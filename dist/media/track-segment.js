'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _trackPoint = require('./track-point');

var _trackPoint2 = _interopRequireDefault(_trackPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackSegment = function () {
  function TrackSegment(attributes) {
    _classCallCheck(this, TrackSegment);

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

        var point = new _trackPoint2.default(trackPoint);

        this._points.push(point);
      }
    }
  }

  _createClass(TrackSegment, [{
    key: 'points',
    get: function get() {
      return this._points;
    }
  }, {
    key: 'firstPoint',
    get: function get() {
      return this._points[0];
    }
  }, {
    key: 'lastPoint',
    get: function get() {
      return this._points[this._points.length - 1];
    }
  }, {
    key: 'locations',
    get: function get() {
      return this.points.filter(function (o) {
        return o.hasCoordinate;
      });
    }
  }]);

  return TrackSegment;
}();

exports.default = TrackSegment;
//# sourceMappingURL=track-segment.js.map