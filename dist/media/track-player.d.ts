export default class TrackPlayer {
    constructor(track: any);
    track: any;
    firstTimestamp: any;
    lastTimestamp: any;
    duration: number | undefined;
    findPreviousTrackPointIndexes(time: any): number[];
    findPreviousTrackPoint(time: any): any;
    findNextTrackPoint(time: any): any;
    point(trackTime: any): {
        time: any;
        location: any[];
        course: any;
        viewport: any;
        speed: any;
        altitude: any;
        accuracy: any;
        prev: any;
        next: any;
    } | null;
}
