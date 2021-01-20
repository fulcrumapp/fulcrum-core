"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _async = _interopRequireDefault(require("async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function noop() {
  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  params[params.length - 1]();
}

var DataSource = /*#__PURE__*/function () {
  function DataSource() {
    this.sources = [];
  }

  var _proto = DataSource.prototype;

  _proto.invoke = function invoke(dataSource, method, params, callback) {
    var _this = this;

    var invokeCallback = function invokeCallback(err) {
      for (var _len2 = arguments.length, objects = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        objects[_key2 - 1] = arguments[_key2];
      }

      if (err) {
        return callback(err);
      } else if (objects[0]) {
        return _this.process(dataSource.previous, method, params, objects, callback);
      } else if (dataSource.next) {
        return _this.invoke(dataSource.next, method, params, callback);
      }

      return callback(new Error('Unhandled request: ' + method));
    };

    var invokeArguments = params.concat([invokeCallback]);
    (dataSource[method] || noop).apply(dataSource, invokeArguments);
  };

  _proto.process = function process(dataSource, method, params, objects, callback) {
    var _this2 = this;

    if (dataSource == null) {
      return callback.apply(null, [null].concat(objects));
    }

    var processMethod = method + 'Complete';

    var processCallback = function processCallback(err) {
      if (err) {
        return callback(err);
      } else if (dataSource.previous) {
        return _this2.process(dataSource.previous, method, params, objects, callback);
      }

      return callback.apply(null, [null].concat(objects));
    };

    var processArguments = params.concat(objects.concat([processCallback]));
    (dataSource[processMethod] || noop).apply(dataSource, processArguments);
    return null;
  };

  _proto.add = function add(source) {
    if (this.sources.length) {
      this.sources[this.sources.length - 1].next = source;
      source.previous = this.sources[this.sources.length - 1];
    }

    this.sources.push(source);
    return this;
  };

  _proto.prepare = function prepare(formID, callback) {
    var _this3 = this;

    var result = {};
    var tasks = {
      form: function form(callback) {
        _this3.getForm(formID, function (err, form) {
          if (err) {
            callback(err);
            return;
          }

          result.form = form;
          result.form.load(_this3, callback);
        });
      },
      users: function users(callback) {
        _this3.getUsers(null, function (err, users) {
          if (err) {
            callback(err);
            return;
          }

          result.users = users;
          callback(err);
        });
      },
      projects: function projects(callback) {
        _this3.getProjects(null, function (err, projects) {
          if (err) {
            callback(err);
            return;
          }

          result.projects = projects;
          callback(err);
        });
      }
    };

    _async["default"].parallel(tasks, function (err) {
      return callback(err, result);
    });
  };

  _proto.getChoiceList = function getChoiceList(id, callback) {
    this.invoke(this.root, 'getChoiceList', [id], callback);
  };

  _proto.getClassificationSet = function getClassificationSet(id, callback) {
    this.invoke(this.root, 'getClassificationSet', [id], callback);
  };

  _proto.getForm = function getForm(id, callback) {
    this.invoke(this.root, 'getForm', [id], callback);
  };

  _proto.getUser = function getUser(id, callback) {
    this.invoke(this.root, 'getUser', [id], callback);
  };

  _proto.getRecord = function getRecord(id, form, callback) {
    this.invoke(this.root, 'getRecord', [id, form], callback);
  };

  _proto.getRecords = function getRecords(form, params, callback) {
    this.invoke(this.root, 'getRecords', [form, params], callback);
  };

  _proto.queryRecords = function queryRecords(form, params, callback) {
    this.invoke(this.root, 'queryRecords', [form, params], callback);
  };

  _proto.getUsers = function getUsers(params, callback) {
    this.invoke(this.root, 'getUsers', [params], callback);
  };

  _proto.getProjects = function getProjects(params, callback) {
    this.invoke(this.root, 'getProjects', [params], callback);
  };

  _proto.getProject = function getProject(id, callback) {
    this.invoke(this.root, 'getProject', [id], callback);
  };

  _proto.getChangeset = function getChangeset(id, callback) {
    this.invoke(this.root, 'getChangeset', [id], callback);
  };

  _proto.getPhoto = function getPhoto(id, callback) {
    this.invoke(this.root, 'getPhoto', [id], callback);
  };

  _proto.getAudio = function getAudio(id, callback) {
    this.invoke(this.root, 'getAudio', [id], callback);
  };

  _proto.getAudioTrack = function getAudioTrack(id, callback) {
    this.invoke(this.root, 'getAudioTrack', [id], callback);
  };

  _proto.getVideo = function getVideo(id, callback) {
    this.invoke(this.root, 'getVideo', [id], callback);
  };

  _proto.getVideoTrack = function getVideoTrack(id, callback) {
    this.invoke(this.root, 'getVideoTrack', [id], callback);
  };

  _proto.createPhoto = function createPhoto(accessKey, file, progress, callback) {
    this.invoke(this.root, 'createPhoto', [accessKey, file, progress], callback);
  };

  _proto.createVideo = function createVideo(accessKey, file, progress, callback) {
    this.invoke(this.root, 'createVideo', [accessKey, file, progress], callback);
  };

  _proto.createAudio = function createAudio(accessKey, file, progress, callback) {
    this.invoke(this.root, 'createAudio', [accessKey, file, progress], callback);
  };

  _proto.createSignature = function createSignature(accessKey, file, progress, callback) {
    this.invoke(this.root, 'createSignature', [accessKey, file, progress], callback);
  };

  _proto.saveVideoTrack = function saveVideoTrack(accessKey, file, progress, callback) {
    this.invoke(this.root, 'saveVideoTrack', [accessKey, file, progress], callback);
  };

  _proto.saveAudioTrack = function saveAudioTrack(accessKey, file, progress, callback) {
    this.invoke(this.root, 'saveAudioTrack', [accessKey, file, progress], callback);
  };

  _proto.saveRecord = function saveRecord(record, callback) {
    this.invoke(this.root, 'saveRecord', [record], callback);
  };

  _proto.deleteRecord = function deleteRecord(record, callback) {
    this.invoke(this.root, 'deleteRecord', [record], callback);
  };

  _createClass(DataSource, [{
    key: "source",
    get: function get() {
      return this.sources[this.sources.length - 1];
    }
  }, {
    key: "root",
    get: function get() {
      return this.sources[0];
    }
  }]);

  return DataSource;
}();

exports["default"] = DataSource;
//# sourceMappingURL=data-source.js.map