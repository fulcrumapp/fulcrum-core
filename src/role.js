export default class Role {
  constructor(attributes) {
    attributes = attributes || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this._attributes = attributes;

    this._canChangeStatus = !!attributes.can_change_status;
    this._canChangeProject = !!attributes.can_change_project;
    this._canChangeAssignment = !!attributes.can_assign_records;
    this._canRunReports = !!attributes.can_run_reports;
    this._canDeleteRecords = !!attributes.can_delete_records;
  }

  get canChangeStatus() {
    return this._canChangeStatus;
  }

  get canChangeProject() {
    return this._canChangeProject;
  }

  get canChangeAssignment() {
    return this._canChangeAssignment;
  }

  get canDeleteRecords() {
    return this._canDeleteRecords;
  }

  get canRunReports() {
    return this._canRunReports;
  }
}
