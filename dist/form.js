'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    // TODO(zhm) remove json attr
    this._json = attributes;
    // TODO(zhm) this might need to go away
    this.titleFieldKeys = attributes.title_field_keys;
    this.script = attributes.script;
    this.createChildElements(attributes.elements);

    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;

    this._name = attributes.name;
    this._geometryRequired = !!attributes.geometry_required;
  }

  _createClass(Form, [{
    key: 'load',
    value: function load(dataSource, callback) {
      var loadElements = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.allElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (element.load) {
            loadElements.push(element);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _async2.default.each(loadElements, function (element, cb) {
        element.load(dataSource, cb);
      }, callback);
    }
  }, {
    key: 'createRecord',
    value: function createRecord(attributes) {
      var record = new _record2.default(attributes);

      // TODO(zhm) this might not be final
      record._form = this;
      record._formValuesJSON = {};

      _defaultValues2.default.applyDefaultValuesForElements(this.elements, record.formValues, record);

      return record;
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this.elementsByKey[key];
    }
  }, {
    key: 'find',
    value: function find(dataName) {
      return this.elementsByDataName[dataName];
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      // TODO(zhm) actually implement this so it returns a copy
      return this._json;
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