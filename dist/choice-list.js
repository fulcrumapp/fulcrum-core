'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = attributes.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var choice = _step.value;

        this.choices.push(new _choice2.default(choice));
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
};

exports.default = ChoiceList;
//# sourceMappingURL=choice-list.js.map