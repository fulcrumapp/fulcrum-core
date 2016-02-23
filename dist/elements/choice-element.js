'use strict';

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

class ChoiceElement extends _element2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.multiple = !!attributes.multiple;
    this.allowOther = !!attributes.allow_other;
    this.choiceFilter = null;
    this.overrideChoices = null;

    this._choiceListID = attributes.choice_list_id;
    this._choices = [];

    // TODO(zhm) the loading needs to be re-worked to support choice lists
    if (attributes.choices) {
      for (let choice of this.attributes.choices) {
        this._choices.push(new _choice2.default(choice));
      }
    }
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // TODO(zhm) once babel gets fixed this can be removed
      // https://phabricator.babeljs.io/T2765

      if (_this._choiceListID) {
        _this.choiceList = yield _elementFactory2.default.getProvider().getChoiceList(_this._choiceListID);
        _this._choices = _this.choiceList.choices.slice();
      } else {
        for (let choice of _this.attributes.choices) {
          _this._choices.push(new _choice2.default(choice));
        }
      }
    })();
  }

  get isLengthValidationSupported() {
    return this.multiple;
  }

  get choices() {
    return this._overrideChoices ? this._overrideChoices : this.filteredChoices;
  }

  get filteredChoices() {
    const items = this._choices;

    if (!this.choiceFilter) {
      return items;
    }

    const filteredItems = [];

    for (let item of items) {
      for (let filter of this.choiceFilter) {
        if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
          filteredItems.push(item);
        }
      }
    }

    return filteredItems;
  }

  get overrideChoices() {
    return this._overrideChoices;
  }

  set overrideChoices(overrideChoices) {
    this._choicesByValue = null;

    if (!overrideChoices || overrideChoices.length < 1) {
      this._overrideChoices = null;
      return;
    }

    const choices = [];

    for (let choiceAttributes of overrideChoices) {
      const choice = new _choice2.default(choiceAttributes);

      choices.push(choice);
    }

    this._overrideChoices = choices;
  }

  choiceByValue(value) {
    if (!this._choicesByValue) {
      this._choicesByValue = {};

      for (let choice of this.choices) {
        this._choicesByValue[choice.value] = choice;
      }
    }

    return this._choicesByValue[value];
  }
}
exports.default = ChoiceElement;
//# sourceMappingURL=choice-element.js.map