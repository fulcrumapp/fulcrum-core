'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dataSource = require('../data-source');

var _dataSource2 = _interopRequireDefault(_dataSource);

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

var _choiceList = require('../choice-list');

var _choiceList2 = _interopRequireDefault(_choiceList);

var _classificationSet = require('../classification-set');

var _classificationSet2 = _interopRequireDefault(_classificationSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileDataSource = function (_DataSource) {
  _inherits(FileDataSource, _DataSource);

  function FileDataSource(root) {
    _classCallCheck(this, FileDataSource);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileDataSource).call(this));

    _this.root = root.toString();
    return _this;
  }

  _createClass(FileDataSource, [{
    key: 'json',
    value: function json(jsonPath) {
      return JSON.parse(_fs2.default.readFileSync(jsonPath).toString());
    }
  }, {
    key: 'fetchChoiceList',
    value: function fetchChoiceList(id, callback) {
      var jsonPath = _path2.default.join(this.root, 'choice_lists', id + '.json');

      return callback(null, new _choiceList2.default(this.json(jsonPath).choice_list));
    }
  }, {
    key: 'fetchClassificationSet',
    value: function fetchClassificationSet(id, callback) {
      var jsonPath = _path2.default.join(this.root, 'classification_sets', id + '.json');

      return callback(null, new _classificationSet2.default(this.json(jsonPath).classification_set));
    }
  }, {
    key: 'fetchForm',
    value: function fetchForm(id, callback) {
      var jsonPath = _path2.default.join(this.root, 'forms', id + '.json');

      return callback(null, new _form2.default(this.json(jsonPath).form));
    }
  }]);

  return FileDataSource;
}(_dataSource2.default);

exports.default = FileDataSource;
//# sourceMappingURL=file-data-source.js.map