export default class GPX {
    static render(tracks: any): string;
    render(tracks: any): string;
    timestamp(t: any): string | null;
    gpxStart(): string;
    gpxTracks(tracks: any): any;
    gpxTrackSegments(track: any): any;
    gpxTrackPoints(track: any): any;
    gpxTrackPoint(point: any): string;
    gpxTrackStart(track: any): string;
    gpxTrackSegmentStart(): string;
    gpxTrackSegmentEnd(): string;
    gpxTrackEnd(): string;
    gpxEnd(): string;
}
