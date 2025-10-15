export default class Feature {
    get id(): string | null;
    get createdAt(): Date | null;
    get updatedAt(): Date | null;
    get formValues(): any;
    get hasCoordinate(): boolean;
    get isGeometryEnabled(): boolean;
    get displayValue(): string;
    get searchableValue(): string;
    toJSON(options?: any): any;
    updateTimestamps(): void;
    get createdDuration(): number | null;
    get updatedDuration(): number | null;
    get editedDuration(): number | null;
    get hasCreatedCoordinate(): boolean;
    get hasUpdatedCoordinate(): boolean;
}
