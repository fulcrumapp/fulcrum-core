"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemoryDataSource = function () {
  function MemoryDataSource(name) {
    _classCallCheck(this, MemoryDataSource);

    this.cache = {};
  }

  _createClass(MemoryDataSource, [{
    key: "getChoiceList",
    value: function getChoiceList(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: "getClassificationSet",
    value: function getClassificationSet(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: "getForm",
    value: function getForm(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: "getRecord",
    value: function getRecord(id, callback) {
      return callback(null, this.cache[id]);
    }
  }, {
    key: "getChoiceListComplete",
    value: function getChoiceListComplete(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }, {
    key: "getClassificationSetComplete",
    value: function getClassificationSetComplete(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }, {
    key: "getFormComplete",
    value: function getFormComplete(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }, {
    key: "getRecordComplete",
    value: function getRecordComplete(id, object, callback) {
      this.cache[id] = object;
      callback();
    }
  }]);

  return MemoryDataSource;
}();

exports.default = MemoryDataSource;
//# sourceMappingURL=memory-data-source.js.map