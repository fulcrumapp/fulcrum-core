export default class SRT {
    static render(tracks: any): string;
    timestamp(t: any): string;
    render(tracks: any): string;
    _firstTimestamp: any;
    srtEntry(point: any, nextPoint: any, number: any): string;
    formatText(point: any): string;
    formatAltitude(point: any): string | null;
    formatSpeed(point: any): string | null;
}
