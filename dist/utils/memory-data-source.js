"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemoryDataSource = function () {
  function MemoryDataSource(name) {
    _classCallCheck(this, MemoryDataSource);

    this.cache = {};
    this.projects = null;
    this.users = null;
    this.photos = {};
    this.audio = {};
    this.videos = {};
    this.tracks = {};
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

  MemoryDataSource.prototype.getRecord = function getRecord(id, form, callback) {
    return callback(null, this.cache[id]);
  };

  MemoryDataSource.prototype.getUsers = function getUsers(params, callback) {
    return callback(null, this.users);
  };

  MemoryDataSource.prototype.getProjects = function getProjects(params, callback) {
    return callback(null, this.projects);
  };

  MemoryDataSource.prototype.getPhoto = function getPhoto(id, callback) {
    return callback(null, this.photos[id]);
  };

  MemoryDataSource.prototype.getAudio = function getAudio(id, callback) {
    return callback(null, this.audio[id]);
  };

  MemoryDataSource.prototype.getAudioTrack = function getAudioTrack(id, callback) {
    return callback(null, this.tracks[id]);
  };

  MemoryDataSource.prototype.getVideo = function getVideo(id, callback) {
    return callback(null, this.videos[id]);
  };

  MemoryDataSource.prototype.getVideoTrack = function getVideoTrack(id, callback) {
    return callback(null, this.tracks[id]);
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

  MemoryDataSource.prototype.getRecordComplete = function getRecordComplete(id, form, object, callback) {
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

  MemoryDataSource.prototype.getPhotoComplete = function getPhotoComplete(id, object, callback) {
    if (object.processed) {
      this.photos[id] = object;
    }
    callback();
  };

  MemoryDataSource.prototype.getAudioComplete = function getAudioComplete(id, object, callback) {
    if (object.processed) {
      this.audio[id] = object;
    }
    callback();
  };

  MemoryDataSource.prototype.getAudioTrackComplete = function getAudioTrackComplete(id, object, callback) {
    this.tracks[id] = object;
    callback();
  };

  MemoryDataSource.prototype.getVideoComplete = function getVideoComplete(id, object, callback) {
    if (object.processed) {
      this.videos[id] = object;
    }

    callback();
  };

  MemoryDataSource.prototype.getVideoTrackComplete = function getVideoTrackComplete(id, object, callback) {
    this.tracks[id] = object;
    callback();
  };

  return MemoryDataSource;
}();

exports.default = MemoryDataSource;
//# sourceMappingURL=memory-data-source.js.map