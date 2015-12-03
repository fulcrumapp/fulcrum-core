'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _element = require('./elements/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  Form: _form2.default,
  Record: _record2.default
  // Condition: require('./elements/condition'),
  // NumberUtils: require('./utils/number-utils'),
  // CalculatedElement: require('./elements/calculated-element')
};

var classes = _element2.default.classes();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(classes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var prop = _step.value;

    api[prop] = classes[prop];
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

exports.default = api;
//# sourceMappingURL=index.js.map