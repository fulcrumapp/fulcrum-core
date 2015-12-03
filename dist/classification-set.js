'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classification = require('./elements/classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassificationSet = function ClassificationSet(attributes) {
  _classCallCheck(this, ClassificationSet);

  this.id = attributes.id;
  this.name = attributes.name;
  this.description = attributes.description;
  this.items = [];

  if (attributes.items) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = attributes.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        this.items.push(new _classification2.default(null, item));
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

exports.default = ClassificationSet;
//# sourceMappingURL=classification-set.js.map