"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _formValue = _interopRequireDefault(require("./form-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _lodash = _interopRequireDefault(require("lodash.includes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ChoiceDisplaySeparator = ', ';
var ChoiceSearchSeparator = ' ';

var ChoiceValue =
/*#__PURE__*/
function (_FormValue) {
  _inheritsLoose(ChoiceValue, _FormValue);

  function ChoiceValue(element, attributes) {
    var _this;

    _this = _FormValue.call(this, element, attributes) || this;
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

          if (_textUtils["default"].isPresent(choice)) {
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

          if (_textUtils["default"].isPresent(_choice)) {
            _this._otherValues.push(_choice);
          }
        }
      }
    }

    return _this;
  }

  var _proto = ChoiceValue.prototype;

  _proto.format = function format(_ref3) {
    var _ref3$useDisplayValue = _ref3.useDisplayValue,
        useDisplayValue = _ref3$useDisplayValue === void 0 ? false : _ref3$useDisplayValue;

    if (this.isEmpty) {
      return null;
    }

    var values = useDisplayValue ? this.labelStrings.sort() : this.valueStrings.sort();

    if (!this.element.multiple) {
      return values[0];
    }

    return values;
  };

  _proto.toJSON = function toJSON() {
    if (this.isEmpty) {
      return null;
    }

    var choiceValues = [];
    var otherValues = [];

    for (var _iterator3 = this._choiceValues, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref4 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref4 = _i3.value;
      }

      var rawValue = _ref4;
      choiceValues.push(rawValue);
    }

    for (var _iterator4 = this._otherValues, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref5 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref5 = _i4.value;
      }

      var otherValue = _ref5;
      otherValues.push(otherValue);
    }

    return {
      choice_values: choiceValues,
      other_values: otherValues
    };
  };

  _proto.toSimpleJSON = function toSimpleJSON(_temp) {
    var _ref6 = _temp === void 0 ? {} : _temp,
        labels = _ref6.labels;

    if (this.isEmpty) {
      return null;
    }

    var strings = labels ? this.labelStrings : this.valueStrings;
    return this.element.multiple ? strings : strings[0];
  };

  _proto.isEqual = function isEqual(value) {
    if ((0, _lodash["default"])(this.selectedValues, value)) {
      return true;
    }

    return this.otherValue === value;
  };

  _proto.contains = function contains(value) {
    return this.isEqual(value);
  };

  _proto.startsWith = function startsWith(value) {
    return this.contains(value);
  } // isLessThan(value) {
  //   notImplemented();
  // }
  // isGreaterThan(value) {
  //   notImplemented();
  // }
  ;

  _createClass(ChoiceValue, [{
    key: "isEmpty",
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
    key: "labelStrings",
    get: function get() {
      var labels = [];

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

        var rawValue = _ref7;
        var choice = this.element.choiceByValue(rawValue);
        var label = choice != null ? choice.label : rawValue;

        if (_textUtils["default"].isPresent(label)) {
          labels.push(label);
        }
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

        var otherValue = _ref8;
        labels.push(otherValue);
      }

      return labels;
    }
  }, {
    key: "valueStrings",
    get: function get() {
      var values = [];

      for (var _iterator7 = this._choiceValues, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray7) {
          if (_i7 >= _iterator7.length) break;
          _ref9 = _iterator7[_i7++];
        } else {
          _i7 = _iterator7.next();
          if (_i7.done) break;
          _ref9 = _i7.value;
        }

        var rawValue = _ref9;
        values.push(rawValue);
      }

      for (var _iterator8 = this._otherValues, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref10;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref10 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref10 = _i8.value;
        }

        var otherValue = _ref10;
        values.push(otherValue);
      }

      return values;
    }
  }, {
    key: "displayValue",
    get: function get() {
      return this.labelStrings.join(ChoiceDisplaySeparator);
    }
  }, {
    key: "searchableValue",
    get: function get() {
      var values = [];

      for (var _iterator9 = this._choiceValues, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref11;

        if (_isArray9) {
          if (_i9 >= _iterator9.length) break;
          _ref11 = _iterator9[_i9++];
        } else {
          _i9 = _iterator9.next();
          if (_i9.done) break;
          _ref11 = _i9.value;
        }

        var rawValue = _ref11;
        var choice = this.element.choiceByValue(rawValue);

        if (choice != null) {
          values.push(choice.label);

          if (choice.label !== choice.value) {
            values.push(choice.value);
          }
        } else {
          values.push(rawValue);
        }
      }

      for (var _iterator10 = this._otherValues, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
        var _ref12;

        if (_isArray10) {
          if (_i10 >= _iterator10.length) break;
          _ref12 = _iterator10[_i10++];
        } else {
          _i10 = _iterator10.next();
          if (_i10.done) break;
          _ref12 = _i10.value;
        }

        var otherValue = _ref12;
        values.push(otherValue);
      }

      return values.join(ChoiceSearchSeparator);
    }
  }, {
    key: "length",
    get: function get() {
      return this._choiceValues.length + this._otherValues.length;
    }
  }, {
    key: "columnValue",
    get: function get() {
      var allValues = this.valueStrings.sort();

      if (allValues.length === 0) {
        return null;
      }

      if (!this.element.multiple) {
        return allValues[0];
      }

      return allValues;
    }
  }, {
    key: "multipleValues",
    get: function get() {
      return null;
    }
  }, {
    key: "hasOtherValue",
    get: function get() {
      return this._otherValues.length !== 0;
    }
  }, {
    key: "selectedValues",
    get: function get() {
      return this._choiceValues.slice();
    },
    set: function set(values) {
      this._choiceValues = (values || []).slice();
    }
  }, {
    key: "otherValues",
    get: function get() {
      return this._otherValues.slice();
    },
    set: function set(values) {
      this._otherValues = (values || []).slice();
    }
  }, {
    key: "otherValue",
    get: function get() {
      if (!this.hasOtherValue) {
        return null;
      }

      return this._otherValues[0];
    }
  }]);

  return ChoiceValue;
}(_formValue["default"]);

exports["default"] = ChoiceValue;
//# sourceMappingURL=choice-value.js.map