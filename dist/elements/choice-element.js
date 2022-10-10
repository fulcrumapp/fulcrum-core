"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _choice = _interopRequireDefault(require("./choice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ChoiceElement =
/*#__PURE__*/
function (_Element) {
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

        for (var _iterator4 = this.choiceFilter, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
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

      for (var _iterator5 = overrideChoices, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref5 = _i5.value;
        }

        var choiceAttributes = _ref5;
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