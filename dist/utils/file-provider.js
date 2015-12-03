'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileProvider = (function () {
  function FileProvider(root) {
    _classCallCheck(this, FileProvider);

    this.root = root.toString();
    this.cache = {};
  }

  _createClass(FileProvider, [{
    key: 'json',
    value: function json(jsonPath) {
      return JSON.parse(_fs2.default.readFileSync(jsonPath).toString());
    }
  }, {
    key: 'getChoiceList',
    value: function getChoiceList(id) {
      if (this.cache[id]) {
        return this.cache[id];
      }

      var jsonPath = _path2.default.join(this.root, 'choice_lists', id + '.json');

      this.cache[id] = new _choiceList2.default(this.json(jsonPath).choice_list);

      return this.cache[id];
    }
  }, {
    key: 'getClassificationSet',
    value: function getClassificationSet(id) {
      if (this.cache[id]) {
        return this.cache[id];
      }

      var jsonPath = _path2.default.join(this.root, 'classification_sets', id + '.json');

      this.cache[id] = new _classificationSet2.default(this.json(jsonPath).classification_set);

      return this.cache[id];
    }
  }, {
    key: 'getForm',
    value: function getForm(id) {
      if (this.cache[id]) {
        return this.cache[id];
      }

      var jsonPath = _path2.default.join(this.root, 'forms', id + '.json');

      this.cache[id] = new _form2.default(this.json(jsonPath).form);

      return this.cache[id];
    }
  }]);

  return FileProvider;
})();

exports.default = FileProvider;
//# sourceMappingURL=file-provider.js.map