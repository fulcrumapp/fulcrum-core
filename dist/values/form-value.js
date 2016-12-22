'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValueFactory = require('./form-value-factory');

var _formValueFactory2 = _interopRequireDefault(_formValueFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notImplemented() {
  throw new Error('Not implemented');
}

var FormValue = function () {
  function FormValue(element, value) {
    _classCallCheck(this, FormValue);

    this._element = element;
    this._rawValue = value;
  }

  FormValue.prototype.format = function format(options) {
    notImplemented();
  };

  FormValue.prototype.toJSON = function toJSON() {
    notImplemented();
  };

  FormValue.prototype.isEqual = function isEqual(value) {
    notImplemented();
  };

  FormValue.prototype.contains = function contains(value) {
    notImplemented();
  };

  FormValue.prototype.startsWith = function startsWith(value) {
    notImplemented();
  };

  FormValue.prototype.isLessThan = function isLessThan(value) {
    notImplemented();
  };

  FormValue.prototype.isGreaterThan = function isGreaterThan(value) {
    notImplemented();
  };

  FormValue.create = function create(element, attributes) {
    return _formValueFactory2.default.create(element, attributes);
  };

  _createClass(FormValue, [{
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
}();

exports.default = FormValue;
//# sourceMappingURL=form-value.js.map