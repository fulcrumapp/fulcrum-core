"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _lodash = _interopRequireDefault(require("lodash.padstart"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var SRT = /*#__PURE__*/function () {
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
    for (var _iterator = _createForOfIteratorHelperLoose(tracks), _step; !(_step = _iterator()).done;) {
      var track = _step.value;
      for (var _iterator2 = _createForOfIteratorHelperLoose(track.segments), _step2; !(_step2 = _iterator2()).done;) {
        var segment = _step2.value;
        for (var _iterator3 = _createForOfIteratorHelperLoose(segment.points), _step3; !(_step3 = _iterator3()).done;) {
          var point = _step3.value;
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