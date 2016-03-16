/*

  The DataSource class is a composable series of layers that can be used to
  chain data providers together to form more complex schemes.

  For example, we can setup several layers of caching and data providers:
    * A - First look in an in-memory hash (e.g. lives until a page refresh)
    * B - Then look in indexedDB (lives beyond a page refresh, but requires pulling from somewhere else)
    * C - Then finally actually hit the API to get it

  Given this configuration, when requesting data when it's not present at all, the request will travel
  all the way to the end and then each layer is given a chance to process it back on the way up. Passing
  the object back up is critical to being able to store the result at each level.

  A.then(B).then(C);

   get(callback)    -> A -> B -> C -
                                   |
   callback(object) <- A <- B <- C -

  So in this configuration, when asking for a form object, the memory data source would miss and delegate
  to the indexedDB data source, which would also miss and the API data source would end up providing the
  record from the live API. At that point the object is passed back to the indexedDB where it can be stored
  for the next time. After indexedDB stores it, it's passed to the memory cache so it can also store it. And
  finally the actual original callback is invoked with the object. The next time the object is fetched, it will
  be returned from the memory store. Unless a full page refresh happens, and indexedDB will return it first.

  After the first fetch:

   get(callback)    -> A    B    C
                       |
   callback(object) <- A    B    C

  After a full page refresh

   get(callback)    -> A -> B    C
                            |
   callback(object) <- A <- B    C

*/

function noop(...params) {
  params[params.length - 1]();
}

export default class DataSource {
  constructor() {
    this.sources = [];
  }

  get source() {
    return this.sources[this.sources.length - 1];
  }

  invoke(dataSource, method, params, callback) {
    const invokeCallback = (err, ...objects) => {
      if (err) {
        return callback(err);
      } else if (objects[0]) {
        return this.process(dataSource.previous, method, params, objects, callback);
      } else if (dataSource.next) {
        return this.invoke(dataSource.next, method, params, callback);
      }

      return callback(new Error('Unhandled request: ' + method));
    };

    const invokeArguments = params.concat([invokeCallback]);

    (dataSource[method] || noop).apply(dataSource, invokeArguments);
  }

  process(dataSource, method, params, objects, callback) {
    if (dataSource == null) {
      return callback.apply(null, [null].concat(objects));
    }

    const processMethod = method + 'Complete';

    const processCallback = (err) => {
      if (err) {
        return callback(err);
      } else if (dataSource.previous) {
        return this.process(dataSource.previous, method, params, objects, callback);
      } else {
        return callback.apply(null, [null].concat(objects));
      }
    };

    const processArguments = params.concat(objects.concat([processCallback]));

    (dataSource[processMethod] || noop).apply(dataSource, processArguments);

    return null;
  }

  add(source) {
    if (this.sources.length) {
      this.sources[this.sources.length - 1].next = source;
      source.previous = this.sources[this.sources.length - 1];
    }

    this.sources.push(source);

    return this;
  }

  get root() {
    return this.sources[0];
  }

  getChoiceList(id, callback) {
    this.invoke(this.root, 'getChoiceList', [id], callback);
  }

  getClassificationSet(id, callback) {
    this.invoke(this.root, 'getClassificationSet', [id], callback);
  }

  getForm(id, callback) {
    this.invoke(this.root, 'getForm', [id], callback);
  }

  getRecord(id, form, callback) {
    this.invoke(this.root, 'getRecord', [id, form], callback);
  }

  getRecords(form, params, callback) {
    this.invoke(this.root, 'getRecords', [form, params], callback);
  }

  getUsers(params, callback) {
    this.invoke(this.root, 'getUsers', [params], callback);
  }

  getProjects(params, callback) {
    this.invoke(this.root, 'getProjects', [params], callback);
  }

  getPhoto(id, callback) {
    this.invoke(this.root, 'getPhoto', [id], callback);
  }

  getAudio(id, callback) {
    this.invoke(this.root, 'getAudio', [id], callback);
  }

  getVideo(id, callback) {
    this.invoke(this.root, 'getVideo', [id], callback);
  }
}
