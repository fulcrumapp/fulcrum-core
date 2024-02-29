export default class KML {
    static render(tracks: any): string;
    timestamp(t: any): string | null;
    render(tracks: any): string;
    kmlPlacemarks(tracks: any): any;
    kmlStart(): string;
    kmlEnd(): string;
    kmlStyles(): string;
    kmlPlacemarkStart(): string;
    kmlPlacemarkEnd(): string;
    kmlPlacemarkName(track: any): string;
    kmlPlacemarkStyle(track: any): string;
    kmlPlacemarkMultiLineString(track: any): string;
    kmlPlacemarkLineString(segment: any): string;
    kmlPlacemarkLineStringProperties(): string;
    kmlPlacemarkExtendedData(track: any): string;
    kmlExtendedDataStart(): string;
    kmlExtendedDataDate(track: any): string;
    kmlExtendedDataEnd(): string;
    kmlExtendedDataName(track: any): string;
    kmlExtendedDataLink(track: any): string;
    kmlExtendedDataURL(track: any): string;
}
