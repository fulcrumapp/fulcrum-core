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

function noop(callback) {
  callback();
}

function store(dataSource, method, params, object, callback) {
  if (dataSource == null) {
    return callback(null, object);
  }

  const storeMethod = 'store' + method;

  const storeCallback = (err) => {
    if (err) {
      return callback(err);
    } else if (dataSource.previous) {
      return store(dataSource.previous, method, params, object, callback);
    } else {
      return callback(null, object);
    }
  };

  const storeArguments = params.concat([object, storeCallback]);

  (dataSource[storeMethod] || noop).apply(dataSource, storeArguments);

  return null;
}

function fetch(dataSource, method, params, callback) {
  const fetchMethod = 'fetch' + method;

  const fetchCallback = (err, object) => {
    if (err) {
      return callback(err);
    } else if (object) {
      return store(dataSource.previous, method, params, object, callback);
    } else if (dataSource.next) {
      return fetch(dataSource.next, method, params, callback);
    }

    return null;
  };

  const fetchArguments = params.concat([fetchCallback]);

  dataSource[fetchMethod].apply(dataSource, fetchArguments);
}

export default class DataSource {
  constructor() {
    this.next = null;
  }

  then(dataSource) {
    this.next = dataSource;
    dataSource.previous = this;
    return dataSource;
  }

  getChoiceList(id, callback) {
    fetch(this, 'ChoiceList', [id], callback);
  }

  getClassificationSet(id, callback) {
    fetch(this, 'ClassificationSet', [id], callback);
  }

  getForm(id, callback) {
    fetch(this, 'Form', [id], callback);
  }

  getRecord(id, callback) {
    fetch(this, 'Record', [id], callback);
  }
}
