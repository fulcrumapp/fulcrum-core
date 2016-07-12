'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _choice = require('./choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ChoiceElement = function (_Element) {
  _inherits(ChoiceElement, _Element);

  function ChoiceElement(parent, attributes) {
    _classCallCheck(this, ChoiceElement);

    var _this = _possibleConstructorReturn(this, _Element.call(this, parent, attributes));

    _this.multiple = !!attributes.multiple;
    _this.allowOther = !!attributes.allow_other;

    _this._choiceFilter = null;
    _this._overrideChoices = null;

    _this._choiceListID = attributes.choice_list_id;
    _this._choices = [];

    // TODO(zhm) the loading needs to be re-worked to support choice lists
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

        _this._choices.push(new _choice2.default(choice));
      }
    }
    return _this;
  }

  ChoiceElement.prototype.load = function load(dataSource, callback) {
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

  ChoiceElement.prototype.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    this._choiceFilter = null;
    this._overrideChoices = null;
  };

  ChoiceElement.prototype.choiceByValue = function choiceByValue(value) {
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
    key: 'isLengthValidationSupported',
    get: function get() {
      return this.multiple;
    }
  }, {
    key: 'choices',
    get: function get() {
      return this._overrideChoices ? this._overrideChoices : this.filteredChoices;
    }
  }, {
    key: 'choiceFilter',
    get: function get() {
      return this._choiceFilter;
    },
    set: function set(choiceFilter) {
      this._choiceFilter = choiceFilter;
    }
  }, {
    key: 'filteredChoices',
    get: function get() {
      var items = this._choices;

      if (!this.choiceFilter) {
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

          if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            filteredItems.push(item);
          }
        }
      }

      return filteredItems;
    }
  }, {
    key: 'overrideChoices',
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

        var choice = new _choice2.default(choiceAttributes);

        choices.push(choice);
      }

      this._overrideChoices = choices;
    }
  }, {
    key: 'overrideValues',
    get: function get() {
      return Object.assign(_Element.prototype.overrideValues, {
        choiceFilter: this._choiceFilter,
        overrideChoices: this._overrideChoices
      });
    }
  }]);

  return ChoiceElement;
}(_element2.default);

exports.default = ChoiceElement;
//# sourceMappingURL=choice-element.js.map