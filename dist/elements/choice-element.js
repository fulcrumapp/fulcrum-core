'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _elementFactory = require('./element-factory');

var _elementFactory2 = _interopRequireDefault(_elementFactory);

var _choice = require('./choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoiceElement = (function (_Element) {
  _inherits(ChoiceElement, _Element);

  function ChoiceElement(parent, attributes) {
    _classCallCheck(this, ChoiceElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChoiceElement).call(this, parent, attributes));

    _this.multiple = !!attributes.multiple;
    _this.allowOther = !!attributes.allow_other;
    _this.choiceFilter = null;
    _this.overrideChoices = null;

    _this._choiceListID = attributes.choice_list_id;
    _this._choices = [];

    if (_this._choiceListID) {
      _this.choiceList = _elementFactory2.default.getProvider().getChoiceList(_this._choiceListID);
      _this._choices = _this.choiceList.choices.slice();
    } else {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = attributes.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var choice = _step.value;

          _this._choices.push(new _choice2.default(choice));
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
    return _this;
  }

  _createClass(ChoiceElement, [{
    key: 'choiceByValue',
    value: function choiceByValue(value) {
      if (!this._choicesByValue) {
        this._choicesByValue = {};

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.choices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var choice = _step2.value;

            this._choicesByValue[choice.value] = choice;
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

      return this._choicesByValue[value];
    }
  }, {
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
    key: 'filteredChoices',
    get: function get() {
      var items = this._choices;

      if (!this.choiceFilter) {
        return items;
      }

      var filteredItems = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this.choiceFilter[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var filter = _step4.value;

              if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                filteredItems.push(item);
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
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

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = overrideChoices[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var choiceAttributes = _step5.value;

          var choice = new _choice2.default(choiceAttributes);

          choices.push(choice);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this._overrideChoices = choices;
    }
  }]);

  return ChoiceElement;
})(_element2.default);

exports.default = ChoiceElement;
//# sourceMappingURL=choice-element.js.map