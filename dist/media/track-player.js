"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TrackPlayer = /*#__PURE__*/function () {
  function TrackPlayer(track) {
    this.track = track;

    if (this.track.firstSegment) {
      this.firstTimestamp = this.track.firstSegment.firstPoint.time;
      this.lastTimestamp = this.track.lastSegment.lastPoint.time;
      this.duration = this.lastTimestamp - this.firstTimeStamp;
    }
  }

  var _proto = TrackPlayer.prototype;

  _proto.findPreviousTrackPointIndexes = function findPreviousTrackPointIndexes(time) {
    var segmentIndex = 0;
    var pointIndex = 0;
    var timestamp = null;
    var milliseconds = time;

    for (var _iterator = _createForOfIteratorHelperLoose(this.track.segments), _step; !(_step = _iterator()).done;) {
      var segment = _step.value;

      for (var _iterator2 = _createForOfIteratorHelperLoose(segment.points), _step2; !(_step2 = _iterator2()).done;) {
        var point = _step2.value;
        timestamp = point.time;

        if (timestamp > milliseconds) {
          return [segmentIndex, Math.max(0, pointIndex - 1)];
        }

        ++pointIndex;
      }

      ++segmentIndex;
    } // if the video time is beyond the end of the track, return the last index


    if (milliseconds >= this.lastTimestamp) {
      return [this.track.segments.length - 1, this.track.lastSegment.points.length - 1];
    }

    return [0, 0];
  };

  _proto.findPreviousTrackPoint = function findPreviousTrackPoint(time) {
    var _this$findPreviousTra = this.findPreviousTrackPointIndexes(time),
        segmentIndex = _this$findPreviousTra[0],
        pointIndex = _this$findPreviousTra[1];

    return this.track.segments[segmentIndex].points[pointIndex];
  };

  _proto.findNextTrackPoint = function findNextTrackPoint(time) {
    var _this$findPreviousTra2 = this.findPreviousTrackPointIndexes(time),
        segmentIndex = _this$findPreviousTra2[0],
        pointIndex = _this$findPreviousTra2[1];

    if (pointIndex + 1 < this.track.segments[segmentIndex].points.length) {
      return this.track.segments[segmentIndex].points[pointIndex + 1];
    }

    return this.track.segments[segmentIndex].points[pointIndex];
  };

  _proto.point = function point(trackTime) {
    if (this.track == null || this.track.segments.length === 0) {
      return null;
    }

    var time = trackTime * 1000.0 + this.firstTimestamp;
    var lastPoint = this.findPreviousTrackPoint(time);
    var nextPoint = this.findNextTrackPoint(time);
    var lastTimestamp = lastPoint.time;
    var nextTimestamp = nextPoint.time;
    var lastLatitude = lastPoint.latitude;
    var lastLongitude = lastPoint.longitude;
    var nextLatitude = nextPoint.latitude;
    var nextLongitude = nextPoint.longitude;
    var isLastPointInvalid = lastLatitude == null || lastLongitude == null;
    var isNextPointInvalid = nextLatitude == null || nextLongitude == null;

    if (isLastPointInvalid || isNextPointInvalid) {
      return null;
    }

    var range = nextTimestamp - lastTimestamp;
    var percentage = range === 0 ? 0 : (time - lastTimestamp) / range;
    var lastLocation = [lastPoint.latitude, lastPoint.longitude];
    var nextLocation = [nextPoint.latitude, nextPoint.longitude];
    var lon = (nextLocation[1] - lastLocation[1]) * percentage + lastLocation[1];
    var lat = (nextLocation[0] - lastLocation[0]) * percentage + lastLocation[0];
    var location = [lat, lon];
    var headingDiff = nextPoint.viewport - lastPoint.viewport;
    var courseDiff = nextPoint.course - lastPoint.course;
    var accuracyDiff = nextPoint.horizontalAccuracy - lastPoint.horizontalAccuracy;
    var lastAltitude = lastPoint.altitude;
    var nextAltitude = nextPoint.altitude;
    var lastSpeed = lastPoint.speed;
    var nextSpeed = nextPoint.speed;
    var altitudeDiff = null;

    if (lastAltitude != null && nextAltitude != null) {
      altitudeDiff = nextAltitude - lastAltitude;
    }

    var speedDiff = null;

    if (lastSpeed != null && nextSpeed != null && lastSpeed > -1 && nextSpeed > -1) {
      speedDiff = nextSpeed - lastSpeed;
    }
    /*
     When the diff between the 2 points is greater than 180, we need
    to reverse the direction of the tweening so it produces the fastest
    transition between the 2 angles. By negating the different angles we
    produce a much simpler value.
     Example 1:
      going from 30 to 350 should produce a -40 degree counterclockwise
      result, not a 320 clockwise animation
     Example 2:
      going from 350 to 30 should produce a 40 degree clockwise
      result, not a 320 counterclockwise animation
     */


    if (Math.abs(headingDiff) > 180) {
      if (nextPoint.viewport > lastPoint.viewport) {
        headingDiff = -lastPoint.viewport - (360 - nextPoint.viewport);
      } else {
        headingDiff = -(-(360 - lastPoint.viewport) - nextPoint.viewport);
      }
    }

    if (Math.abs(courseDiff) > 180) {
      if (nextPoint.course > lastPoint.course) {
        courseDiff = -lastPoint.course - (360 - nextPoint.course);
      } else {
        courseDiff = -(-(360 - lastPoint.course) - nextPoint.course);
      }
    }

    var heading = headingDiff * percentage + lastPoint.viewport;
    var course = courseDiff * percentage + lastPoint.course;
    var accuracy = accuracyDiff * percentage + lastPoint.horizontalAccuracy;
    var altitude = null;
    var speed = null;

    if (altitudeDiff != null) {
      altitude = altitudeDiff * percentage + lastPoint.altitude;
    }

    if (speedDiff != null) {
      speed = speedDiff * percentage + lastPoint.speed;
    }

    return {
      time: time,
      location: location,
      course: course,
      viewport: heading,
      speed: speed,
      altitude: altitude,
      accuracy: accuracy,
      prev: lastPoint,
      next: nextPoint
    };
  };

  return TrackPlayer;
}();

exports["default"] = TrackPlayer;
//# sourceMappingURL=track-player.js.map