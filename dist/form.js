'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childElements = require('./elements/child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = (function () {
  function Form(attributes) {
    _classCallCheck(this, Form);

    // TODO(zhm) remove json attr
    this._json = attributes;
    this.createChildElements(attributes.elements);
    this.titleFieldKeys = attributes.titile_field_keys;
  }

  _createClass(Form, [{
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
    key: 'hasHiddenParent',
    get: function get() {
      return false;
    }
  }]);

  return Form;
})();

exports.default = Form;

_childElements2.default.includeInto(Form);
//# sourceMappingURL=form.js.map