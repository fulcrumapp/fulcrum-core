'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KML = function () {
  function KML() {
    _classCallCheck(this, KML);
  }

  KML.render = function render(tracks) {
    return new KML().render(tracks);
  };

  KML.prototype.timestamp = function timestamp(t) {
    if (t == null) {
      return null;
    }

    return new Date(+t).toISOString();
  };

  KML.prototype.render = function render(tracks) {
    var kml = [];

    kml.push(this.kmlStart());
    kml.push(this.kmlStyles());
    kml.push(this.kmlPlacemarks(tracks));
    kml.push(this.kmlEnd());

    return kml.join('\n').trim();
  };

  KML.prototype.kmlPlacemarks = function kmlPlacemarks(tracks) {
    var _this = this;

    return tracks.map(function (track) {
      if (track.segments.length) {
        var kml = [];

        kml.push(_this.kmlPlacemarkStart());
        kml.push(_this.kmlPlacemarkName(track));
        kml.push(_this.kmlPlacemarkStyle(track));

        if (track.segments.length === 1) {
          kml.push(_this.kmlPlacemarkLineString(track.segments[0]));
        } else {
          kml.push(_this.kmlPlacemarkMultiLineString(track));
        }

        kml.push(_this.kmlPlacemarkExtendedData(track));
        kml.push(_this.kmlPlacemarkEnd());

        return kml.join('\n');
      }

      return null;
    }).filter(function (o) {
      return o;
    }).join('\n');
  };

  KML.prototype.kmlStart = function kmlStart() {
    return '\n<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2">\n<Document>\n';
  };

  KML.prototype.kmlEnd = function kmlEnd() {
    return '</Document></kml>';
  };

  KML.prototype.kmlStyles = function kmlStyles() {
    return '\n<Style id="line">\n  <LineStyle>\n    <color>c000ffff</color>\n    <width>4</width>\n  </LineStyle>\n</Style>\n';
  };

  KML.prototype.kmlPlacemarkStart = function kmlPlacemarkStart() {
    return '<Placemark>';
  };

  KML.prototype.kmlPlacemarkEnd = function kmlPlacemarkEnd() {
    return '</Placemark>';
  };

  KML.prototype.kmlPlacemarkName = function kmlPlacemarkName(track) {
    return '<name>' + (track.isValid ? this.timestamp(track.firstLocation.time) : '') + '</name>';
  };

  KML.prototype.kmlPlacemarkStyle = function kmlPlacemarkStyle(track) {
    return '<styleUrl>#line</styleUrl>';
  };

  KML.prototype.kmlPlacemarkMultiLineString = function kmlPlacemarkMultiLineString(track) {
    var _this2 = this;

    var lineStrings = track.segments.map(function (segment) {
      return _this2.kmlPlacemarkLineString(segment);
    });

    return '<MultiGeometry>' + lineStrings.join('\n') + '</MultiGeometry>';
  };

  KML.prototype.kmlPlacemarkLineString = function kmlPlacemarkLineString(segment) {
    var coordinates = segment.locations.map(function (point) {
      return [point.longitude, point.latitude, point.altitude].join(',');
    }).join(' ');

    return '<LineString>' + this.kmlPlacemarkLineStringProperties() + '<coordinates>' + coordinates + '</coordinates></LineString>';
  };

  KML.prototype.kmlPlacemarkLineStringProperties = function kmlPlacemarkLineStringProperties() {
    return '<extrude>1</extrude><gx:altitudeMode>clampToGround</gx:altitudeMode>';
  };

  KML.prototype.kmlPlacemarkExtendedData = function kmlPlacemarkExtendedData(track) {
    var data = [];
    data.push(this.kmlExtendedDataStart());
    data.push(this.kmlExtendedDataDate(track));
    data.push(this.kmlExtendedDataName(track));
    data.push(this.kmlExtendedDataLink(track));
    data.push(this.kmlExtendedDataEnd());
    return data.join('\n');
  };

  KML.prototype.kmlExtendedDataStart = function kmlExtendedDataStart() {
    return '<ExtendedData>';
  };

  KML.prototype.kmlExtendedDataDate = function kmlExtendedDataDate(track) {
    return '<Data name="Date"><value>' + (track.isValid ? this.timestamp(track.firstLocation.time) : '') + '</value></Data>';
  };

  KML.prototype.kmlExtendedDataEnd = function kmlExtendedDataEnd() {
    return '</ExtendedData>';
  };

  KML.prototype.kmlExtendedDataName = function kmlExtendedDataName(track) {
    return '<Data name="Name"><value><![CDATA[' + track.id + ']]></value></Data>';
  };

  KML.prototype.kmlExtendedDataLink = function kmlExtendedDataLink(track) {
    return '<Data name="Link"><value><![CDATA[<a href="javascript:window.open(\'about:blank\');" onclick="window.open(\'' + this.kmlExtendedDataURL(track) + '\')" target="_new">View Video</a>]]></value></Data>';
  };

  KML.prototype.kmlExtendedDataURL = function kmlExtendedDataURL(track) {
    return 'https://web.fulcrumapp.com/videos/' + track.id;
  };

  return KML;
}();

exports.default = KML;
//# sourceMappingURL=kml.js.map