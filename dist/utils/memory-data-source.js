'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataSource = require('../data-source');

var _dataSource2 = _interopRequireDefault(_dataSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemoryDataSource = function (_DataSource) {
  _inherits(MemoryDataSource, _DataSource);

  function MemoryDataSource(name) {
    _classCallCheck(this, MemoryDataSource);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MemoryDataSource).call(this));

    _this.cache = {};
    return _this;
  }

  _createClass(MemoryDataSource, [{
    key: 'fetchChoiceList',
    value: function fetchChoiceList(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: 'fetchClassificationSet',
    value: function fetchClassificationSet(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: 'fetchForm',
    value: function fetchForm(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: 'fetchRecord',
    value: function fetchRecord(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: 'storeChoiceList',
    value: function storeChoiceList(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }, {
    key: 'storeClassificationSet',
    value: function storeClassificationSet(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }, {
    key: 'storeForm',
    value: function storeForm(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }, {
    key: 'storeRecord',
    value: function storeRecord(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }]);

  return MemoryDataSource;
}(_dataSource2.default);

exports.default = MemoryDataSource;
//# sourceMappingURL=memory-data-source.js.map