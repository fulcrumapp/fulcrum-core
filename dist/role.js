"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Role = function () {
  function Role(attrs) {
    _classCallCheck(this, Role);

    var attributes = attrs || {};

    this.id = attributes.id;
    this.name = attributes.name;
    this._attributes = attributes;

    this._canChangeStatus = !!attributes.can_change_status;
    this._canChangeProject = !!attributes.can_change_project;
    this._canChangeAssignment = !!attributes.can_assign_records;
    this._canRunReports = !!attributes.can_run_reports;
    this._canDeleteRecords = !!attributes.can_delete_records;
  }

  _createClass(Role, [{
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
    key: "canChangeAssignment",
    get: function get() {
      return this._canChangeAssignment;
    }
  }, {
    key: "canDeleteRecords",
    get: function get() {
      return this._canDeleteRecords;
    }
  }, {
    key: "canRunReports",
    get: function get() {
      return this._canRunReports;
    }
  }]);

  return Role;
}();

exports.default = Role;
//# sourceMappingURL=role.js.map