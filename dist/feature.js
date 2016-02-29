'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notImplemented = function notImplemented() {
  throw new Error('Not implemented');
};

var Feature = function () {
  function Feature() {
    _classCallCheck(this, Feature);
  }

  _createClass(Feature, [{
    key: 'toJSON',
    value: function toJSON() {
      notImplemented();
    }
  }, {
    key: 'updateTimetamps',
    value: function updateTimetamps() {
      notImplemented();
    }
  }, {
    key: 'id',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'createdAt',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'formValues',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'hasCoordinate',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'isGeometryEnabled',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      notImplemented();
    }
  }]);

  return Feature;
}();

exports.default = Feature;
//# sourceMappingURL=feature.js.map