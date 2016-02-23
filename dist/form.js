'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childElements = require('./elements/child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

class Form {
  constructor(attributes) {
    // TODO(zhm) remove json attr
    this._json = attributes;
    // TODO(zhm) this might need to go away
    this.titleFieldKeys = attributes.title_field_keys;
    this.createChildElements(attributes.elements);
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