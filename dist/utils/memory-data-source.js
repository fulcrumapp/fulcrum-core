"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemoryDataSource = function () {
  function MemoryDataSource(name) {
    _classCallCheck(this, MemoryDataSource);

    this.cache = {};
    this.projects = null;
    this.users = null;
  }

  MemoryDataSource.prototype.getChoiceList = function getChoiceList(id, callback) {
    return callback(null, this.cache[id]);
  };

  MemoryDataSource.prototype.getClassificationSet = function getClassificationSet(id, callback) {
    return callback(null, this.cache[id]);
  };

  MemoryDataSource.prototype.getForm = function getForm(id, callback) {
    return callback(null, this.cache[id]);
  };

  MemoryDataSource.prototype.getRecord = function getRecord(id, callback) {
    return callback(null, this.cache[id]);
  };

  MemoryDataSource.prototype.getUsers = function getUsers(params, callback) {
    return callback(null, this.users);
  };

  MemoryDataSource.prototype.getProjects = function getProjects(params, callback) {
    return callback(null, this.projects);
  };

  MemoryDataSource.prototype.getChoiceListComplete = function getChoiceListComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  MemoryDataSource.prototype.getClassificationSetComplete = function getClassificationSetComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  MemoryDataSource.prototype.getFormComplete = function getFormComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  MemoryDataSource.prototype.getRecordComplete = function getRecordComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  MemoryDataSource.prototype.getUsersComplete = function getUsersComplete(params, object, callback) {
    this.users = object;
    callback();
  };

  MemoryDataSource.prototype.getProjectsComplete = function getProjectsComplete(params, object, callback) {
    this.projects = object;
    callback();
  };

  return MemoryDataSource;
}();

exports.default = MemoryDataSource;
//# sourceMappingURL=memory-data-source.js.map