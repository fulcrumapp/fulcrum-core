'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childElements = require('./elements/child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

var _statusElement = require('./elements/status-element');

var _statusElement2 = _interopRequireDefault(_statusElement);

var _defaultValues = require('./values/default-values');

var _defaultValues2 = _interopRequireDefault(_defaultValues);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

class Form {
  constructor(attributes) {
    // TODO(zhm) remove json attr
    this._json = attributes;
    // TODO(zhm) this might need to go away
    this.titleFieldKeys = attributes.title_field_keys;
    this.script = attributes.script;
    this.createChildElements(attributes.elements);

    this._statusFieldJSON = attributes.status_field;
    this._statusField = null;
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      for (const element of _this.allElements) {
        if (element.load) {
          yield element.load();
        }
      }
    })();
  }

  createRecord(attributes) {
    const record = new _record2.default(attributes);

    // TODO(zhm) this might not be final
    record._form = this;
    record._formValuesJSON = {};

    _defaultValues2.default.applyDefaultValuesForElements(this.elements, record.formValues, record);

    return record;
  }

  get statusField() {
    if (!this._statusField) {
      this._statusField = new _statusElement2.default(this, this._statusFieldJSON);
    }
    return this._statusField;
  }

  get(key) {
    return this.elementsByKey[key];
  }

  find(dataName) {
    return this.elementsByDataName[dataName];
  }

  get hasHiddenParent() {
    return false;
  }

  toJSON() {
    // TODO(zhm) actually implement this so it returns a copy
    return this._json;
  }
}

exports.default = Form;
_childElements2.default.includeInto(Form);
//# sourceMappingURL=form.js.map