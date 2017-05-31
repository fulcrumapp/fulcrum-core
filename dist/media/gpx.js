'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GPX = function () {
  function GPX() {
    _classCallCheck(this, GPX);
  }

  GPX.render = function render(tracks) {
    return new GPX().render(tracks);
  };

  GPX.prototype.render = function render(tracks) {
    var gpx = [];

    gpx.push(this.gpxStart());
    gpx.push(this.gpxTracks(tracks));
    gpx.push(this.gpxEnd());

    return gpx.join('\n').trim();
  };

  GPX.prototype.timestamp = function timestamp(t) {
    return new Date(+t).toISOString();
  };

  GPX.prototype.gpxStart = function gpxStart() {
    return '\n<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<gpx xmlns="http://www.topografix.com/GPX/1/1"\n     xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3"\n     xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"\n     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd"\n     creator="Fulcrum"\n     version="1.1">\n<metadata>\n  <link href="http://fulcrumapp.com">\n    <text>Fulcrum</text>\n  </link>\n</metadata>\n';
  };

  GPX.prototype.gpxTracks = function gpxTracks(tracks) {
    var _this = this;

    return tracks.map(function (track) {
      if (track.segments.length) {
        var gpx = [];

        gpx.push(_this.gpxTrackStart(track));
        gpx.push(_this.gpxTrackSegments(track));
        gpx.push(_this.gpxTrackEnd(track));

        return gpx.join('\n');
      }

      return null;
    }).filter(function (o) {
      return o;
    }).join('\n');
  };

  GPX.prototype.gpxTrackSegments = function gpxTrackSegments(track) {
    var _this2 = this;

    return track.segments.map(function (segment) {
      var gpx = [];

      gpx.push(_this2.gpxTrackSegmentStart(track));
      gpx.push(_this2.gpxTrackPoints(segment));
      gpx.push(_this2.gpxTrackSegmentEnd());

      return gpx.join('\n');
    });
  };

  GPX.prototype.gpxTrackPoints = function gpxTrackPoints(track) {
    var _this3 = this;

    return track.locations.map(function (point) {
      return _this3.gpxTrackPoint(point);
    }).join('\n');
  };

  GPX.prototype.gpxTrackPoint = function gpxTrackPoint(point) {
    return '\n<trkpt lat="' + point.latitude + '" lon="' + point.longitude + '">\n<ele>' + point.altitude + '</ele>\n<time>' + this.timestamp(point.time) + '</time>\n</trkpt>\n';
  };

  GPX.prototype.gpxTrackStart = function gpxTrackStart(track) {
    return '\n<trk>\n  <name>' + track.id + '</name>\n';
  };

  GPX.prototype.gpxTrackSegmentStart = function gpxTrackSegmentStart() {
    return '<trkseg>';
  };

  GPX.prototype.gpxTrackSegmentEnd = function gpxTrackSegmentEnd() {
    return '</trkseg>';
  };

  GPX.prototype.gpxTrackEnd = function gpxTrackEnd() {
    return '</trk>';
  };

  GPX.prototype.gpxEnd = function gpxEnd() {
    return '</gpx>';
  };

  return GPX;
}();

exports.default = GPX;
//# sourceMappingURL=gpx.js.map