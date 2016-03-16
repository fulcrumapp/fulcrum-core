'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _classification = require('../elements/classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var DisplaySeparator = ' ▸ ';

var SearchSeparator = ' ';

var ClassificationValue = function (_FormValue) {
  _inherits(ClassificationValue, _FormValue);

  function ClassificationValue(element, attributes) {
    _classCallCheck(this, ClassificationValue);

    var _this = _possibleConstructorReturn(this, _FormValue.call(this, element, attributes));

    _this._choiceValues = [];
    _this._otherValues = [];

    if (attributes) {
      for (var _iterator = attributes.choice_values, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

        if (_textUtils2.default.isPresent(choice)) {
          _this._choiceValues.push(choice);
        }
      }

      for (var _iterator2 = attributes.other_values, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var choice = _ref2;

        if (_textUtils2.default.isPresent(choice)) {
          _this._otherValues.push(choice);
        }
      }
    }
    return _this;
  }

  ClassificationValue.prototype.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    var choiceValues = this._choiceValues.slice();
    var otherValues = this._otherValues.slice();

    return {
      choice_values: choiceValues,
      other_values: otherValues
    };
  };

  ClassificationValue.prototype.setSelectedClassification = function setSelectedClassification(classification, otherValue) {
    if (classification instanceof _classification2.default) {
      this._choiceValues = classification.toJSON();
    } else {
      this._choiceValues = [];
    }

    if (otherValue) {
      this._otherValues = [otherValue.toString()];
    } else {
      this._otherVaues = [];
    }
  };

  _createClass(ClassificationValue, [{
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
      var values = [];

      var classification = this.selectedClassification;

      if (classification) {
        for (var _iterator3 = classification.exploded, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var item = _ref3;

          if (item.label) {
            values.push(item.label);
          }
        }
      }

      if (this.hasOtherValue) {
        values.push(this.otherValue);
      }

      return values.join(DisplaySeparator);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var values = [];

      var classification = this.selectedClassification;

      if (classification) {
        for (var _iterator4 = classification.exploded, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
          }

          var item = _ref4;

          if (item.label) {
            values.push(item.label);
          }

          if (item.value) {
            values.push(item.value);
          }
        }
      }

      if (this.hasOtherValue) {
        values.push(this.otherValue);
      }

      return values.join(SearchSeparator);
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

      for (var _iterator5 = this._choiceValues, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref5 = _i5.value;
        }

        var value = _ref5;

        allValues.push(value);
      }

      for (var _iterator6 = this._otherValues, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray6) {
          if (_i6 >= _iterator6.length) break;
          _ref6 = _iterator6[_i6++];
        } else {
          _i6 = _iterator6.next();
          if (_i6.done) break;
          _ref6 = _i6.value;
        }

        var value = _ref6;

        allValues.push(value);
      }

      if (allValues.length === 0) {
        return null;
      }

      return allValues.join('\t');
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
    key: 'otherValue',
    get: function get() {
      if (!this.hasOtherValue) {
        return null;
      }

      return this._otherValues[0];
    }
  }, {
    key: 'selectedClassification',
    get: function get() {
      var result = null;

      if (this._choiceValues.length === 0) {
        return null;
      }

      var currentClassifications = this.element.classificationItems;

      for (var _iterator7 = this._choiceValues, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray7) {
          if (_i7 >= _iterator7.length) break;
          _ref7 = _iterator7[_i7++];
        } else {
          _i7 = _iterator7.next();
          if (_i7.done) break;
          _ref7 = _i7.value;
        }

        var classificationValue = _ref7;

        for (var _iterator8 = currentClassifications, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
          var _ref8;

          if (_isArray8) {
            if (_i8 >= _iterator8.length) break;
            _ref8 = _iterator8[_i8++];
          } else {
            _i8 = _iterator8.next();
            if (_i8.done) break;
            _ref8 = _i8.value;
          }

          var classification = _ref8;

          if (classification.value === classificationValue) {
            result = classification;
            currentClassifications = classification.children;
            break;
          }
        }
      }

      return result;
    }
  }]);

  return ClassificationValue;
}(_formValue2.default);

exports.default = ClassificationValue;
//# sourceMappingURL=classification-value.js.map