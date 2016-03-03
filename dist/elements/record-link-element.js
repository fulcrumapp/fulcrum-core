'use strict';

exports.__esModule = true;

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _recordLinkCondition = require('./record-link-condition');

var _recordLinkCondition2 = _interopRequireDefault(_recordLinkCondition);

var _recordLinkDefault = require('./record-link-default');

var _recordLinkDefault2 = _interopRequireDefault(_recordLinkDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RecordLinkElement = function (_Element) {
  _inherits(RecordLinkElement, _Element);

  function RecordLinkElement(parent, attributes) {
    _classCallCheck(this, RecordLinkElement);

    var _this = _possibleConstructorReturn(this, _Element.call(this, parent, attributes));

    _this._formID = attributes.form_id;

    _this.allowMultiple = !!attributes.allow_multiple_records;
    _this.allowExisting = !!attributes.allow_existing_records;
    _this.allowCreating = !!attributes.allow_creating_records;
    _this.allowUpdating = !!attributes.allow_updating_records;

    // TODO(zhm) model these
    _this.recordConditionsType = attributes.record_conditions_type;

    _this.recordConditions = [];

    if (attributes.record_conditions) {
      for (var _iterator = attributes.record_conditions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var condition = _ref;

        _this.recordConditions.push(new _recordLinkCondition2.default(condition));
      }
    }

    _this.recordDefaults = [];

    if (attributes.record_defaults) {
      for (var _iterator2 = attributes.record_defaults, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var def = _ref2;

        _this.recordDefaults.push(new _recordLinkDefault2.default(def));
      }
    }
    return _this;
  }

  RecordLinkElement.prototype.load = function load(dataSource, callback) {
    var _this2 = this;

    dataSource.getForm(this._formID, function (err, form) {
      if (err) {
        return callback(err);
      }

      _this2.form = form;

      return callback();
    });
  };

  return RecordLinkElement;
}(_element2.default);

exports.default = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map