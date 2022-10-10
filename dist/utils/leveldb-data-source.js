"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _choiceList = _interopRequireDefault(require("../choice-list"));

var _classificationSet = _interopRequireDefault(require("../classification-set"));

var _form = _interopRequireDefault(require("../form"));

var _async = _interopRequireDefault(require("async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CACHE_VERSION = 1;

var LevelDBDataSource =
/*#__PURE__*/
function () {
  function LevelDBDataSource(db, cacheVersion) {
    this.db = db;
    this.callbacks = [];
    this.cacheVersion = cacheVersion || CACHE_VERSION;
  }

  var _proto = LevelDBDataSource.prototype;

  _proto.initialize = function initialize(_ref, callback) {
    var _this = this;

    var formVersions = _ref.formVersions,
        choiceListVersions = _ref.choiceListVersions,
        classificationSetVersions = _ref.classificationSetVersions;
    var objects = [];
    this.checkVersion(function () {
      for (var _i = 0, _Object$keys = Object.keys(formVersions); _i < _Object$keys.length; _i++) {
        var id = _Object$keys[_i];
        objects.push({
          type: 'form',
          id: id,
          version: formVersions[id]
        });
      }

      for (var _i2 = 0, _Object$keys2 = Object.keys(choiceListVersions); _i2 < _Object$keys2.length; _i2++) {
        var _id = _Object$keys2[_i2];
        objects.push({
          type: 'choice-list',
          id: _id,
          version: choiceListVersions[_id]
        });
      }

      for (var _i3 = 0, _Object$keys3 = Object.keys(classificationSetVersions); _i3 < _Object$keys3.length; _i3++) {
        var _id2 = _Object$keys3[_i3];
        objects.push({
          type: 'classification-set',
          id: _id2,
          version: classificationSetVersions[_id2]
        });
      }

      _this.getVersions(function (err, versions) {
        if (err) {
          return callback(err);
        }

        return _async["default"].each(objects, function (object, cb) {
          var key = _this.key(object.type, object.id);

          var version = object.version; // delete the object from the cache if the versions don't match

          if (versions[key] == null || versions[key] !== version) {
            return _this.del(key, cb);
          }

          return cb(err);
        }, callback);
      });
    });
  };

  _proto.checkAlreadyFetching = function checkAlreadyFetching(id, callback) {
    if (!this.callbacks[id]) {
      this.callbacks[id] = [];
    }

    this.callbacks[id].push(callback);
    return this.callbacks[id].length > 1;
  };

  _proto.invokeCallbacks = function invokeCallbacks(id, err, object) {
    for (var _iterator = this.callbacks[id], _isArray = Array.isArray(_iterator), _i4 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i4 >= _iterator.length) break;
        _ref2 = _iterator[_i4++];
      } else {
        _i4 = _iterator.next();
        if (_i4.done) break;
        _ref2 = _i4.value;
      }

      var handler = _ref2;
      handler(err, object);
    }

    delete this.callbacks[id];
  };

  _proto.get = function get(key, callback) {
    return this.db.get(key, function (err, value) {
      if (err && err.notFound) {
        return callback(null, null);
      }

      return callback(err, value && JSON.parse(value));
    });
  };

  _proto.del = function del(key, callback) {
    return this.db.del(key, callback);
  };

  _proto.put = function put(key, value, callback) {
    return this.db.put(key, JSON.stringify(value), callback);
  };

  _proto.key = function key(type, id) {
    return [type, id].join(':');
  };

  _proto.getChoiceList = function getChoiceList(id, callback) {
    var _this2 = this;

    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('choice-list', id), function (err, json) {
      _this2.invokeCallbacks(id, err, json ? new _choiceList["default"](json) : null);
    });
  };

  _proto.getClassificationSet = function getClassificationSet(id, callback) {
    var _this3 = this;

    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('classification-set', id), function (err, json) {
      _this3.invokeCallbacks(id, err, json ? new _classificationSet["default"](json) : null);
    });
  };

  _proto.getForm = function getForm(id, callback) {
    var _this4 = this;

    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('form', id), function (err, json) {
      _this4.invokeCallbacks(id, err, json ? new _form["default"](json) : null);
    });
  };

  _proto.getChoiceListComplete = function getChoiceListComplete(id, object, callback) {
    this.updateObject(this.key('choice-list', id), object, callback);
  };

  _proto.getClassificationSetComplete = function getClassificationSetComplete(id, object, callback) {
    this.updateObject(this.key('classification-set', id), object, callback);
  };

  _proto.getFormComplete = function getFormComplete(id, object, callback) {
    this.updateObject(this.key('form', id), object, callback);
  };

  _proto.updateObject = function updateObject(key, object, callback) {
    var _this5 = this;

    this.put(key, object, function (err) {
      if (err) {
        return callback(err);
      }

      return _this5.updateVersion(key, object.version, callback);
    });
  };

  _proto.getVersions = function getVersions(callback) {
    this.get('versions', function (err, object) {
      if (err) {
        return callback(err);
      }

      return callback(null, object || {});
    });
  };

  _proto.updateVersion = function updateVersion(key, version, callback) {
    var _this6 = this;

    this.getVersions(function (err, versions) {
      if (err) {
        return callback(err);
      }

      versions[key] = version;

      _this6.put('versions', versions, callback);

      return null;
    });
  };

  _proto.checkVersion = function checkVersion(callback) {
    var _this7 = this;

    this.get('version', function (err, version) {
      if (err) {
        return callback(err);
      }

      if (version !== _this7.cacheVersion) {
        _this7.deleteAll(function (err) {
          if (err) {
            return callback(err);
          }

          return _this7.put('version', _this7.cacheVersion, callback);
        });

        return null;
      }

      return callback();
    });
  };

  _proto.deleteAll = function deleteAll(callback) {
    var _this8 = this;

    var keys = [];
    this.db.createKeyStream().on('data', function (key) {
      keys.push(key);
    }).on('close', function () {
      _async["default"].each(keys, function (key, cb) {
        _this8.del(key, cb);
      }, callback);
    });
  };

  return LevelDBDataSource;
}();

exports["default"] = LevelDBDataSource;
//# sourceMappingURL=leveldb-data-source.js.map