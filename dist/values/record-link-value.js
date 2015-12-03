'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _recordLinkItemValue = require('./record-link-item-value');

var _recordLinkItemValue2 = _interopRequireDefault(_recordLinkItemValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordLinkValue = (function (_FormValue) {
  _inherits(RecordLinkValue, _FormValue);

  function RecordLinkValue(element, items) {
    _classCallCheck(this, RecordLinkValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecordLinkValue).call(this, element, items));

    _this._items = [];

    if (items) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _this._items.push(new _recordLinkItemValue2.default(item));
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
    return _this;
  }

  _createClass(RecordLinkValue, [{
    key: 'toJSON',
    value: function toJSON() {
      var items = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          items.push(item.toJSON());
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

      return items;
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      return this.length < _numberUtils2.default.parseDouble(value);
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      return this.length > _numberUtils2.default.parseDouble(value);
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this.length === 0;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      if (this.length === 1) {
        return '1 record';
      }

      return this.length + ' records';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.displayValue;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      var ids = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          ids.push(new _multipleValueItem2.default(this.element, item.recordID));
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

      return ids;
    }
  }]);

  return RecordLinkValue;
})(_formValue2.default);

exports.default = RecordLinkValue;
//# sourceMappingURL=record-link-value.js.map