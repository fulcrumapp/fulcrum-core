export default class KML {
  static render(tracks) {
    return new KML().render(tracks);
  }

  timestamp(t) {
    return new Date(+t).toISOString();
  }

  render(tracks) {
    const kml = [];

    kml.push(this.kmlStart());
    kml.push(this.kmlStyles());
    kml.push(this.kmlPlacemarks(tracks));
    kml.push(this.kmlEnd());

    return kml.join('\n').trim();
  }

  kmlPlacemarks(tracks) {
    return tracks.map((track) => {
      if (track.segments.length) {
        const kml = [];

        kml.push(this.kmlPlacemarkStart());
        kml.push(this.kmlPlacemarkName(track));
        kml.push(this.kmlPlacemarkStyle(track));

        if (track.segments.length === 1) {
          kml.push(this.kmlPlacemarkLineString(track.segments[0]));
        } else {
          kml.push(this.kmlPlacemarkMultiLineString(track));
        }

        kml.push(this.kmlPlacemarkExtendedData(track));
        kml.push(this.kmlPlacemarkEnd());

        return kml.join('\n');
      }

      return null;
    }).filter(o => o).join('\n');
  }

  kmlStart() {
    return `
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2">
<Document>
`;
  }

  kmlEnd() {
    return '</Document></kml>';
  }

  kmlStyles() {
    return `
<Style id="line">
  <LineStyle>
    <color>c000ffff</color>
    <width>4</width>
  </LineStyle>
</Style>
`;
  }

  kmlPlacemarkStart() {
    return '<Placemark>';
  }

  kmlPlacemarkEnd() {
    return '</Placemark>';
  }

  kmlPlacemarkName(track) {
    return `<name>${this.timestamp(track.segments[0].locations[0].time)}</name>`;
  }

  kmlPlacemarkStyle(track) {
    return '<styleUrl>#line</styleUrl>';
  }

  kmlPlacemarkMultiLineString(track) {
    const lineStrings = track.segments.map((segment) => {
      return this.kmlPlacemarkLineString(segment);
    });

    return `<MultiGeometry>${lineStrings.join('\n')}</MultiGeometry>`;
  }

  kmlPlacemarkLineString(segment) {
    const coordinates = segment.locations.map((point) => {
      return [ point.longitude, point.latitude, point.altitude ].join(',');
    }).join(' ');

    return `<LineString>${this.kmlPlacemarkLineStringProperties()}<coordinates>${coordinates}</coordinates></LineString>`;
  }

  kmlPlacemarkLineStringProperties() {
    return '<extrude>1</extrude><gx:altitudeMode>clampToGround</gx:altitudeMode>';
  }

  kmlPlacemarkExtendedData(track) {
    const data = [];
    data.push(this.kmlExtendedDataStart());
    data.push(this.kmlExtendedDataDate(track));
    data.push(this.kmlExtendedDataName(track));
    data.push(this.kmlExtendedDataLink(track));
    data.push(this.kmlExtendedDataEnd());
    return data.join('\n');
  }

  kmlExtendedDataStart() {
    return '<ExtendedData>';
  }

  kmlExtendedDataDate(track) {
    return `<Data name="Date"><value>${this.timestamp(track.segments[0].locations[0].time)}</value></Data>`;
  }

  kmlExtendedDataEnd() {
    return '</ExtendedData>';
  }

  kmlExtendedDataName(track) {
    return `<Data name="Name"><value><![CDATA[${track.id}]]></value></Data>`;
  }

  kmlExtendedDataLink(track) {
    return `<Data name=\"Link\"><value><![CDATA[<a href=\"javascript:window.open('about:blank');\" onclick=\"window.open('${this.kmlExtendedDataURL(track)}')\" target=\"_new\">View Video</a>]]></value></Data>`;
  }

  kmlExtendedDataURL(track) {
    return `https://web.fulcrumapp.com/videos/${track.id}`;
  }
}
