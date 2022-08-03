"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var MemoryDataSource = /*#__PURE__*/function () {
  function MemoryDataSource(name) {
    this.cache = {};
    this.projects = null;
    this.users = null;
    this.photos = {};
    this.audio = {};
    this.videos = {};
    this.tracks = {};
  }

  var _proto = MemoryDataSource.prototype;

  _proto.getChoiceList = function getChoiceList(id, callback) {
    return callback(null, this.cache[id]);
  };

  _proto.getClassificationSet = function getClassificationSet(id, callback) {
    return callback(null, this.cache[id]);
  };

  _proto.getForm = function getForm(id, callback) {
    return callback(null, this.cache[id]);
  };

  _proto.getRecord = function getRecord(id, form, callback) {
    return callback(null, this.cache[id]);
  };

  _proto.getUsers = function getUsers(params, callback) {
    return callback(null, this.users);
  };

  _proto.getUser = function getUser(id, callback) {
    return callback(null, this.cache[id]);
  };

  _proto.getProjects = function getProjects(params, callback) {
    return callback(null, this.projects);
  };

  _proto.getPhoto = function getPhoto(id, callback) {
    return callback(null, this.photos[id]);
  };

  _proto.getAttachment = function getAttachment(id, callback) {
    return callback(null, this.photos[id]);
  };

  _proto.getAudio = function getAudio(id, callback) {
    return callback(null, this.audio[id]);
  };

  _proto.getAudioTrack = function getAudioTrack(id, callback) {
    return callback(null, this.tracks[id]);
  };

  _proto.getVideo = function getVideo(id, callback) {
    return callback(null, this.videos[id]);
  };

  _proto.getVideoTrack = function getVideoTrack(id, callback) {
    return callback(null, this.tracks[id]);
  };

  _proto.getChoiceListComplete = function getChoiceListComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  _proto.getClassificationSetComplete = function getClassificationSetComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  _proto.getFormComplete = function getFormComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  _proto.getRecordComplete = function getRecordComplete(id, form, object, callback) {
    this.cache[id] = object;
    callback();
  };

  _proto.getUserComplete = function getUserComplete(id, object, callback) {
    this.cache[id] = object;
    callback();
  };

  _proto.getUsersComplete = function getUsersComplete(params, object, callback) {
    this.users = object;
    callback();
  };

  _proto.getProjectsComplete = function getProjectsComplete(params, object, callback) {
    this.projects = object;
    callback();
  };

  _proto.getPhotoComplete = function getPhotoComplete(id, object, callback) {
    if (object.processed) {
      this.photos[id] = object;
    }

    callback();
  };

  _proto.getAttachmentComplete = function getAttachmentComplete(id, object, callback) {
    if (object.processed) {
      this.attachments[id] = object;
    }

    callback();
  };

  _proto.getAudioComplete = function getAudioComplete(id, object, callback) {
    if (object.processed) {
      this.audio[id] = object;
    }

    callback();
  };

  _proto.getAudioTrackComplete = function getAudioTrackComplete(id, object, callback) {
    this.tracks[id] = object;
    callback();
  };

  _proto.getVideoComplete = function getVideoComplete(id, object, callback) {
    if (object.processed) {
      this.videos[id] = object;
    }

    callback();
  };

  _proto.getVideoTrackComplete = function getVideoTrackComplete(id, object, callback) {
    this.tracks[id] = object;
    callback();
  };

  return MemoryDataSource;
}();

exports["default"] = MemoryDataSource;
//# sourceMappingURL=memory-data-source.js.map