'use strict';

exports.__esModule = true;

var _classification = require('./elements/classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassificationSet = function ClassificationSet(attributes) {
  _classCallCheck(this, ClassificationSet);

  attributes = attributes || {};

  this.id = attributes.id;
  this.name = attributes.name;
  this.description = attributes.description;
  this.items = [];

  if (attributes.items) {
    for (var _iterator = attributes.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      this.items.push(new _classification2.default(null, item));
    }
  }
};

exports.default = ClassificationSet;
//# sourceMappingURL=classification-set.js.map