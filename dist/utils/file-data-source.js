'use strict';

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

var _choiceList = require('../choice-list');

var _choiceList2 = _interopRequireDefault(_choiceList);

var _classificationSet = require('../classification-set');

var _classificationSet2 = _interopRequireDefault(_classificationSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileDataSource = function () {
  function FileDataSource(root) {
    _classCallCheck(this, FileDataSource);

    this.root = root.toString();
  }

  FileDataSource.prototype.json = function json(jsonPath) {
    return JSON.parse(_fs2.default.readFileSync(jsonPath).toString());
  };

  FileDataSource.prototype.getChoiceList = function getChoiceList(id, callback) {
    var jsonPath = _path2.default.join(this.root, 'choice_lists', id + '.json');

    return callback(null, new _choiceList2.default(this.json(jsonPath).choice_list));
  };

  FileDataSource.prototype.getClassificationSet = function getClassificationSet(id, callback) {
    var jsonPath = _path2.default.join(this.root, 'classification_sets', id + '.json');

    return callback(null, new _classificationSet2.default(this.json(jsonPath).classification_set));
  };

  FileDataSource.prototype.getForm = function getForm(id, callback) {
    var jsonPath = _path2.default.join(this.root, 'forms', id + '.json');

    return callback(null, new _form2.default(this.json(jsonPath).form));
  };

  return FileDataSource;
}();

exports.default = FileDataSource;
//# sourceMappingURL=file-data-source.js.map