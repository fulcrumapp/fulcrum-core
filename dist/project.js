"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _dateUtils = _interopRequireDefault(require("./utils/date-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Project = /*#__PURE__*/function () {
  function Project(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  var _proto = Project.prototype;

  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};
    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._createdAt = _dateUtils["default"].parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils["default"].parseISOTimestamp(attributes.updated_at);
  };

  _createClass(Project, [{
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
    key: "description",
    get: function get() {
      return this._description;
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
  }]);

  return Project;
}();

exports["default"] = Project;
//# sourceMappingURL=project.js.map