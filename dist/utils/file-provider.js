'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

class FileProvider {
  constructor(root) {
    this.root = root.toString();
    this.cache = {};
  }

  json(jsonPath) {
    return JSON.parse(_fs2.default.readFileSync(jsonPath).toString());
  }

  getChoiceList(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }

    const jsonPath = _path2.default.join(this.root, 'choice_lists', id + '.json');

    this.cache[id] = new _choiceList2.default(this.json(jsonPath).choice_list);

    return this.cache[id];
  }

  getClassificationSet(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }

    const jsonPath = _path2.default.join(this.root, 'classification_sets', id + '.json');

    this.cache[id] = new _classificationSet2.default(this.json(jsonPath).classification_set);

    return this.cache[id];
  }

  getForm(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }

    const jsonPath = _path2.default.join(this.root, 'forms', id + '.json');

    this.cache[id] = new _form2.default(this.json(jsonPath).form);

    return this.cache[id];
  }
}
exports.default = FileProvider;
//# sourceMappingURL=file-provider.js.map