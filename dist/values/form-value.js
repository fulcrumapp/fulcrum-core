'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementTypes = require('../elements/element-types');

var _elementTypes2 = _interopRequireDefault(_elementTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notImplemented() {
  throw new Error('Not implemented');
}

var FormValueFactory = null;

var FormValue = function () {
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
  }], [{
    key: 'factory',
    value: function factory() {
      return FormValueFactory = FormValueFactory || require('./form-value-factory').default;
    }
  }, {
    key: 'create',
    value: function create(element, attributes) {
      return FormValue.factory().create(element, attributes);
    }
  }, {
    key: 'classes',
    value: function classes() {
      if (FormValue._classes == null) {
        FormValue._classes = {};

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(_elementTypes2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var klass = _step.value;

            var constructor = FormValue.factory().classes()[_elementTypes2.default[klass]];

            if (constructor) {
              FormValue._classes[constructor.name] = constructor;
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
      }

      return FormValue._classes;
    }
  }]);

  return FormValue;
}();

exports.default = FormValue;
//# sourceMappingURL=form-value.js.map