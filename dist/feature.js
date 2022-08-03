"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var notImplemented = function notImplemented() {
  throw new Error('Not implemented');
};

var Feature = /*#__PURE__*/function () {
  function Feature() {}

  var _proto = Feature.prototype;

  _proto.toJSON = function toJSON() {
    notImplemented();
  };

  _proto.updateTimetamps = function updateTimetamps() {
    notImplemented();
  };

  _createClass(Feature, [{
    key: "id",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "createdAt",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "updatedAt",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "formValues",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "hasCoordinate",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "isGeometryEnabled",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "displayValue",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "searchableValue",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "createdDuration",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "updatedDuration",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "editedDuration",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "hasCreatedCoordinate",
    get: function get() {
      notImplemented();
    }
  }, {
    key: "hasUpdatedCoordinate",
    get: function get() {
      notImplemented();
    }
  }]);

  return Feature;
}();

exports["default"] = Feature;
//# sourceMappingURL=feature.js.map