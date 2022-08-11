export default class Feature {
    get id(): void;
    get createdAt(): void;
    get updatedAt(): void;
    get formValues(): void;
    get hasCoordinate(): void;
    get isGeometryEnabled(): void;
    get displayValue(): void;
    get searchableValue(): void;
    toJSON(): void;
    updateTimetamps(): void;
    get createdDuration(): void;
    get updatedDuration(): void;
    get editedDuration(): void;
    get hasCreatedCoordinate(): void;
    get hasUpdatedCoordinate(): void;
}
