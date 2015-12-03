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

var _formValue = require('./values/form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _choice = require('./elements/choice');

var _choice2 = _interopRequireDefault(_choice);

var _classification = require('./elements/classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  Form: _form2.default,
  Record: _record2.default,
  Element: _element2.default,
  FormValue: _formValue2.default,
  Choice: _choice2.default,
  Classification: _classification2.default
};

var elements = _element2.default.classes();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(elements)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var prop = _step.value;

    api[prop] = elements[prop];
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

var values = _formValue2.default.classes();

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = Object.keys(values)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var prop = _step2.value;

    api[prop] = values[prop];
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

exports.default = api;
//# sourceMappingURL=index.js.map