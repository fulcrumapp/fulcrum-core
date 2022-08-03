"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _recordLinkCondition = _interopRequireDefault(require("./record-link-condition"));

var _recordLinkDefault = _interopRequireDefault(require("./record-link-default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RecordLinkElement = /*#__PURE__*/function (_Element) {
  _inheritsLoose(RecordLinkElement, _Element);

  function RecordLinkElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this._formID = attributes.form_id;
    _this.allowMultiple = !!attributes.allow_multiple_records;
    _this.allowExisting = !!attributes.allow_existing_records;
    _this.allowCreating = !!attributes.allow_creating_records;
    _this.allowUpdating = !!attributes.allow_updating_records; // TODO(zhm) model these

    _this.recordConditionsType = attributes.record_conditions_type;
    _this.recordConditions = [];

    if (attributes.record_conditions) {
      for (var _iterator = _createForOfIteratorHelperLoose(attributes.record_conditions), _step; !(_step = _iterator()).done;) {
        var condition = _step.value;

        _this.recordConditions.push(new _recordLinkCondition["default"](condition));
      }
    }

    _this.recordDefaults = [];

    if (attributes.record_defaults) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(attributes.record_defaults), _step2; !(_step2 = _iterator2()).done;) {
        var def = _step2.value;

        _this.recordDefaults.push(new _recordLinkDefault["default"](def));
      }
    }

    return _this;
  }

  var _proto = RecordLinkElement.prototype;

  _proto.load = function load(dataSource, callback) {
    var _this2 = this;

    dataSource.getForm(this._formID, function (err, form) {
      if (err) {
        callback(err);
        return;
      } // recursively load the linked forms


      _this2.form = form;

      _this2.form.load(dataSource, callback);
    });
  };

  return RecordLinkElement;
}(_element["default"]);

exports["default"] = RecordLinkElement;
//# sourceMappingURL=record-link-element.js.map