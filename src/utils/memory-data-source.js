export default class MemoryDataSource {
  constructor(name) {
    this.cache = {};
    this.projects = null;
    this.users = null;
    this.photos = {};
    this.audio = {};
    this.videos = {};
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

  getRecord(id, form, callback) {
    return callback(null, this.cache[id]);
  }

  getUsers(params, callback) {
    return callback(null, this.users);
  }

  getProjects(params, callback) {
    return callback(null, this.projects);
  }

  getPhoto(id, callback) {
    return callback(null, this.photos[id]);
  }

  getAudio(id, callback) {
    return callback(null, this.audio[id]);
  }

  getVideo(id, callback) {
    return callback(null, this.videos[id]);
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

  getRecordComplete(id, form, object, callback) {
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

  getPhotoComplete(id, object, callback) {
    this.photos[id] = object;
    callback();
  }

  getAudioComplete(id, object, callback) {
    this.audio[id] = object;
    callback();
  }

  getVideoComplete(id, object, callback) {
    this.videos[id] = object;
    callback();
  }
}
