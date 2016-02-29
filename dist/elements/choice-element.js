'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _elementFactory = require('./element-factory');

var _elementFactory2 = _interopRequireDefault(_elementFactory);

var _choice3 = require('./choice');

var _choice4 = _interopRequireDefault(_choice3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoiceElement = function (_Element) {
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

    // TODO(zhm) the loading needs to be re-worked to support choice lists
    if (attributes.choices) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.attributes.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var choice = _step.value;

          _this._choices.push(new _choice4.default(choice));
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
    key: 'load',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, choice;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._choiceListID) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return _elementFactory2.default.getProvider().getChoiceList(this._choiceListID);

              case 3:
                this.choiceList = _context.sent;

                this._choices = this.choiceList.choices.slice();
                _context.next = 26;
                break;

              case 7:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 10;

                for (_iterator2 = this.attributes.choices[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  choice = _step2.value;

                  this._choices.push(new _choice4.default(choice));
                }
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](10);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 21:
                _context.prev = 21;

                if (!_didIteratorError2) {
                  _context.next = 24;
                  break;
                }

                throw _iteratorError2;

              case 24:
                return _context.finish(21);

              case 25:
                return _context.finish(18);

              case 26:

                this._choicesByValue = null;

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 14, 18, 26], [19,, 21, 25]]);
      }));

      return function load() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'choiceByValue',
    value: function choiceByValue(value) {
      if (!this._choicesByValue) {
        this._choicesByValue = {};

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.choices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _choice = _step3.value;

            this._choicesByValue[_choice.value] = _choice;
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var item = _step4.value;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = this.choiceFilter[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var filter = _step5.value;

              if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                filteredItems.push(item);
              }
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

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = overrideChoices[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var choiceAttributes = _step6.value;

          var _choice2 = new _choice4.default(choiceAttributes);

          choices.push(_choice2);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      this._overrideChoices = choices;
    }
  }]);

  return ChoiceElement;
}(_element2.default);

exports.default = ChoiceElement;
//# sourceMappingURL=choice-element.js.map