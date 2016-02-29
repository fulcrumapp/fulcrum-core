'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordLinkElement = function (_Element) {
  _inherits(RecordLinkElement, _Element);

  function RecordLinkElement(parent, attributes) {
    _classCallCheck(this, RecordLinkElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecordLinkElement).call(this, parent, attributes));

    _this.formID = attributes.form_id;

    _this.allowMultiple = !!attributes.allow_multiple;
    _this.allowExisting = !!attributes.allow_existing;
    _this.allowCreating = !!attributes.allow_creating;
    _this.allowUpdating = !!attributes.allow_updating;

    // TODO(zhm) model these
    _this.recordConditionsType = attributes.record_conditions_type;
    _this.recordConditions = attributes.record_conditions;
    _this.recordDefaults = attributes.record_defaults;
    return _this;
  }

  return RecordLinkElement;
}(_element2.default);

exports.default = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map