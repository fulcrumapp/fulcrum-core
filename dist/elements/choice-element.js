"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _choice = _interopRequireDefault(require("./choice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ChoiceElement = /*#__PURE__*/function (_Element) {
  _inheritsLoose(ChoiceElement, _Element);

  function ChoiceElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this.multiple = !!attributes.multiple;
    _this.allowOther = !!attributes.allow_other;
    _this._choiceFilter = null;
    _this._overrideChoices = null;
    _this._choiceListID = attributes.choice_list_id;
    _this._choices = []; // TODO(zhm) the loading needs to be re-worked to support choice lists

    if (attributes.choices) {
      for (var _iterator = _createForOfIteratorHelperLoose(attributes.choices), _step; !(_step = _iterator()).done;) {
        var choice = _step.value;

        _this._choices.push(new _choice["default"](choice));
      }
    }

    return _this;
  }

  var _proto = ChoiceElement.prototype;

  _proto.load = function load(dataSource, callback) {
    var _this2 = this;

    this._choicesByValue = null;

    if (this._choiceListID) {
      dataSource.getChoiceList(this._choiceListID, function (err, choiceList) {
        // TODO(zhm) Some forms have orphaned choice lists (life sucks)
        // Maybe we should add a parameter to the load() method to throw
        // errors.
        if (err) {
          return callback(err);
        }

        _this2.choiceList = choiceList;
        _this2._choices = _this2.choiceList.choices.slice();
        return callback();
      });
    } else {
      setImmediate(callback);
    }
  };

  _proto.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    this._choiceFilter = null;
    this._overrideChoices = null;
  };

  _proto.choiceByValue = function choiceByValue(value) {
    if (!this._choicesByValue) {
      this._choicesByValue = {};

      for (var _iterator2 = _createForOfIteratorHelperLoose(this.choices), _step2; !(_step2 = _iterator2()).done;) {
        var choice = _step2.value;
        this._choicesByValue[choice.value] = choice;
      }
    }

    return this._choicesByValue[value];
  };

  _createClass(ChoiceElement, [{
    key: "isLengthValidationSupported",
    get: function get() {
      return this.multiple;
    }
  }, {
    key: "choices",
    get: function get() {
      return this._overrideChoices ? this._overrideChoices : this.filteredChoices;
    }
  }, {
    key: "choiceFilter",
    get: function get() {
      return this._choiceFilter;
    },
    set: function set(choiceFilter) {
      this._choiceFilter = choiceFilter;
    }
  }, {
    key: "filteredChoices",
    get: function get() {
      var items = this._choices;

      if (!this.choiceFilter) {
        return items;
      }

      var filteredItems = [];
      var matchedValues = {};

      for (var _iterator3 = _createForOfIteratorHelperLoose(items), _step3; !(_step3 = _iterator3()).done;) {
        var item = _step3.value;

        for (var _iterator4 = _createForOfIteratorHelperLoose(this.choiceFilter), _step4; !(_step4 = _iterator4()).done;) {
          var filter = _step4.value;
          var isMatch = item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

          if (isMatch && !matchedValues[item.value]) {
            filteredItems.push(item);
            matchedValues[item.value] = item;
          }
        }
      }

      return filteredItems;
    }
  }, {
    key: "overrideChoices",
    get: function get() {
      return this._overrideChoices;
    },
    set: function set(overrideChoices) {
      this._choicesByValue = null;

      if (!overrideChoices || overrideChoices.length < 1) {
        this._overrideChoices = null;
        return;
      }

      var choices = [];

      for (var _iterator5 = _createForOfIteratorHelperLoose(overrideChoices), _step5; !(_step5 = _iterator5()).done;) {
        var choiceAttributes = _step5.value;
        var choice = new _choice["default"](choiceAttributes);
        choices.push(choice);
      }

      this._overrideChoices = choices;
    }
  }, {
    key: "overrideValues",
    get: function get() {
      return Object.assign(Object.getOwnPropertyDescriptor(_element["default"].prototype, 'overrideValues').get.call(this), {
        choiceFilter: this._choiceFilter,
        overrideChoices: this._overrideChoices
      });
    }
  }]);

  return ChoiceElement;
}(_element["default"]);

exports["default"] = ChoiceElement;
//# sourceMappingURL=choice-element.js.map