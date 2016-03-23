'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _childElements = require('./elements/child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

var _statusElement = require('./elements/status-element');

var _statusElement2 = _interopRequireDefault(_statusElement);

var _defaultValues = require('./values/default-values');

var _defaultValues2 = _interopRequireDefault(_defaultValues);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
  function Form(attributes) {
    _classCallCheck(this, Form);

    this._id = attributes.id;

    // TODO(zhm) remove json attr
    this._json = attributes;
    // TODO(zhm) this might need to go away
    this.titleFieldKeys = attributes.title_field_keys || [attributes.record_title_key];
    this.script = attributes.script;
    this.createChildElements(attributes.elements);

    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;

    this._name = attributes.name;
    this._geometryRequired = !!attributes.geometry_required;
  }

  Form.prototype.load = function load(dataSource, callback) {
    var loadElements = [];

    for (var _iterator = this.allElements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var element = _ref;

      if (element.load) {
        loadElements.push(element);
      }
    }

    _async2.default.each(loadElements, function (element, cb) {
      element.load(dataSource, cb);
    }, callback);
  };

  Form.prototype.createRecord = function createRecord(attributes) {
    var record = new _record2.default(attributes, this);

    // TODO(zhm) this might not be final
    record._form = this;
    record._formValuesJSON = {};

    _defaultValues2.default.applyDefaultValuesForElements(this.elements, record.formValues, record);

    return record;
  };

  Form.prototype.get = function get(key) {
    return this.elementsByKey[key];
  };

  Form.prototype.find = function find(dataName) {
    return this.elementsByDataName[dataName];
  };

  Form.prototype.toJSON = function toJSON() {
    // TODO(zhm) actually implement this so it returns a copy
    return this._json;
  };

  _createClass(Form, [{
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'statusField',
    get: function get() {
      if (!this._statusField) {
        this._statusField = new _statusElement2.default(this, this._statusFieldJSON);
      }
      return this._statusField;
    }
  }, {
    key: 'hasHiddenParent',
    get: function get() {
      return false;
    }
  }, {
    key: 'isGeometryRequired',
    get: function get() {
      return this._geometryRequired;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return Form;
}();

exports.default = Form;


_childElements2.default.includeInto(Form);
//# sourceMappingURL=form.js.map