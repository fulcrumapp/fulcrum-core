"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackPlayer = function () {
  function TrackPlayer(track) {
    _classCallCheck(this, TrackPlayer);

    this.track = track;

    if (this.track.firstSegment) {
      this.firstTimestamp = this.track.firstSegment.firstPoint.time;
      this.lastTimestamp = this.track.lastSegment.lastPoint.time;
      this.duration = this.lastTimestamp - this.firstTimeStamp;
    }
  }

  TrackPlayer.prototype.findPreviousTrackPointIndexes = function findPreviousTrackPointIndexes(time) {
    var segmentIndex = 0;
    var pointIndex = 0;

    var timestamp = null;

    var milliseconds = time;

    for (var _iterator = this.track.segments, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var segment = _ref;

      for (var _iterator2 = segment.points, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var point = _ref2;

        timestamp = point.time;

        if (timestamp > milliseconds) {
          return [segmentIndex, Math.max(0, pointIndex - 1)];
        }

        ++pointIndex;
      }

      ++segmentIndex;
    }

    // if the video time is beyond the end of the track, return the last index
    if (milliseconds >= this.lastTimestamp) {
      return [this.track.segments.length - 1, this.track.lastSegment.points.length - 1];
    }

    return [0, 0];
  };

  TrackPlayer.prototype.findPreviousTrackPoint = function findPreviousTrackPoint(time) {
    var _findPreviousTrackPoi = this.findPreviousTrackPointIndexes(time);

    var segmentIndex = _findPreviousTrackPoi[0];
    var pointIndex = _findPreviousTrackPoi[1];

    return this.track.segments[segmentIndex].points[pointIndex];
  };

  TrackPlayer.prototype.findNextTrackPoint = function findNextTrackPoint(time) {
    var _findPreviousTrackPoi2 = this.findPreviousTrackPointIndexes(time);

    var segmentIndex = _findPreviousTrackPoi2[0];
    var pointIndex = _findPreviousTrackPoi2[1];


    if (pointIndex + 1 < this.track.segments[segmentIndex].points.length) {
      return this.track.segments[segmentIndex].points[pointIndex + 1];
    }

    return this.track.segments[segmentIndex].points[pointIndex];
  };

  TrackPlayer.prototype.point = function point(trackTime) {
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

exports.default = TrackPlayer;
//# sourceMappingURL=track-player.js.map