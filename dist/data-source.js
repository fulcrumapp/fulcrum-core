'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function noop() {
  (arguments.length <= arguments.length - 1 + 0 ? undefined : arguments[arguments.length - 1 + 0])();
}

var DataSource = function () {
  function DataSource() {
    _classCallCheck(this, DataSource);

    this.sources = [];
  }

  _createClass(DataSource, [{
    key: 'invoke',
    value: function invoke(dataSource, method, params, callback) {
      var _this = this;

      var invokeCallback = function invokeCallback(err, object) {
        if (err) {
          return callback(err);
        } else if (object) {
          return _this.process(dataSource.previous, method, params, object, callback);
        } else if (dataSource.next) {
          return _this.invoke(dataSource.next, method, params, callback);
        }

        return callback(new Error('Unhandled request: ' + method));
      };

      var invokeArguments = params.concat([invokeCallback]);

      (dataSource[method] || noop).apply(dataSource, invokeArguments);
    }
  }, {
    key: 'process',
    value: function process(dataSource, method, params, object, callback) {
      var _this2 = this;

      if (dataSource == null) {
        return callback(null, object);
      }

      var processMethod = method + 'Complete';

      var processCallback = function processCallback(err) {
        if (err) {
          return callback(err);
        } else if (dataSource.previous) {
          return _this2.process(dataSource.previous, method, params, object, callback);
        } else {
          return callback(null, object);
        }
      };

      var processArguments = params.concat([object, processCallback]);

      (dataSource[processMethod] || noop).apply(dataSource, processArguments);

      return null;
    }
  }, {
    key: 'add',
    value: function add(source) {
      if (this.sources.length) {
        this.sources[this.sources.length - 1].next = source;
        source.previous = this.sources[this.sources.length - 1];
      }

      this.sources.push(source);

      return this;
    }
  }, {
    key: 'getChoiceList',
    value: function getChoiceList(id, callback) {
      this.invoke(this.root, 'getChoiceList', [id], callback);
    }
  }, {
    key: 'getClassificationSet',
    value: function getClassificationSet(id, callback) {
      this.invoke(this.root, 'getClassificationSet', [id], callback);
    }
  }, {
    key: 'getForm',
    value: function getForm(id, callback) {
      this.invoke(this.root, 'getForm', [id], callback);
    }
  }, {
    key: 'getRecord',
    value: function getRecord(id, callback) {
      this.invoke(this.root, 'getRecord', [id], callback);
    }
  }, {
    key: 'getRecords',
    value: function getRecords(params, callback) {
      this.invoke(this.root, 'getRecords', [params], callback);
    }
  }, {
    key: 'root',
    get: function get() {
      return this.sources[0];
    }
  }]);

  return DataSource;
}();

exports.default = DataSource;
//# sourceMappingURL=data-source.js.map