"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feature_1 = __importDefault(require("./feature"));
const form_values_1 = __importDefault(require("./values/form-values"));
const text_utils_1 = __importDefault(require("./utils/text-utils"));
const date_utils_1 = __importDefault(require("./utils/date-utils"));
const status_value_1 = __importDefault(require("./values/status-value"));
const uuid_1 = __importDefault(require("uuid"));
const load_object_1 = __importDefault(require("./load-object"));
class Record extends feature_1.default {
    constructor(attributes, form) {
        super();
        this._form = form || null;
        this.updateFromAPIAttributes(attributes);
    }
    get isRecord() {
        return true;
    }
    get isRepeatable() {
        return false;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get form() {
        return this._form;
    }
    get version() {
        return this._version;
    }
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    set updatedAt(updatedAt) {
        this._updatedAt = updatedAt;
    }
    get clientCreatedAt() {
        return this._clientCreatedAt;
    }
    set clientCreatedAt(createdAt) {
        this._clientCreatedAt = createdAt;
    }
    get clientUpdatedAt() {
        return this._clientUpdatedAt;
    }
    set clientUpdatedAt(updatedAt) {
        this._clientUpdatedAt = updatedAt;
    }
    get formValues() {
        if (this._formValues == null) {
            this._formValues = new form_values_1.default(this._form, this._formValuesJSON);
        }
        return this._formValues;
    }
    get hasCoordinate() {
        return this._latitude != null && this._longitude != null;
    }
    get geometry() {
        return this._geometry;
    }
    set geometry(geometry) {
        this._geometry = geometry;
    }
    get changeset() {
        return this._changeset;
    }
    set changeset(changeset) {
        this._changesetID = changeset.id;
        this._changeset = changeset;
    }
    get changesetID() {
        return this._changesetID;
    }
    loadChangeset(dataSource, callback) {
        return (0, load_object_1.default)(this, dataSource, 'changeset', 'getChangeset', callback);
    }
    toJSON({ simple } = {}) {
        const json = {};
        json.form_id = this._form.id;
        json.id = this.id || null;
        json.version = this._version != null ? this._version : null;
        json.created_at = date_utils_1.default.formatISOTimestamp(this.createdAt);
        json.updated_at = date_utils_1.default.formatISOTimestamp(this.updatedAt);
        json.client_created_at = date_utils_1.default.formatISOTimestamp(this.clientCreatedAt);
        json.client_updated_at = date_utils_1.default.formatISOTimestamp(this.clientUpdatedAt);
        json.form_values = simple ? this.formValues.toSimpleJSON() : this.formValues.toJSON();
        json.latitude = this._latitude != null ? this._latitude : null;
        json.longitude = this._longitude != null ? this._longitude : null;
        json.project_id = this._projectID || null;
        json.assigned_to_id = this._assignedToID || null;
        json.status = this._status || null;
        json.created_by_id = this._createdByID || null;
        json.created_by = this._createdByName || null;
        json.updated_by_id = this._updatedByID || null;
        json.updated_by = this._updatedBy || null;
        json.horizontal_accuracy = this._horizontalAccuracy != null ? this._horizontalAccuracy : null;
        json.vertical_accuracy = this._verticalAccuracy != null ? this._verticalAccuracy : null;
        json.speed = this._speed != null ? this._speed : null;
        json.course = this._course != null ? this._course : null;
        if (this._altitude != null) {
            json.altitude = this._altitude;
        }
        if (this._changesetID) {
            json.changeset_id = this._changesetID;
        }
        json.created_location = this.createdLocation;
        json.updated_location = this.updatedLocation;
        json.created_duration = this.createdDuration;
        json.updated_duration = this.updatedDuration;
        json.edited_duration = this.editedDuration;
        json.geometry = this.geometry;
        return json;
    }
    updateFromAPIAttributes(attrs) {
        const attributes = attrs || {};
        this._id = attributes.id || uuid_1.default.v4();
        this._version = attributes.version != null ? attributes.version : null;
        this._createdAt = date_utils_1.default.parseISOTimestamp(attributes.created_at);
        this._updatedAt = date_utils_1.default.parseISOTimestamp(attributes.updated_at);
        this._clientCreatedAt = date_utils_1.default.parseISOTimestamp(attributes.client_created_at);
        this._clientUpdatedAt = date_utils_1.default.parseISOTimestamp(attributes.client_updated_at);
        this._formValuesJSON = attributes.form_values || {};
        this._latitude = attributes.latitude != null ? attributes.latitude : null;
        this._longitude = attributes.longitude != null ? attributes.longitude : null;
        this._projectID = attributes.project_id || null;
        this._projectName = attributes.project || null;
        this._assignedToID = attributes.assigned_to_id || null;
        this._assignedToName = attributes.assigned_to || null;
        this._status = attributes.status || null;
        this._createdByID = attributes.created_by_id || null;
        this._createdByName = attributes.created_by || null;
        this._updatedByID = attributes.updated_by_id || null;
        this._updatedByName = attributes.updated_by || null;
        this._horizontalAccuracy = attributes.horizontal_accuracy != null ? attributes.horizontal_accuracy : null;
        this._verticalAccuracy = attributes.vertical_accuracy != null ? attributes.vertical_accuracy : null;
        this._altitude = attributes.altitude != null ? attributes.altitude : null;
        this._speed = attributes.speed != null ? attributes.speed : null;
        this._course = attributes.course != null ? attributes.course : null;
        this._changesetID = attributes.changeset_id || null;
        this._createdDuration = attributes.created_duration != null ? attributes.created_duration : null;
        this._updatedDuration = attributes.updated_duration != null ? attributes.updated_duration : null;
        this._editedDuration = attributes.edited_duration != null ? attributes.edited_duration : null;
        const createdLocation = attributes.created_location;
        this._createdLatitude = attributes.created_latitude != null ? attributes.created_latitude : null;
        this._createdLongitude = attributes.created_longitude != null ? attributes.created_longitude : null;
        this._createdAltitude = attributes.created_altitude != null ? attributes.created_altitude : null;
        this._createdAccuracy = attributes.created_horizontal_accuracy != null ? attributes.created_horizontal_accuracy : null;
        if (createdLocation) {
            this._createdLatitude = createdLocation.latitude;
            this._createdLongitude = createdLocation.longitude;
            this._createdAltitude = createdLocation.altitude;
            this._createdAccuracy = createdLocation.horizontal_accuracy;
        }
        const updatedLocation = attributes.updated_location;
        this._updatedLatitude = attributes.updated_latitude != null ? attributes.updated_latitude : null;
        this._updatedLongitude = attributes.updated_longitude != null ? attributes.updated_longitude : null;
        this._updatedAltitude = attributes.updated_altitude != null ? attributes.updated_altitude : null;
        this._updatedAccuracy = attributes.updated_horizontal_accuracy != null ? attributes.updated_horizontal_accuracy : null;
        if (updatedLocation) {
            this._updatedLatitude = updatedLocation.latitude;
            this._updatedLongitude = updatedLocation.longitude;
            this._updatedAltitude = updatedLocation.altitude;
            this._updatedAccuracy = updatedLocation.horizontal_accuracy;
        }
        if (attributes.geometry) {
            this._geometry = attributes.geometry;
        }
    }
    updateTimestamps() {
        const now = new Date();
        if (this.clientCreatedAt == null) {
            this.clientCreatedAt = now;
        }
        this.clientUpdatedAt = now;
    }
    get isGeometryEnabled() {
        return this.form.isGeometryEnabled;
    }
    get(key, formValues) {
        if (key === '@status') {
            return this.statusValue;
        }
        return formValues.get(key);
    }
    set(key, value, formValues) {
        if (key === '@status') {
            this.status = value.textValue;
            return;
        }
        formValues.set(key, value);
    }
    get statusValue() {
        return new status_value_1.default(this.form.statusField, this.status);
    }
    get searchableValue() {
        return this.formValues.searchableValue;
    }
    get displayValue() {
        const titleFieldKeys = this.form.titleFieldKeys;
        const titles = [];
        for (const fieldKey of titleFieldKeys) {
            const value = this.formValues.get(fieldKey);
            if (value) {
                const displayValue = value.displayValue;
                if (text_utils_1.default.isPresent(displayValue)) {
                    titles.push(displayValue);
                }
            }
        }
        return titles.join(', ');
    }
    get isStatusFieldEnabled() {
        // invisible if there are no statuses or the status field is marked as hidden
        if (this.form.statusField.choices.length === 0 || this.form.statusField.isHidden) {
            return false;
        }
        // invisible if it's readonly and there's no status (nothing for the user to read)
        if (this.status == null && this.form.statusField.isReadOnly) {
            return false;
        }
        return this.form.statusField.isEnabled;
    }
    get formID() {
        return this.form ? this.form.id : null;
    }
    get projectName() {
        return this._projectName;
    }
    get projectID() {
        return this._projectID;
    }
    set projectID(id) {
        if (id !== this._projectID) {
            this._projectID = id;
            this._projectName = null;
        }
    }
    set project(project) {
        if (project) {
            this._projectID = project.id;
            this._projectName = project.name;
        }
        else {
            this._projectID = null;
            this._projectName = null;
        }
    }
    get assignedToName() {
        return this._assignedToName;
    }
    get assignedToID() {
        return this._assignedToID;
    }
    set assignedTo(user) {
        if (user) {
            this._assignedToID = user.id;
            this._assignedToName = user.fullName;
        }
        else {
            this._assignedToID = null;
            this._assignedToName = null;
        }
    }
    set assignedToID(id) {
        if (id !== this._assignedToID) {
            this._assignedToID = id;
            this._assignedToName = null;
        }
    }
    get createdBy() {
        return this._createdBy;
    }
    get createdByID() {
        return this._createdByID;
    }
    get createdByName() {
        return this._createdByName;
    }
    get updatedBy() {
        return this._updatedBy;
    }
    get updatedByID() {
        return this._updatedByID;
    }
    get updatedByName() {
        return this._updatedByName;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(latitude) {
        this._latitude = latitude;
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(longitude) {
        this._longitude = longitude;
    }
    get horizontalAccuracy() {
        return this._horizontalAccuracy;
    }
    set horizontalAccuracy(accuracy) {
        this._horizontalAccuracy = accuracy;
    }
    get verticalAccuracy() {
        return this._verticalAccuracy;
    }
    set verticalAccuracy(accuracy) {
        this._verticalAccuracy = accuracy;
    }
    get altitude() {
        return this._altitude;
    }
    set altitude(altitude) {
        this._altitude = altitude;
    }
    get speed() {
        return this._speed;
    }
    set speed(speed) {
        this._speed = speed;
    }
    get course() {
        return this._course;
    }
    set course(course) {
        this._course = course;
    }
    get geometryAsGeoJSON() {
        if (this.isGeometryEnabled) {
            if (this.hasGeometry) {
                console.log("Returning Geometry");
                return this.geometry;
            }
            if (this.hasCoordinate) {
                console.log("Returning coordinates because !hasGeometry");
                return this.buildPointFromLatLong();
            }
        }
        if (this.hasCoordinate) {
            console.log("Returning coordinates because !isGeometryEnabled");
            return this.buildPointFromLatLong();
        }
        console.log("I got nothin'");
        return null;
    }
    buildPointFromLatLong() {
        return {
            type: 'Point',
            coordinates: [
                this.longitude,
                this.latitude,
            ],
        };
    }
    get createdDuration() {
        return this._createdDuration;
    }
    set createdDuration(value) {
        this._createdDuration = (value != null ? +value : null);
    }
    get updatedDuration() {
        return this._updatedDuration;
    }
    set updatedDuration(value) {
        this._updatedDuration = (value != null ? +value : null);
    }
    get editedDuration() {
        return this._editedDuration;
    }
    set editedDuration(value) {
        this._editedDuration = (value != null ? +value : null);
    }
    get createdLatitude() {
        return this._createdLatitude;
    }
    get createdLongitude() {
        return this._createdLongitude;
    }
    get createdAltitude() {
        return this._createdAltitude;
    }
    get createdAccuracy() {
        return this._createdAccuracy;
    }
    set createdLatitude(value) {
        this._createdLatitude = (value != null ? +value : null);
    }
    set createdLongitude(value) {
        this._createdLongitude = (value != null ? +value : null);
    }
    set createdAltitude(value) {
        this._createdAltitude = (value != null ? +value : null);
    }
    set createdAccuracy(value) {
        this._createdAccuracy = (value != null ? +value : null);
    }
    get updatedLatitude() {
        return this._updatedLatitude;
    }
    get updatedLongitude() {
        return this._updatedLongitude;
    }
    get updatedAltitude() {
        return this._updatedAltitude;
    }
    get updatedAccuracy() {
        return this._updatedAccuracy;
    }
    set updatedLatitude(value) {
        this._updatedLatitude = (value != null ? +value : null);
    }
    set updatedLongitude(value) {
        this._updatedLongitude = (value != null ? +value : null);
    }
    set updatedAltitude(value) {
        this._updatedAltitude = (value != null ? +value : null);
    }
    set updatedAccuracy(value) {
        this._updatedAccuracy = (value != null ? +value : null);
    }
    get hasCreatedCoordinate() {
        return this.createdLatitude != null && this.createdLongitude != null;
    }
    get hasUpdatedCoordinate() {
        return this.updatedLatitude != null && this.updatedLongitude != null;
    }
    get createdLocation() {
        if (this.hasCreatedCoordinate) {
            return {
                latitude: this.createdLatitude,
                longitude: this.createdLongitude,
                altitude: this.createdAltitude,
                horizontal_accuracy: this.createdAccuracy
            };
        }
        return null;
    }
    get updatedLocation() {
        if (this.hasUpdatedCoordinate) {
            return {
                latitude: this.updatedLatitude,
                longitude: this.updatedLongitude,
                altitude: this.updatedAltitude,
                horizontal_accuracy: this.updatedAccuracy
            };
        }
        return null;
    }
    updateFromActionAttributes(attributes, role) {
        for (const dataName of Object.keys(attributes)) {
            switch (dataName) {
                case 'project_id': {
                    if (attributes.project_id && role.canChangeProject) {
                        this.projectID = attributes.project_id;
                    }
                    break;
                }
                case 'assigned_to_id': {
                    if (attributes.assigned_to_id && role.canAssignRecords) {
                        this.assignedToID = attributes.assigned_to_id;
                    }
                    break;
                }
                case 'status': {
                    if (attributes.status && role.canChangeStatus) {
                        this.status = attributes.status;
                    }
                    break;
                }
                case 'latitude': {
                    if (attributes.latitude != null && attributes.latitude >= -90 && attributes.latitude <= 90) {
                        this.latitude = +attributes.latitude;
                    }
                    break;
                }
                case 'longitude': {
                    if (attributes.longitude != null && attributes.longitude >= -180 && attributes.longitude <= 180) {
                        this.longitude = +attributes.longitude;
                    }
                    break;
                }
                default: {
                    const element = this.form.elementsByDataName[dataName];
                    const value = attributes[dataName];
                    if (element && value != null) {
                        const formValue = this.formValues.createValueFromString(element, value);
                        if (formValue) {
                            this.formValues.set(element.key, formValue);
                        }
                    }
                    break;
                }
            }
        }
    }
}
exports.default = Record;
//# sourceMappingURL=record.js.map