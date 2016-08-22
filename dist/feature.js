'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notImplemented = function notImplemented() {
  throw new Error('Not implemented');
};

var Feature = function () {
  function Feature() {
    _classCallCheck(this, Feature);
  }

  Feature.prototype.toJSON = function toJSON() {
    notImplemented();
  };

  Feature.prototype.updateTimetamps = function updateTimetamps() {
    notImplemented();
  };

  _createClass(Feature, [{
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
  }, {
    key: 'searchableValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'createdDuration',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'updatedDuration',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'editedDuration',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'hasCreatedCoordinate',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'hasUpdatedCoordinate',
    get: function get() {
      notImplemented();
    }
  }]);

  return Feature;
}();

exports.default = Feature;
//# sourceMappingURL=feature.js.map