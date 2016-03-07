export default class MemoryDataSource {
  constructor(name) {
    this.cache = {};
    this.projects = null;
    this.users = null;
  }

  getChoiceList(id, callback) {
    return callback(null, this.cache[id]);
  }

  getClassificationSet(id, callback) {
    return callback(null, this.cache[id]);
  }

  getForm(id, callback) {
    return callback(null, this.cache[id]);
  }

  getRecord(id, callback) {
    return callback(null, this.cache[id]);
  }

  getUsers(params, callback) {
    return callback(null, this.users);
  }

  getProjects(params, callback) {
    return callback(null, this.projects);
  }

  getChoiceListComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  getClassificationSetComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  getFormComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  getRecordComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  getUsersComplete(params, object, callback) {
    this.users = object;
    callback();
  }

  getProjectsComplete(params, object, callback) {
    this.projects = object;
    callback();
  }
}
