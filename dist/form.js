"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _childElements = _interopRequireDefault(require("./elements/child-elements"));

var _statusElement = _interopRequireDefault(require("./elements/status-element"));

var _projectElement = _interopRequireDefault(require("./elements/project-element"));

var _defaultValues = _interopRequireDefault(require("./values/default-values"));

var _record = _interopRequireDefault(require("./record"));

var _async = _interopRequireDefault(require("async"));

var _dateUtils = _interopRequireDefault(require("./utils/date-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Form = /*#__PURE__*/function () {
  function Form(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  var _proto = Form.prototype;

  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};
    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._elementsJSON = attributes.elements;
    this._elements = null;
    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;
    this._script = attributes.script;
    this._fieldEffects = attributes.field_effects;
    this._geometryRequired = !!attributes.geometry_required;
    this._geometryTypes = attributes.geometry_types;
    this._reportTemplatesJSON = attributes.report_templates;
    this._boundingBox = attributes.bounding_box;
    this._version = attributes.version;
    this._createdAt = _dateUtils["default"].parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils["default"].parseISOTimestamp(attributes.updated_at);
    this._image = attributes.image;
    this._imageLarge = attributes.image_large;
    this._imageSmall = attributes.image_small;
    this._imageThumbnail = attributes.image_thumbnail;
    this._projectEnabled = attributes.projects_enabled != null ? !!attributes.projects_enabled : true;
    this._projectField = null;
    this._assignmentEnabled = attributes.assignment_enabled != null ? !!attributes.assignment_enabled : true;
    this._autoAssign = attributes.auto_assign != null ? !!attributes.auto_assign : false;
    this._hiddenOnDashboard = attributes.hidden_on_dashboard != null ? !!attributes.hidden_on_dashboard : false;

    if (attributes.title_field_keys || attributes.record_title_key) {
      this._titleFieldKeysJSON = attributes.title_field_keys || [attributes.record_title_key];
    } else {
      this._titleFieldKeysJSON = [];
    }
  };

  _proto.load = function load(dataSource, callback) {
    if (this._schemaLoaded) {
      callback();
      return;
    }

    this._schemaLoaded = true;
    var loadElements = [];

    for (var _iterator = _createForOfIteratorHelperLoose(this.allElements), _step; !(_step = _iterator()).done;) {
      var element = _step.value;

      if (element.load) {
        loadElements.push(element);
      }
    }

    _async["default"].each(loadElements, function (element, cb) {
      element.load(dataSource, function (err) {
        if (err) {// TODO(zhm) We need a parameter to control what happens when there's an error. We don't
          // want to throw right here because some actual forms have orphaned objects. We can't have this
          // blow up here because in a migration we need to keep going even when a form is 'slightly bogus'.
          // In some cases it might be desirable to have more strict verification of the choice lists and
          // classification sets.
        }

        cb();
      });
    }, callback);
  };

  _proto.createRecord = function createRecord(attributes) {
    var record = new _record["default"](attributes, this);

    _defaultValues["default"].applyDefaultValuesForElements(this.elements, record.formValues, record);

    return record;
  };

  _proto.get = function get(key) {
    return this.elementsByKey[key];
  };

  _proto.find = function find(dataName) {
    return this.elementsByDataName[dataName];
  };

  _proto.toJSON = function toJSON() {
    var json = {};
    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.script = this.script || null;
    json.field_effects = this.fieldEffects || null;
    json.elements = JSON.parse(JSON.stringify(this._elementsJSON));
    json.assignment_enabled = this.isAssignmentEnabled;
    json.hidden_on_dashboard = this.isHiddenOnDashboard;
    json.auto_assign = this.isAutoAssign;
    json.projects_enabled = this.isProjectEnabled;
    json.geometry_required = this.isGeometryRequired;
    json.geometry_types = this._geometryTypes;
    json.title_field_keys = this.titleFieldKeys;
    json.report_templates = this.reportTemplates;
    json.bounding_box = this.boundingBox;
    json.version = this.version;
    json.created_at = _dateUtils["default"].formatISOTimestamp(this.createdAt);
    json.updated_at = _dateUtils["default"].formatISOTimestamp(this.updatedAt);

    if (this._statusFieldJSON) {
      json.status_field = JSON.parse(JSON.stringify(this._statusFieldJSON));
    }

    return json;
  };

  _proto.resetOverrides = function resetOverrides() {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.elements), _step2; !(_step2 = _iterator2()).done;) {
      var element = _step2.value;
      element.resetOverrides();
    }

    this.statusField.resetOverrides();
    this._overrideManualLocationEnabled = null;
    this._overrideMediaGalleryEnabled = null;
  };

  _createClass(Form, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "version",
    get: function get() {
      return this._version;
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
    key: "statusField",
    get: function get() {
      if (!this._statusField) {
        this._statusField = new _statusElement["default"](this, this._statusFieldJSON);
      }

      return this._statusField;
    }
  }, {
    key: "projectField",
    get: function get() {
      if (!this._projectField && this._projectEnabled) {
        this._projectField = new _projectElement["default"](this, {});
      }

      return this._projectField;
    }
  }, {
    key: "hasHiddenParent",
    get: function get() {
      return false;
    }
  }, {
    key: "isProjectEnabled",
    get: function get() {
      return this._projectEnabled;
    }
  }, {
    key: "isAssignmentEnabled",
    get: function get() {
      return this._assignmentEnabled;
    }
  }, {
    key: "isAutoAssign",
    get: function get() {
      return this._autoAssign;
    }
  }, {
    key: "isHiddenOnDashboard",
    get: function get() {
      return this._hiddenOnDashboard;
    }
  }, {
    key: "boundingBox",
    get: function get() {
      return this._boundingBox;
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    }
  }, {
    key: "imageLarge",
    get: function get() {
      return this._imageLarge;
    }
  }, {
    key: "imageSmall",
    get: function get() {
      return this._imageSmall;
    }
  }, {
    key: "imageThumbnail",
    get: function get() {
      return this._imageThumbnail;
    }
  }, {
    key: "isGeometryEnabled",
    get: function get() {
      return this._geometryTypes && this._geometryTypes.length > 0;
    }
  }, {
    key: "isGeometryRequired",
    get: function get() {
      return this._geometryRequired;
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
    key: "script",
    get: function get() {
      return this._script;
    }
  }, {
    key: "fieldEffects",
    get: function get() {
      return this._fieldEffects;
    }
  }, {
    key: "titleFieldKeys",
    get: function get() {
      return this._titleFieldKeysJSON || [];
    }
  }, {
    key: "reportTemplates",
    get: function get() {
      return this._reportTemplatesJSON || [];
    }
  }, {
    key: "reportTemplate",
    get: function get() {
      return this.reportTemplates.length ? this.reportTemplates[0] : null;
    }
  }, {
    key: "overrideManualLocationEnabled",
    set: function set(override) {
      this._overrideManualLocationEnabled = override;
    }
  }, {
    key: "isManualLocationEnabled",
    get: function get() {
      return this._overrideManualLocationEnabled != null ? !!this._overrideManualLocationEnabled : true;
    }
  }, {
    key: "overrideMediaGalleryEnabled",
    set: function set(override) {
      this._overrideMediaGalleryEnabled = override;
    }
  }, {
    key: "isMediaGalleryEnabled",
    get: function get() {
      return this._overrideMediaGalleryEnabled != null ? !!this._overrideMediaGalleryEnabled : true;
    }
  }, {
    key: "overrideEditDurationsEnabled",
    set: function set(override) {
      this._overrideEditDurationsEnabled = override;
    }
  }, {
    key: "isEditDurationsEnabled",
    get: function get() {
      return this._overrideEditDurationsEnabled != null ? !!this._overrideEditDurationsEnabled : true;
    }
  }, {
    key: "overrideValues",
    get: function get() {
      return {
        overrideManualLocationEnabled: this._overrideManualLocationEnabled,
        overrideMediaGalleryEnabled: this._overrideMediaGalleryEnabled,
        overrideEditDurationsEnabled: this._overrideEditDurationsEnabled
      };
    }
  }]);

  return Form;
}();

exports["default"] = Form;

_childElements["default"].includeInto(Form);
//# sourceMappingURL=form.js.map