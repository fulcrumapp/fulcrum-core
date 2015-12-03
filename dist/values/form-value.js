'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notImplemented() {
  throw new Error('Not implemented');
}

var FormValue = (function () {
  function FormValue(element, value) {
    _classCallCheck(this, FormValue);

    this._element = element;
    this._rawValue = value;
  }

  _createClass(FormValue, [{
    key: 'toJSON',
    value: function toJSON() {
      notImplemented();
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      notImplemented();
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      notImplemented();
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      notImplemented();
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      notImplemented();
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      notImplemented();
    }
  }, {
    key: 'element',
    get: function get() {
      return this._element;
    },
    set: function set(element) {
      this._element = element;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'length',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'columnValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      notImplemented();
    }
  }]);

  return FormValue;
})();

exports.default = FormValue;
//# sourceMappingURL=form-value.js.map