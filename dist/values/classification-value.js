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
      if (attributes.choice_values) {
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
      }

      if (attributes.other_values) {
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

          var _choice = _ref2;

          if (_textUtils2.default.isPresent(_choice)) {
            _this._otherValues.push(_choice);
          }
        }
      }
    }
    return _this;
  }

  ClassificationValue.prototype.isEqual = function isEqual(value) {
    var classification = this.selectedClassification;

    var choiceValues = classification ? classification.toJSON() : null;

    var ESCAPED = /\\,/g;

    var parts = value.replace(ESCAPED, '\t\t').split(',').map(function (part) {
      return part.replace(/\t\t/g, ',');
    });

    var allMatchSoFar = false;

    var partIndex = 0;

    for (var _iterator3 = parts, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var part = _ref3;

      if (part != null && choiceValues && partIndex < choiceValues.length && choiceValues[partIndex].toLowerCase() === part.replace(ESCAPED, ',').toLowerCase()) {
        allMatchSoFar = true;
      } else {
        allMatchSoFar = false;
        break;
      }

      ++partIndex;
    }

    return allMatchSoFar;
  };

  ClassificationValue.prototype.contains = function contains(value) {
    return this.isEqual(value);
  };

  ClassificationValue.prototype.startsWith = function startsWith(value) {
    return this.contains(value);
  };

  ClassificationValue.prototype.format = function format(_ref4) {
    var _ref4$useDisplayValue = _ref4.useDisplayValue,
        useDisplayValue = _ref4$useDisplayValue === undefined ? false : _ref4$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    return useDisplayValue ? this.labelStrings : this.valueStrings;
  };

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

  ClassificationValue.prototype.toSimpleJSON = function toSimpleJSON() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        labels = _ref5.labels;

    if (this.isEmpty) {
      return null;
    }

    var strings = labels ? this.labelStrings : this.valueStrings;

    return strings;
  };

  ClassificationValue.prototype.setSelectedClassification = function setSelectedClassification(classification, otherValue) {
    if (classification instanceof _classification2.default) {
      this.setSelectedClassificationJSON(classification.toJSON(), otherValue);
    } else {
      this.setSelectedClassificationJSON(null, otherValue);
    }
  };

  ClassificationValue.prototype.setSelectedClassificationJSON = function setSelectedClassificationJSON(classificationAsJSON, otherValue) {
    if (classificationAsJSON && classificationAsJSON.length) {
      this._choiceValues = classificationAsJSON;
    } else {
      this._choiceValues = [];
    }

    if (otherValue) {
      this._otherValues = [otherValue.toString()];
    } else {
      this._otherValues = [];
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
    key: 'labelStrings',
    get: function get() {
      var labels = [];

      var classification = this.selectedClassification;

      if (classification) {
        for (var _iterator4 = classification.exploded, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref6;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref6 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref6 = _i4.value;
          }

          var item = _ref6;

          if (item.label) {
            labels.push(item.label);
          }
        }
      }

      if (this.hasOtherValue) {
        labels.push(this.otherValue);
      }

      return labels;
    }
  }, {
    key: 'valueStrings',
    get: function get() {
      var values = [];

      for (var _iterator5 = this._choiceValues, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref7 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref7 = _i5.value;
        }

        var value = _ref7;

        values.push(value);
      }

      for (var _iterator6 = this._otherValues, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray6) {
          if (_i6 >= _iterator6.length) break;
          _ref8 = _iterator6[_i6++];
        } else {
          _i6 = _iterator6.next();
          if (_i6.done) break;
          _ref8 = _i6.value;
        }

        var _value = _ref8;

        values.push(_value);
      }

      return values;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return this.labelStrings.join(DisplaySeparator);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var values = [];

      var classification = this.selectedClassification;

      if (classification) {
        for (var _iterator7 = classification.exploded, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
          var _ref9;

          if (_isArray7) {
            if (_i7 >= _iterator7.length) break;
            _ref9 = _iterator7[_i7++];
          } else {
            _i7 = _iterator7.next();
            if (_i7.done) break;
            _ref9 = _i7.value;
          }

          var item = _ref9;

          if (item.label) {
            values.push(item.label);
          }

          if (item.value && item.value !== item.label) {
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
      var allValues = this.valueStrings;

      if (allValues.length === 0) {
        return null;
      }

      return allValues;
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
    },
    set: function set(value) {
      if (value && value.length) {
        this._otherValues = [value];
      } else {
        this._otherValues = [];
      }
    }
  }, {
    key: 'selectedClassification',
    get: function get() {
      var result = null;

      if (this._choiceValues.length === 0) {
        return null;
      }

      var currentClassifications = this.element.classificationItems;

      for (var _iterator8 = this._choiceValues, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref10;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref10 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref10 = _i8.value;
        }

        var classificationValue = _ref10;

        for (var _iterator9 = currentClassifications, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
          var _ref11;

          if (_isArray9) {
            if (_i9 >= _iterator9.length) break;
            _ref11 = _iterator9[_i9++];
          } else {
            _i9 = _iterator9.next();
            if (_i9.done) break;
            _ref11 = _i9.value;
          }

          var classification = _ref11;

          if (classification.value === classificationValue) {
            result = classification;
            currentClassifications = classification.items;
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