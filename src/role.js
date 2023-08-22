import DateUtils from './utils/date-utils';

export default class Role {
  constructor(attrs) {
    this.updateFromAPIAttributes(attrs);
  }

  updateFromAPIAttributes(attrs) {
    const attributes = attrs || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._isSystem = !!attributes.is_system;
    this._isDefault = !!attributes.is_default;
    this._canManageSubscription = !!attributes.can_manage_subscription;
    this._canUpdateOrganization = !!attributes.can_update_organization;
    this._canManageMembers = !!attributes.can_manage_members;
    this._canManageGroups = !!attributes.can_manage_groups;
    this._canManageRoles = !!attributes.can_manage_roles;
    this._canManageLayers = !!attributes.can_manage_layers;
    this._canManageApps = !!attributes.can_manage_apps;
    this._canManageProjects = !!attributes.can_manage_projects;
    this._canManageChoiceLists = !!attributes.can_manage_choice_lists;
    this._canManageClassificationSets = !!attributes.can_manage_classification_sets;
    this._canChangeStatus = !!attributes.can_change_status;
    this._canChangeProject = !!attributes.can_change_project;
    this._canChangeLocation = !!attributes.can_change_location;
    this._canAssignRecords = !!attributes.can_assign_records;
    this._canRunReports = !!attributes.can_run_reports;
    this._canCreateRecords = !!attributes.can_create_records;
    this._canUpdateRecords = !!attributes.can_update_records;
    this._canDeleteRecords = !!attributes.can_delete_records;
    this._canBulkDeleteRecords = !!attributes.can_bulk_delete_records;
    this._canExportRecords = !!attributes.can_export_records;
    this._canImportRecords = !!attributes.can_import_records;
    this._canManageAuthorizations = !!attributes.can_manage_authorizations;
    this._createdAt = DateUtils.parseISOTimestamp(attributes.created_at);
    this._updatedAt = DateUtils.parseISOTimestamp(attributes.updated_at);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get isSystem() {
    return this._isSystem;
  }

  get isDefault() {
    return this._isDefault;
  }

  get canManageSubscription() {
    return this._canManageSubscription;
  }

  get canUpdateOrganization() {
    return this._canUpdateOrganization;
  }

  get canManageMembers() {
    return this._canManageMembers;
  }

  get canManageGroups() {
    return this._canManageGroups;
  }

  get canManageRoles() {
    return this._canManageRoles;
  }

  get canManageLayers() {
    return this._canManageLayers;
  }

  get canManageApps() {
    return this._canManageApps;
  }

  get canManageProjects() {
    return this._canManageProjects;
  }

  get canManageChoiceLists() {
    return this._canManageChoiceLists;
  }

  get canManageClassificationSets() {
    return this._canManageClassificationSets;
  }

  get canChangeLocation() {
    return this._canChangeLocation;
  }

  get canImportRecords() {
    return this._canImportRecords;
  }

  get canChangeStatus() {
    return this._canChangeStatus;
  }

  get canChangeProject() {
    return this._canChangeProject;
  }

  get canAssignRecords() {
    return this._canAssignRecords;
  }

  get canCreateRecords() {
    return this._canCreateRecords;
  }

  get canUpdateRecords() {
    return this._canUpdateRecords;
  }

  get canDeleteRecords() {
    return this._canDeleteRecords;
  }

  get canBulkDeleteRecords() {
    return this._canBulkDeleteRecords;
  }

  get canExportRecords() {
    return this._canExportRecords;
  }

  get canRunReports() {
    return this._canRunReports;
  }
}
