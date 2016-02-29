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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

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
  }

  _createClass(Form, [{
    key: 'load',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = this.allElements[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 13;
                  break;
                }

                element = _step.value;

                if (!element.load) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return element.load();

              case 10:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 13:
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 19:
                _context.prev = 19;
                _context.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context.prev = 22;

                if (!_didIteratorError) {
                  _context.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context.finish(22);

              case 26:
                return _context.finish(19);

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 15, 19, 27], [20,, 22, 26]]);
      }));

      return function load() {
        return ref.apply(this, arguments);
      };
    }()
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
  }]);

  return Form;
}();

exports.default = Form;


_childElements2.default.includeInto(Form);
//# sourceMappingURL=form.js.map