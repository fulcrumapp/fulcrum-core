"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _dateUtils = _interopRequireDefault(require("./utils/date-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Role =
/*#__PURE__*/
function () {
  function Role(attrs) {
    this.updateFromAPIAttributes(attrs);
  }

  var _proto = Role.prototype;

  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};
    this._id = attributes.id;
    this._name = attributes.name;
    this._isSystem = !!attributes.is_system;
    this._isDefault = !!attributes.is_default;
    this._canManageSubscription = !!attributes.can_manage_subscription;
    this._canUpdateOrganization = !!attributes.can_update_organization;
    this._canManageMembers = !!attributes.can_manage_members;
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
    this._canExportRecords = !!attributes.can_export_records;
    this._canImportRecords = !!attributes.can_import_records;
    this._canAccessIssuesAndTasks = !!attributes.can_access_issues_and_tasks;
    this._canConfigureIssuesAndTasks = !!attributes.can_configure_issues_and_tasks;
    this._canManageAuthorizations = !!attributes.can_manage_authorizations;
    this._createdAt = _dateUtils["default"].parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils["default"].parseISOTimestamp(attributes.updated_at);
  };

  _createClass(Role, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "createdAt",
    get: function get() {
      return this._createdAt;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this._updatedAt;
    }
  }, {
    key: "isSystem",
    get: function get() {
      return this._isSystem;
    }
  }, {
    key: "isDefault",
    get: function get() {
      return this._isDefault;
    }
  }, {
    key: "canManageSubscription",
    get: function get() {
      return this._canManageSubscription;
    }
  }, {
    key: "canUpdateOrganization",
    get: function get() {
      return this._canUpdateOrganization;
    }
  }, {
    key: "canManageMembers",
    get: function get() {
      return this._canManageMembers;
    }
  }, {
    key: "canManageRoles",
    get: function get() {
      return this._canManageRoles;
    }
  }, {
    key: "canManageLayers",
    get: function get() {
      return this._canManageLayers;
    }
  }, {
    key: "canManageApps",
    get: function get() {
      return this._canManageApps;
    }
  }, {
    key: "canManageProjects",
    get: function get() {
      return this._canManageProjects;
    }
  }, {
    key: "canManageChoiceLists",
    get: function get() {
      return this._canManageChoiceLists;
    }
  }, {
    key: "canManageClassificationSets",
    get: function get() {
      return this._canManageClassificationSets;
    }
  }, {
    key: "canChangeLocation",
    get: function get() {
      return this._canChangeLocation;
    }
  }, {
    key: "canImportRecords",
    get: function get() {
      return this._canImportRecords;
    }
  }, {
    key: "canChangeStatus",
    get: function get() {
      return this._canChangeStatus;
    }
  }, {
    key: "canChangeProject",
    get: function get() {
      return this._canChangeProject;
    }
  }, {
    key: "canAssignRecords",
    get: function get() {
      return this._canAssignRecords;
    }
  }, {
    key: "canCreateRecords",
    get: function get() {
      return this._canCreateRecords;
    }
  }, {
    key: "canUpdateRecords",
    get: function get() {
      return this._canUpdateRecords;
    }
  }, {
    key: "canDeleteRecords",
    get: function get() {
      return this._canDeleteRecords;
    }
  }, {
    key: "canExportRecords",
    get: function get() {
      return this._canExportRecords;
    }
  }, {
    key: "canRunReports",
    get: function get() {
      return this._canRunReports;
    }
  }, {
    key: "canAccessIssuesAndTasks",
    get: function get() {
      return this._canAccessIssuesAndTasks;
    }
  }, {
    key: "_canConfigureIssuesAndTasks",
    get: function get() {
      return this._canConfigureIssuesAndTasks;
    }
  }]);

  return Role;
}();

exports["default"] = Role;
//# sourceMappingURL=role.js.map