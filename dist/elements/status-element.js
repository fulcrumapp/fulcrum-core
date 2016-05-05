'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _statusChoice = require('./status-choice');

var _statusChoice2 = _interopRequireDefault(_statusChoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DEFAULT_STATUS_ELEMENT = {
  label: 'Status',
  key: '@status',
  data_name: 'status',
  enabled: false,
  read_only: false,
  choices: []
};

var StatusElement = function (_TextualElement) {
  _inherits(StatusElement, _TextualElement);

  function StatusElement(parent, attributes) {
    _classCallCheck(this, StatusElement);

    attributes.type = 'StatusField';

    var attrs = Object.assign({}, DEFAULT_STATUS_ELEMENT, attributes);

    var _this = _possibleConstructorReturn(this, _TextualElement.call(this, parent, attrs));

    _this._statusFilter = null;

    _this._choices = [];

    if (attrs.choices) {
      for (var _iterator = attrs.choices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var choice = _ref;

        _this._choices.push(new _statusChoice2.default(choice));
      }
    }

    _this._enabled = !!attrs.enabled;
    _this._readOnly = !!attrs.read_only;
    return _this;
  }

  StatusElement.prototype.statusForValue = function statusForValue(value) {
    for (var _iterator2 = this.choices, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var choice = _ref2;

      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  };

  StatusElement.prototype.resetOverrides = function resetOverrides() {
    _TextualElement.prototype.resetOverrides.call(this);

    this._statusFilter = null;
  };

  _createClass(StatusElement, [{
    key: 'choices',
    get: function get() {
      return this.filteredChoices;
    }
  }, {
    key: 'isEnabled',
    get: function get() {
      return this._enabled;
    }
  }, {
    key: 'isReadOnly',
    get: function get() {
      return this._readOnly;
    }
  }, {
    key: 'statusFilter',
    get: function get() {
      return this._statusFilter;
    },
    set: function set(statusFilter) {
      this._statusFilter = statusFilter;
    }
  }, {
    key: 'filteredChoices',
    get: function get() {
      var items = this._choices;

      if (!this.statusFilter) {
        return items;
      }

      var filteredItems = [];

      for (var _iterator3 = items, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var item = _ref3;

        for (var _iterator4 = this.statusFilter, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
          }

          var filter = _ref4;

          if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            filteredItems.push(item);
          }
        }
      }

      return filteredItems;
    }
  }, {
    key: 'overrideValues',
    get: function get() {
      return Object.assign(_TextualElement.prototype.overrideValues, {
        statusFilter: this._statusFilter
      });
    }
  }]);

  return StatusElement;
}(_textualElement2.default);

exports.default = StatusElement;
//# sourceMappingURL=status-element.js.map