"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var KML = /*#__PURE__*/function () {
  function KML() {}

  KML.render = function render(tracks) {
    return new KML().render(tracks);
  };

  var _proto = KML.prototype;

  _proto.timestamp = function timestamp(t) {
    if (t == null) {
      return null;
    }

    return new Date(+t).toISOString();
  };

  _proto.render = function render(tracks) {
    var kml = [];
    kml.push(this.kmlStart());
    kml.push(this.kmlStyles());
    kml.push(this.kmlPlacemarks(tracks));
    kml.push(this.kmlEnd());
    return kml.join('\n').trim();
  };

  _proto.kmlPlacemarks = function kmlPlacemarks(tracks) {
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

  _proto.kmlStart = function kmlStart() {
    return "\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\">\n<Document>\n";
  };

  _proto.kmlEnd = function kmlEnd() {
    return '</Document></kml>';
  };

  _proto.kmlStyles = function kmlStyles() {
    return "\n<Style id=\"line\">\n  <LineStyle>\n    <color>c000ffff</color>\n    <width>4</width>\n  </LineStyle>\n</Style>\n";
  };

  _proto.kmlPlacemarkStart = function kmlPlacemarkStart() {
    return '<Placemark>';
  };

  _proto.kmlPlacemarkEnd = function kmlPlacemarkEnd() {
    return '</Placemark>';
  };

  _proto.kmlPlacemarkName = function kmlPlacemarkName(track) {
    return "<name>" + (track.isValid ? this.timestamp(track.firstLocation.time) : '') + "</name>";
  };

  _proto.kmlPlacemarkStyle = function kmlPlacemarkStyle(track) {
    return '<styleUrl>#line</styleUrl>';
  };

  _proto.kmlPlacemarkMultiLineString = function kmlPlacemarkMultiLineString(track) {
    var _this2 = this;

    var lineStrings = track.segments.map(function (segment) {
      return _this2.kmlPlacemarkLineString(segment);
    });
    return "<MultiGeometry>" + lineStrings.join('\n') + "</MultiGeometry>";
  };

  _proto.kmlPlacemarkLineString = function kmlPlacemarkLineString(segment) {
    var coordinates = segment.locations.map(function (point) {
      return [point.longitude, point.latitude, point.altitude].join(',');
    }).join(' ');
    return "<LineString>" + this.kmlPlacemarkLineStringProperties() + "<coordinates>" + coordinates + "</coordinates></LineString>";
  };

  _proto.kmlPlacemarkLineStringProperties = function kmlPlacemarkLineStringProperties() {
    return '<extrude>1</extrude><gx:altitudeMode>clampToGround</gx:altitudeMode>';
  };

  _proto.kmlPlacemarkExtendedData = function kmlPlacemarkExtendedData(track) {
    var data = [];
    data.push(this.kmlExtendedDataStart());
    data.push(this.kmlExtendedDataDate(track));
    data.push(this.kmlExtendedDataName(track));
    data.push(this.kmlExtendedDataLink(track));
    data.push(this.kmlExtendedDataEnd());
    return data.join('\n');
  };

  _proto.kmlExtendedDataStart = function kmlExtendedDataStart() {
    return '<ExtendedData>';
  };

  _proto.kmlExtendedDataDate = function kmlExtendedDataDate(track) {
    return "<Data name=\"Date\"><value>" + (track.isValid ? this.timestamp(track.firstLocation.time) : '') + "</value></Data>";
  };

  _proto.kmlExtendedDataEnd = function kmlExtendedDataEnd() {
    return '</ExtendedData>';
  };

  _proto.kmlExtendedDataName = function kmlExtendedDataName(track) {
    return "<Data name=\"Name\"><value><![CDATA[" + track.id + "]]></value></Data>";
  };

  _proto.kmlExtendedDataLink = function kmlExtendedDataLink(track) {
    return "<Data name=\"Link\"><value><![CDATA[<a href=\"javascript:window.open('about:blank');\" onclick=\"window.open('" + this.kmlExtendedDataURL(track) + "')\" target=\"_new\">View Video</a>]]></value></Data>";
  };

  _proto.kmlExtendedDataURL = function kmlExtendedDataURL(track) {
    return "https://web.fulcrumapp.com/videos/" + track.id;
  };

  return KML;
}();

exports["default"] = KML;
//# sourceMappingURL=kml.js.map