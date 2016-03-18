'use strict';

exports.__esModule = true;

var _choice = require('./elements/choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChoiceList = function ChoiceList(attributes) {
  _classCallCheck(this, ChoiceList);

  attributes = attributes || {};

  this.id = attributes.id;
  this.name = attributes.name;
  this.description = attributes.description;
  this.choices = [];

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

      this.choices.push(new _choice2.default(choice));
    }
  }
};

exports.default = ChoiceList;
//# sourceMappingURL=choice-list.js.map