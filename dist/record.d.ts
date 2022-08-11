export default class Record extends Feature {
    constructor(attributes: any, form: any);
    _form: any;
    get isRecord(): boolean;
    get isRepeatable(): boolean;
    set id(arg: any);
    get id(): any;
    _id: any;
    get form(): any;
    get version(): any;
    set createdAt(arg: any);
    get createdAt(): any;
    _createdAt: any;
    set updatedAt(arg: any);
    get updatedAt(): any;
    _updatedAt: any;
    set clientCreatedAt(arg: any);
    get clientCreatedAt(): any;
    _clientCreatedAt: any;
    set clientUpdatedAt(arg: any);
    get clientUpdatedAt(): any;
    _clientUpdatedAt: any;
    get formValues(): FormValues;
    _formValues: FormValues | undefined;
    get hasCoordinate(): boolean;
    set changeset(arg: any);
    get changeset(): any;
    _changesetID: any;
    _changeset: any;
    get changesetID(): any;
    loadChangeset(dataSource: any, callback: any): void;
    toJSON({ simple }?: {
        simple: any;
    }): {
        form_id: any;
        id: any;
        version: any;
        created_at: any;
        updated_at: any;
        client_created_at: any;
        client_updated_at: any;
        form_values: {};
        latitude: any;
        longitude: any;
        project_id: any;
        assigned_to_id: any;
        status: any;
        created_by_id: any;
        created_by: any;
        updated_by_id: any;
        updated_by: any;
        horizontal_accuracy: any;
        vertical_accuracy: any;
        speed: any;
        course: any;
        altitude: any;
        changeset_id: any;
        created_location: {
            latitude: any;
            longitude: any;
            altitude: any;
            horizontal_accuracy: any;
        } | null;
        updated_location: {
            latitude: any;
            longitude: any;
            altitude: any;
            horizontal_accuracy: any;
        } | null;
        created_duration: any;
        updated_duration: any;
        edited_duration: any;
    };
    updateFromAPIAttributes(attrs: any): void;
    _version: any;
    _formValuesJSON: any;
    _latitude: any;
    _longitude: any;
    _projectID: any;
    _projectName: any;
    _assignedToID: any;
    _assignedToName: any;
    _status: any;
    _createdByID: any;
    _createdByName: any;
    _updatedByID: any;
    _updatedByName: any;
    _horizontalAccuracy: any;
    _verticalAccuracy: any;
    _altitude: any;
    _speed: any;
    _course: any;
    _createdDuration: any;
    _updatedDuration: any;
    _editedDuration: any;
    _createdLatitude: any;
    _createdLongitude: any;
    _createdAltitude: any;
    _createdAccuracy: any;
    _updatedLatitude: any;
    _updatedLongitude: any;
    _updatedAltitude: any;
    _updatedAccuracy: any;
    updateTimestamps(): void;
    get isGeometryEnabled(): any;
    get(key: any, formValues: any): any;
    set(key: any, value: any, formValues: any): void;
    set status(arg: any);
    get status(): any;
    get statusValue(): StatusValue;
    get searchableValue(): string;
    get displayValue(): string;
    get isStatusFieldEnabled(): any;
    get formID(): any;
    get projectName(): any;
    set projectID(arg: any);
    get projectID(): any;
    set project(arg: any);
    get assignedToName(): any;
    set assignedToID(arg: any);
    get assignedToID(): any;
    set assignedTo(arg: any);
    get createdBy(): any;
    get createdByID(): any;
    get createdByName(): any;
    get updatedBy(): any;
    get updatedByID(): any;
    get updatedByName(): any;
    set latitude(arg: any);
    get latitude(): any;
    set longitude(arg: any);
    get longitude(): any;
    set horizontalAccuracy(arg: any);
    get horizontalAccuracy(): any;
    set verticalAccuracy(arg: any);
    get verticalAccuracy(): any;
    set altitude(arg: any);
    get altitude(): any;
    set speed(arg: any);
    get speed(): any;
    set course(arg: any);
    get course(): any;
    get geometryAsGeoJSON(): {
        type: string;
        coordinates: any[];
    } | null;
    set createdDuration(arg: any);
    get createdDuration(): any;
    set updatedDuration(arg: any);
    get updatedDuration(): any;
    set editedDuration(arg: any);
    get editedDuration(): any;
    set createdLatitude(arg: any);
    get createdLatitude(): any;
    set createdLongitude(arg: any);
    get createdLongitude(): any;
    set createdAltitude(arg: any);
    get createdAltitude(): any;
    set createdAccuracy(arg: any);
    get createdAccuracy(): any;
    set updatedLatitude(arg: any);
    get updatedLatitude(): any;
    set updatedLongitude(arg: any);
    get updatedLongitude(): any;
    set updatedAltitude(arg: any);
    get updatedAltitude(): any;
    set updatedAccuracy(arg: any);
    get updatedAccuracy(): any;
    get hasCreatedCoordinate(): boolean;
    get hasUpdatedCoordinate(): boolean;
    get createdLocation(): {
        latitude: any;
        longitude: any;
        altitude: any;
        horizontal_accuracy: any;
    } | null;
    get updatedLocation(): {
        latitude: any;
        longitude: any;
        altitude: any;
        horizontal_accuracy: any;
    } | null;
    updateFromActionAttributes(attributes: any, role: any): void;
}
import Feature from "./feature";
import FormValues from "./values/form-values";
import StatusValue from "./values/status-value";