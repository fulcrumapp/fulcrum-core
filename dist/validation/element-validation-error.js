"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _form = _interopRequireDefault(require("../form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ElementValidationError =
/*#__PURE__*/
function () {
  function ElementValidationError(element) {
    this.element = element;
  }

  _createClass(ElementValidationError, [{
    key: "label",
    get: function get() {
      var parents = [];
      var iterator = this.element.parent;

      while (iterator) {
        if (!(iterator instanceof _form["default"])) {
          parents.push(iterator.label);
        }

        iterator = iterator.parent;
      }

      var parentLabels = parents.reverse().concat([this.element.label]);
      return parentLabels.join(' / ');
    }
  }]);

  return ElementValidationError;
}();

exports["default"] = ElementValidationError;
//# sourceMappingURL=element-validation-error.js.map