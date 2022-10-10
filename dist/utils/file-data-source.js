"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _form = _interopRequireDefault(require("../form"));
var _choiceList = _interopRequireDefault(require("../choice-list"));
var _classificationSet = _interopRequireDefault(require("../classification-set"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FileDataSource = /*#__PURE__*/function () {
  function FileDataSource(root) {
    this.root = root.toString();
  }
  var _proto = FileDataSource.prototype;
  _proto.json = function json(jsonPath) {
    return JSON.parse(_fs["default"].readFileSync(jsonPath).toString());
  };
  _proto.getChoiceList = function getChoiceList(id, callback) {
    var jsonPath = _path["default"].join(this.root, 'choice_lists', id + '.json');
    return callback(null, new _choiceList["default"](this.json(jsonPath).choice_list));
  };
  _proto.getClassificationSet = function getClassificationSet(id, callback) {
    var jsonPath = _path["default"].join(this.root, 'classification_sets', id + '.json');
    return callback(null, new _classificationSet["default"](this.json(jsonPath).classification_set));
  };
  _proto.getForm = function getForm(id, callback) {
    var jsonPath = _path["default"].join(this.root, 'forms', id + '.json');
    return callback(null, new _form["default"](this.json(jsonPath).form));
  };
  _proto.getUsers = function getUsers(params, callback) {
    return callback(null, []);
  };
  _proto.getProjects = function getProjects(params, callback) {
    return callback(null, []);
  };
  return FileDataSource;
}();
exports["default"] = FileDataSource;
//# sourceMappingURL=file-data-source.js.map