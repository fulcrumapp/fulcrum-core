"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _trackPoint = _interopRequireDefault(require("./track-point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrackSegment = /*#__PURE__*/function () {
  function TrackSegment(attributes) {
    this._points = [];

    if (attributes.track) {
      for (var _iterator = _createForOfIteratorHelperLoose(attributes.track), _step; !(_step = _iterator()).done;) {
        var trackPoint = _step.value;
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