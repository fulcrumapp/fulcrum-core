'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _recordLinkCondition = require('./record-link-condition');

var _recordLinkCondition2 = _interopRequireDefault(_recordLinkCondition);

var _recordLinkDefault = require('./record-link-default');

var _recordLinkDefault2 = _interopRequireDefault(_recordLinkDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordLinkElement = function (_Element) {
  _inherits(RecordLinkElement, _Element);

  function RecordLinkElement(parent, attributes) {
    _classCallCheck(this, RecordLinkElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecordLinkElement).call(this, parent, attributes));

    _this._formID = attributes.form_id;

    _this.allowMultiple = !!attributes.allow_multiple_records;
    _this.allowExisting = !!attributes.allow_existing_records;
    _this.allowCreating = !!attributes.allow_creating_records;
    _this.allowUpdating = !!attributes.allow_updating_records;

    // TODO(zhm) model these
    _this.recordConditionsType = attributes.record_conditions_type;

    _this.recordConditions = [];

    if (attributes.record_conditions) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = attributes.record_conditions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var condition = _step.value;

          _this.recordConditions.push(new _recordLinkCondition2.default(condition));
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

    _this.recordDefaults = [];

    if (attributes.record_defaults) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = attributes.record_defaults[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var def = _step2.value;

          _this.recordDefaults.push(new _recordLinkDefault2.default(def));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    return _this;
  }

  _createClass(RecordLinkElement, [{
    key: 'load',
    value: function load(dataSource, callback) {
      var _this2 = this;

      dataSource.getForm(this._formID, function (err, form) {
        if (err) {
          return callback(err);
        }

        _this2.form = form;

        return callback();
      });
    }
  }]);

  return RecordLinkElement;
}(_element2.default);

exports.default = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map