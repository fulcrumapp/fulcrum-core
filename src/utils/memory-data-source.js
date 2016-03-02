import DataSource from '../data-source';

export default class MemoryDataSource extends DataSource {
  constructor(name) {
    super();
    this.cache = {};
  }

  fetchChoiceList(id, callback) {
    return callback(null, this.cache[id]);
  }

  fetchClassificationSet(id, callback) {
    return callback(null, this.cache[id]);
  }

  fetchForm(id, callback) {
    return callback(null, this.cache[id]);
  }

  fetchRecord(id, callback) {
    return callback(null, this.cache[id]);
  }

  storeChoiceList(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  storeClassificationSet(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  storeForm(id, object, callback) {
    this.cache[id] = object;
    callback();
  }

  storeRecord(id, object, callback) {
    this.cache[id] = object;
    callback();
  }
}
