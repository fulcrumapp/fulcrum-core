"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GPX {
    static render(tracks) {
        return new GPX().render(tracks);
    }
    render(tracks) {
        const gpx = [];
        gpx.push(this.gpxStart());
        gpx.push(this.gpxTracks(tracks));
        gpx.push(this.gpxEnd());
        return gpx.join('\n').trim();
    }
    timestamp(t) {
        if (t == null) {
            return null;
        }
        return new Date(+t).toISOString();
    }
    gpxStart() {
        return `
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx xmlns="http://www.topografix.com/GPX/1/1"
     xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3"
     xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd"
     creator="Fulcrum"
     version="1.1">
<metadata>
  <link href="http://fulcrumapp.com">
    <text>Fulcrum</text>
  </link>
</metadata>
`;
    }
    gpxTracks(tracks) {
        return tracks.map((track) => {
            if (track.segments.length) {
                const gpx = [];
                gpx.push(this.gpxTrackStart(track));
                gpx.push(this.gpxTrackSegments(track));
                gpx.push(this.gpxTrackEnd(track));
                return gpx.join('\n');
            }
            return null;
        }).filter(o => o).join('\n');
    }
    gpxTrackSegments(track) {
        return track.segments.map((segment) => {
            const gpx = [];
            gpx.push(this.gpxTrackSegmentStart(track));
            gpx.push(this.gpxTrackPoints(segment));
            gpx.push(this.gpxTrackSegmentEnd());
            return gpx.join('\n');
        });
    }
    gpxTrackPoints(track) {
        return track.locations.map((point) => {
            return this.gpxTrackPoint(point);
        }).join('\n');
    }
    gpxTrackPoint(point) {
        return `
<trkpt lat="${point.latitude}" lon="${point.longitude}">
<ele>${point.altitude}</ele>
<time>${this.timestamp(point.time)}</time>
</trkpt>
`;
    }
    gpxTrackStart(track) {
        return `
<trk>
  <name>${track.id}</name>
`;
    }
    gpxTrackSegmentStart() {
        return '<trkseg>';
    }
    gpxTrackSegmentEnd() {
        return '</trkseg>';
    }
    gpxTrackEnd() {
        return '</trk>';
    }
    gpxEnd() {
        return '</gpx>';
    }
}
exports.default = GPX;
//# sourceMappingURL=gpx.js.map