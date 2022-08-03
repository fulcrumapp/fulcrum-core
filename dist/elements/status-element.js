"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

var _statusChoice = _interopRequireDefault(require("./status-choice"));

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_STATUS_ELEMENT = {
  label: 'Status',
  key: '@status',
  data_name: 'status',
  enabled: false,
  read_only: false,
  choices: []
};

var StatusElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(StatusElement, _TextualElement);

  function StatusElement(parent, attributes) {
    var _this;

    attributes.type = 'StatusField';
    var attrs = Object.assign({}, DEFAULT_STATUS_ELEMENT, attributes);
    _this = _TextualElement.call(this, parent, attrs) || this;
    _this._statusFilter = null;
    _this._choices = [];

    if (attrs.choices) {
      for (var _iterator = _createForOfIteratorHelperLoose(attrs.choices), _step; !(_step = _iterator()).done;) {
        var choice = _step.value;

        _this._choices.push(new _statusChoice["default"](choice));
      }
    }

    _this._enabled = !!attrs.enabled;
    _this._readOnly = !!attrs.read_only;
    return _this;
  }

  var _proto = StatusElement.prototype;

  _proto.statusForValue = function statusForValue(value) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.choices), _step2; !(_step2 = _iterator2()).done;) {
      var choice = _step2.value;

      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  };

  _proto.resetOverrides = function resetOverrides() {
    _TextualElement.prototype.resetOverrides.call(this);

    this._statusFilter = null;
  };

  _createClass(StatusElement, [{
    key: "choices",
    get: function get() {
      return this.filteredChoices;
    }
  }, {
    key: "isEnabled",
    get: function get() {
      return this._enabled;
    }
  }, {
    key: "isReadOnly",
    get: function get() {
      return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._readOnly;
    }
  }, {
    key: "statusFilter",
    get: function get() {
      return this._statusFilter;
    },
    set: function set(statusFilter) {
      this._statusFilter = statusFilter;
    }
  }, {
    key: "filteredChoices",
    get: function get() {
      var items = this._choices;

      if (!this.statusFilter) {
        return items;
      }

      var filteredItems = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(items), _step3; !(_step3 = _iterator3()).done;) {
        var item = _step3.value;

        for (var _iterator4 = _createForOfIteratorHelperLoose(this.statusFilter), _step4; !(_step4 = _iterator4()).done;) {
          var filter = _step4.value;

          if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            filteredItems.push(item);
          }
        }
      }

      return filteredItems;
    }
  }, {
    key: "overrideValues",
    get: function get() {
      return Object.assign(Object.getOwnPropertyDescriptor(_element["default"].prototype, 'overrideValues').get.call(this), {
        statusFilter: this._statusFilter
      });
    }
  }]);

  return StatusElement;
}(_textualElement["default"]);

exports["default"] = StatusElement;
//# sourceMappingURL=status-element.js.map