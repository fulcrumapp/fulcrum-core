export default class Changeset {
    constructor(attributes: any);
    updateFromAPIAttributes(attrs: any): void;
    _id: any;
    _metadata: any;
    _minLat: any;
    _maxLat: any;
    _minLon: any;
    _maxLon: any;
    _numberOfChanges: any;
    _numberOfCreates: any;
    _numberOfUpdates: any;
    _numberOfDeletes: any;
    _closedAt: Date | null | undefined;
    _closedBy: any;
    _closedByID: any;
    _createdAt: Date | null | undefined;
    _createdBy: any;
    _createdByID: any;
    _updatedAt: Date | null | undefined;
    _updatedBy: any;
    _updatedByID: any;
    _formID: any;
    toJSON(): void;
    get id(): any;
    get isClosed(): boolean;
    get createdAt(): Date | null | undefined;
    get updatedAt(): Date | null | undefined;
    get numberOfCreates(): any;
    get numberOfUpdates(): any;
    get numberOfDeletes(): any;
    get displayValue(): any;
    get application(): any;
    get metadataIndexText(): string | null;
    get metadataDescription(): any;
    get boundingBoxAsGeoJSON(): {
        type: string;
        coordinates: any[];
    } | null;
}
