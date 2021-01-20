"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GeometryRequiredValidationError = /*#__PURE__*/function () {
  function GeometryRequiredValidationError() {}

  _createClass(GeometryRequiredValidationError, [{
    key: "message",
    get: function get() {
      return 'A validation location is required.';
    }
  }]);

  return GeometryRequiredValidationError;
}();

exports["default"] = GeometryRequiredValidationError;
//# sourceMappingURL=geometry-required-validation-error.js.map