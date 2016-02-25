'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoiceDisplaySeparator = ', ';
var ChoiceSearchSeparator = ' ';

var ChoiceValue = function (_FormValue) {
  _inherits(ChoiceValue, _FormValue);

  function ChoiceValue(element, attributes) {
    _classCallCheck(this, ChoiceValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChoiceValue).call(this, element, attributes));

    _this._choiceValues = [];
    _this._otherValues = [];

    if (attributes) {
      if (attributes.choice_values) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = attributes.choice_values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var choice = _step.value;

            if (_textUtils2.default.isPresent(choice)) {
              _this._choiceValues.push(choice);
            }
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

      if (attributes.other_values) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = attributes.other_values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var choice = _step2.value;

            if (_textUtils2.default.isPresent(choice)) {
              _this._otherValues.push(choice);
            }
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
    }
    return _this;
  }

  _createClass(ChoiceValue, [{
    key: 'toJSON',
    value: function toJSON() {
      if (this.isEmpty) {
        return null;
      }

      var choiceValues = [];
      var otherValues = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._choiceValues[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var rawValue = _step3.value;

          choiceValues.push(rawValue);
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._otherValues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var otherValue = _step4.value;

          otherValues.push(otherValue);
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

      return {
        choice_values: choiceValues,
        other_values: otherValues
      };
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      if (_lodash2.default.includes(this.selectedValues, value)) {
        return true;
      }

      return this.otherValue === value;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return this.isEqual(value);
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return this.contains(value);
    }

    // isLessThan(value) {
    //   notImplemented();
    // }

    // isGreaterThan(value) {
    //   notImplemented();
    // }

  }, {
    key: 'isEmpty',
    get: function get() {
      if (this._choiceValues.length) {
        return false;
      }
      if (this._otherValues.length) {
        return false;
      }
      return true;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var labels = [];

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._choiceValues[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var rawValue = _step5.value;

          var choice = this.element.choiceByValue(rawValue);

          var label = choice != null ? choice.label : rawValue;

          if (_textUtils2.default.isPresent(label)) {
            labels.push(label);
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

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this._otherValues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var otherValue = _step6.value;

          labels.push(otherValue);
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

      return labels.join(ChoiceDisplaySeparator);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var values = [];

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this._choiceValues[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var rawValue = _step7.value;

          var choice = this.element.choiceByValue(rawValue);

          if (choice != null) {
            values.push(choice.label);
            values.push(choice.value);
          } else {
            values.push(rawValue);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this._otherValues[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var otherValue = _step8.value;

          values.push(otherValue);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return values.join(ChoiceSearchSeparator);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._choiceValues.length + this._otherValues.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      var allValues = [];

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this._choiceValues[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var rawValue = _step9.value;

          allValues.push(rawValue);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this._otherValues[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var otherValue = _step10.value;

          allValues.push(otherValue);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      if (allValues.length === 0) {
        return null;
      }

      if (!this.element.multiple) {
        return allValues[0];
      }

      return '\t' + allValues.join('\t') + '\t';
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }, {
    key: 'hasOtherValue',
    get: function get() {
      return this._otherValues.length !== 0;
    }
  }, {
    key: 'selectedValues',
    get: function get() {
      return this._choiceValues.slice();
    },
    set: function set(values) {
      this._choiceValues = (values || []).slice();
    }
  }, {
    key: 'otherValues',
    get: function get() {
      return this._otherValues.slice();
    },
    set: function set(values) {
      this._otherValues = (values || []).slice();
    }
  }, {
    key: 'otherValue',
    get: function get() {
      if (!this.hasOtherValue) {
        return null;
      }

      return this._otherValues[0];
    }
  }]);

  return ChoiceValue;
}(_formValue2.default);

exports.default = ChoiceValue;
//# sourceMappingURL=choice-value.js.map