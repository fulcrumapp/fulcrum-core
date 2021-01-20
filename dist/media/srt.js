"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.padstart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SRT =
/*#__PURE__*/
function () {
  function SRT() {}

  SRT.render = function render(tracks) {
    return new SRT().render(tracks);
  };

  var _proto = SRT.prototype;

  _proto.timestamp = function timestamp(t) {
    var x = t - this._firstTimestamp;
    var ms = (0, _lodash["default"])(Math.floor(x % 1000), 2, '0');
    x /= 1000;
    var ss = (0, _lodash["default"])(Math.floor(x % 60), 2, '0');
    x /= 60;
    var mm = (0, _lodash["default"])(Math.floor(x % 60), 2, '0');
    x /= 60;
    var hh = (0, _lodash["default"])(Math.floor(x % 24), 2, '0');
    return hh + ":" + mm + ":" + ss + "," + ms;
  };

  _proto.render = function render(tracks) {
    this._firstTimestamp = tracks[0].segments[0].points[0].time;
    var parts = [];

    for (var _iterator = tracks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var track = _ref;

      for (var _iterator2 = track.segments, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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
          parts.push(this.srtEntry(point, segment.points[parts.length + 1], parts.length + 1));
        }
      }
    }

    return parts.join('\n\n').trim();
  };

  _proto.srtEntry = function srtEntry(point, nextPoint, number) {
    return ("\n" + number + "\n" + this.timestamp(point.time) + " " + (nextPoint != null ? '--> ' + this.timestamp(nextPoint.time) : '') + "\n" + this.formatText(point) + "\n").trim();
  };

  _proto.formatText = function formatText(point) {
    return [new Date(point.time).toISOString().replace('T', ' ').replace('Z', '').replace(/\.[\d]{3}/, ''), point.latitude != null ? point.latitude.toFixed(6) : '', point.longitude != null ? point.longitude.toFixed(6) : '', this.formatAltitude(point), this.formatSpeed(point)].join(', ');
  };

  _proto.formatAltitude = function formatAltitude(point) {
    if (point.altitude == null) {
      return null;
    }

    var altitude = point.altitude.toFixed(0);
    return (point.altitude > 0 ? '+' + altitude : '-' + altitude) + 'm';
  };

  _proto.formatSpeed = function formatSpeed(point) {
    if (point.speed == null) {
      return null;
    }

    var speed = (point.speed * 2.23694).toFixed(0);
    return speed + 'mph';
  };

  return SRT;
}();

exports["default"] = SRT;
//# sourceMappingURL=srt.js.map