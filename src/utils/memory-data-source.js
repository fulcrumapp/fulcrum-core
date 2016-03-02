export default class MemoryDataSource {
  constructor(name) {
    this.cache = {};
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
}
