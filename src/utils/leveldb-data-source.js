import ChoiceList from '../choice-list';
import ClassificationSet from '../classification-set';
import Form from '../form';
import async from 'async';

const CACHE_VERSION = 1;

export default class LevelDBDataSource {
  constructor(db, cacheVersion) {
    this.db = db;
    this.callbacks = [];
    this.cacheVersion = cacheVersion || CACHE_VERSION;
  }

  initialize({formVersions, choiceListVersions, classificationSetVersions}, callback) {
    const objects = [];

    this.checkVersion(() => {
      for (const id of Object.keys(formVersions)) {
        objects.push({type: 'form', id, version: formVersions[id]});
      }

      for (const id of Object.keys(choiceListVersions)) {
        objects.push({type: 'choice-list', id, version: choiceListVersions[id]});
      }

      for (const id of Object.keys(classificationSetVersions)) {
        objects.push({type: 'classification-set', id, version: classificationSetVersions[id]});
      }

      this.getVersions((err, versions) => {
        if (err) {
          return callback(err);
        }

        return async.each(objects, (object, cb) => {
          const key = this.key(object.type, object.id);
          const version = object.version;

          // delete the object from the cache if the versions don't match
          if (versions[key] == null || (versions[key] != null && versions[key] !== version)) {
            return this.del(key, cb);
          }

          return cb(err);
        }, callback);
      });
    });
  }

  checkAlreadyFetching(id, callback) {
    if (!this.callbacks[id]) {
      this.callbacks[id] = [];
    }

    this.callbacks[id].push(callback);

    return this.callbacks[id].length > 1;
  }

  invokeCallbacks(id, err, object) {
    for (const handler of this.callbacks[id]) {
      handler(err, object);
    }

    delete this.callbacks[id];
  }

  get(key, callback) {
    return this.db.get(key, (err, value) => {
      if (err && err.notFound) {
        return callback(null, null);
      }

      return callback(err, value && JSON.parse(value));
    });
  }

  del(key, callback) {
    return this.db.del(key, callback);
  }

  put(key, value, callback) {
    return this.db.put(key, JSON.stringify(value), callback);
  }

  key(type, id) {
    return [ type, id ].join(':');
  }

  getChoiceList(id, callback) {
    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('choice-list', id), (err, json) => {
      this.invokeCallbacks(id, err, json ? new ChoiceList(json) : null);
    });
  }

  getClassificationSet(id, callback) {
    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('classification-set', id), (err, json) => {
      this.invokeCallbacks(id, err, json ? new ClassificationSet(json) : null);
    });
  }

  getForm(id, callback) {
    if (this.checkAlreadyFetching(id, callback)) {
      return;
    }

    this.get(this.key('form', id), (err, json) => {
      this.invokeCallbacks(id, err, json ? new Form(json) : null);
    });
  }

  getChoiceListComplete(id, object, callback) {
    this.updateObject(this.key('choice-list', id), object, callback);
  }

  getClassificationSetComplete(id, object, callback) {
    this.updateObject(this.key('classification-set', id), object, callback);
  }

  getFormComplete(id, object, callback) {
    this.updateObject(this.key('form', id), object, callback);
  }

  updateObject(key, object, callback) {
    this.put(key, object, (err) => {
      if (err) {
        return callback(err);
      }

      return this.updateVersion(key, object.version, callback);
    });
  }

  getVersions(callback) {
    this.get('versions', (err, object) => {
      if (err) {
        return callback(err);
      }

      return callback(null, object || {});
    });
  }

  updateVersion(key, version, callback) {
    this.getVersions((err, versions) => {
      if (err) {
        return callback(err);
      }

      versions[key] = version;

      this.put('versions', versions, callback);

      return null;
    });
  }

  checkVersion(callback) {
    this.get('version', (err, version) => {
      if (err) {
        return callback(err);
      }

      if (version !== this.cacheVersion) {
        this.deleteAll((err) => {
          if (err) {
            return callback(err);
          }

          return this.put('version', this.cacheVersion, callback);
        });

        return null;
      }

      return callback();
    });
  }

  deleteAll(callback) {
    const keys = [];

    this.db.createKeyStream()
      .on('data', (key) => {
        keys.push(key);
      })
      .on('close', () => {
        async.each(keys, (key, cb) => {
          this.del(key, cb);
        }, callback);
      });
  }
}
