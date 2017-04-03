'use strict';

exports.__esModule = true;

var _choiceList = require('../choice-list');

var _choiceList2 = _interopRequireDefault(_choiceList);

var _classificationSet = require('../classification-set');

var _classificationSet2 = _interopRequireDefault(_classificationSet);

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CACHE_VERSION = 1;

var LevelDBDataSource = function () {
  function LevelDBDataSource(db, cacheVersion) {
    _classCallCheck(this, LevelDBDataSource);

    this.db = db;
    this.callbacks = [];
    this.cacheVersion = cacheVersion || CACHE_VERSION;
  }

  LevelDBDataSource.prototype.initialize = function initialize(_ref, callback) {
    var _this = this;

    var formVersions = _ref.formVersions,
        choiceListVersions = _ref.choiceListVersions,
        classificationSetVersions = _ref.classificationSetVersions;

    var objects = [];

    this.checkVersion(function () {
      for (var _iterator = Object.keys(formVersions), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var id = _ref2;

        objects.push({ type: 'form', id: id, version: formVersions[id] });
      }

      for (var _iterator2 = Object.keys(choiceListVersions), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var _id = _ref3;

        objects.push({ type: 'choice-list', id: _id, version: choiceListVersions[_id] });
      }

      for (var _iterator3 = Object.keys(classificationSetVersions), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        var _id2 = _ref4;

        objects.push({ type: 'classification-set', id: _id2, version: classificationSetVersions[_id2] });
      }

      _this.getVersions(function (err, versions) {
        if (err) {
          return callback(err);
        }

        return _async2.default.each(objects, function (object, cb) {
          var key = _this.key(object.type, object.id);
          var version = object.version;

          // delete the object from the cache if the versions don't match
          if (versions[key] != null && versions[key] !== version) {
            return _this.del(key, cb);
          }

          return cb(err);
        }, callback);
      });
    });
  };

  LevelDBDataSource.prototype.checkAlreadyFetching = function checkAlreadyFetching(id, callback) {
    if (!this.callbacks[id]) {
      this.callbacks[id] = [];
    }

    this.callbacks[id].push(callback);

    return this.callbacks[id].length > 1;
  };

  LevelDBDataSource.prototype.invokeCallbacks = function invokeCallbacks(id, err, object) {
    for (var _iterator4 = this.callbacks[id], _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref5 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref5 = _i4.value;
      }

      var handler = _ref5;

      handler(err, object);
    }

    delete this.callbacks[id];
  };

  LevelDBDataSource.prototype.get = function get(key, callback) {
    return this.db.get(key, function (err, value) {
      if (err && err.notFound) {
        return callback(null, null);
      }

      return callback(err, value && JSON.parse(value));
    });
  };

  LevelDBDataSource.prototype.del = function del(key, callback) {
    return this.db.del(key, callback);
  };

  LevelDBDataSource.prototype.put = function put(key, value, callback) {
    return this.db.put(key, JSON.stringify(value), callback);
  };

  LevelDBDataSource.prototype.key = function key(type, id) {
    return [type, id].join(':');
  };

  LevelDBDataSource.prototype.getChoiceList = function getChoiceList(id, callback) {
    var _this2 = this;

    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('choice-list', id), function (err, json) {
      _this2.invokeCallbacks(id, err, json ? new _choiceList2.default(json) : null);
    });
  };

  LevelDBDataSource.prototype.getClassificationSet = function getClassificationSet(id, callback) {
    var _this3 = this;

    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('classification-set', id), function (err, json) {
      _this3.invokeCallbacks(id, err, json ? new _classificationSet2.default(json) : null);
    });
  };

  LevelDBDataSource.prototype.getForm = function getForm(id, callback) {
    var _this4 = this;

    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('form', id), function (err, json) {
      _this4.invokeCallbacks(id, err, json ? new _form2.default(json) : null);
    });
  };

  LevelDBDataSource.prototype.getChoiceListComplete = function getChoiceListComplete(id, object, callback) {
    this.updateObject(this.key('choice-list', id), object, callback);
  };

  LevelDBDataSource.prototype.getClassificationSetComplete = function getClassificationSetComplete(id, object, callback) {
    this.updateObject(this.key('classification-set', id), object, callback);
  };

  LevelDBDataSource.prototype.getFormComplete = function getFormComplete(id, object, callback) {
    this.updateObject(this.key('form', id), object, callback);
  };

  LevelDBDataSource.prototype.updateObject = function updateObject(key, object, callback) {
    var _this5 = this;

    this.put(key, object, function (err) {
      if (err) {
        return callback(err);
      }

      return _this5.updateVersion(key, object.version, callback);
    });
  };

  LevelDBDataSource.prototype.getVersions = function getVersions(callback) {
    this.get('versions', function (err, object) {
      if (err) {
        return callback(err);
      }

      return callback(null, object || {});
    });
  };

  LevelDBDataSource.prototype.updateVersion = function updateVersion(key, version, callback) {
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

  LevelDBDataSource.prototype.checkVersion = function checkVersion(callback) {
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

  LevelDBDataSource.prototype.deleteAll = function deleteAll(callback) {
    var _this8 = this;

    var keys = [];

    this.db.createKeyStream().on('data', function (key) {
      keys.push(key);
    }).on('close', function () {
      _async2.default.each(keys, function (key, cb) {
        _this8.del(key, cb);
      }, callback);
    });
  };

  return LevelDBDataSource;
}();

exports.default = LevelDBDataSource;
//# sourceMappingURL=leveldb-data-source.js.map