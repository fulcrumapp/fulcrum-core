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

var StatusElement = function (_TextualElement) {
  _inherits(StatusElement, _TextualElement);

  function StatusElement(parent, attributes) {
    _classCallCheck(this, StatusElement);

    attributes.type = 'StatusField';

    var _this = _possibleConstructorReturn(this, _TextualElement.call(this, parent, attributes));

    _this.choices = [];

    for (var _iterator = attributes.choices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

      _this.choices.push(new _statusChoice2.default(choice));
    }

    _this._enabled = !!attributes.enabled;
    _this._readOnly = !!attributes.read_only;
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

  _createClass(StatusElement, [{
    key: 'isEnabled',
    get: function get() {
      return this._enabled;
    }
  }, {
    key: 'isReadOnly',
    get: function get() {
      return this._readOnly;
    }
  }]);

  return StatusElement;
}(_textualElement2.default);

exports.default = StatusElement;
//# sourceMappingURL=status-element.js.map