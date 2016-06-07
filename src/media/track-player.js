export default class TrackPlayer {
  constructor(track) {
    this.track = track;

    if (this.track.firstSegment) {
      this.firstTimestamp = this.track.firstSegment.firstPoint.time;
      this.lastTimestamp = this.track.lastSegment.lastPoint.time;
      this.duration = this.lastTimestamp - this.firstTimeStamp;
    }
  }

  findPreviousTrackPointIndexes(time) {
    let segmentIndex = 0;
    let pointIndex = 0;

    let timestamp = null;

    const milliseconds = time;

    for (const segment of this.track.segments) {
      for (const point of segment.points) {
        timestamp = point.time;

        if (timestamp > milliseconds) {
          return [ segmentIndex, Math.max(0, pointIndex - 1) ];
        }

        ++pointIndex;
      }

      ++segmentIndex;
    }

    // if the video time is beyond the end of the track, return the last index
    if (milliseconds >= this.lastTimestamp) {
      return [ this.track.segments.length - 1, this.track.lastSegment.points.length - 1 ];
    }

    return [ 0, 0 ];
  }

  findPreviousTrackPoint(time) {
    const [ segmentIndex, pointIndex ] = this.findPreviousTrackPointIndexes(time);
    return this.track.segments[segmentIndex].points[pointIndex];
  }

  findNextTrackPoint(time) {
    const [ segmentIndex, pointIndex ] = this.findPreviousTrackPointIndexes(time);

    if (pointIndex + 1 < this.track.segments[segmentIndex].points.length) {
      return this.track.segments[segmentIndex].points[pointIndex + 1];
    }

    return this.track.segments[segmentIndex].points[pointIndex];
  }

  point(trackTime) {
    if (this.track == null || this.track.segments.length === 0) {
      return null;
    }

    const time = (trackTime * 1000.0) + this.firstTimestamp;

    const lastPoint = this.findPreviousTrackPoint(time);
    const nextPoint = this.findNextTrackPoint(time);

    const lastTimestamp = lastPoint.time;
    const nextTimestamp = nextPoint.time;

    const lastLatitude = lastPoint.latitude;
    const lastLongitude = lastPoint.longitude;

    const nextLatitude = nextPoint.latitude;
    const nextLongitude = nextPoint.longitude;

    const isLastPointInvalid = lastLatitude == null || lastLongitude == null;
    const isNextPointInvalid = nextLatitude == null || nextLongitude == null;

    if (isLastPointInvalid || isNextPointInvalid) {
      return null;
    }

    const range = nextTimestamp - lastTimestamp;
    const percentage = range === 0 ? 0 : (time - lastTimestamp) / range;

    const lastLocation = [ lastPoint.latitude, lastPoint.longitude ];
    const nextLocation = [ nextPoint.latitude, nextPoint.longitude ];

    const lon = ((nextLocation[1] - lastLocation[1]) * percentage) + lastLocation[1];
    const lat = ((nextLocation[0] - lastLocation[0]) * percentage) + lastLocation[0];

    const location = [ lat, lon ];

    let headingDiff = nextPoint.viewport - lastPoint.viewport;
    let courseDiff = nextPoint.course - lastPoint.course;

    const accuracyDiff = nextPoint.horizontalAccuracy - lastPoint.horizontalAccuracy;

    const lastAltitude = lastPoint.altitude;
    const nextAltitude = nextPoint.altitude;

    const lastSpeed = lastPoint.speed;
    const nextSpeed = nextPoint.speed;

    let altitudeDiff = null;

    if (lastAltitude != null && nextAltitude != null) {
      altitudeDiff = nextAltitude - lastAltitude;
    }

    let speedDiff = null;

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

    const heading = (headingDiff * percentage) + lastPoint.viewport;
    const course = (courseDiff * percentage) + lastPoint.course;
    const accuracy = (accuracyDiff * percentage) + lastPoint.horizontalAccuracy;

    let altitude = null;
    let speed = null;

    if (altitudeDiff != null) {
      altitude = (altitudeDiff * percentage) + lastPoint.altitude;
    }

    if (speedDiff != null) {
      speed = (speedDiff * percentage) + lastPoint.speed;
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
  }
}
