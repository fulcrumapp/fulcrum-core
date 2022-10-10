"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var Choice = /*#__PURE__*/function () {
  function Choice(attributes) {
    this.label = attributes.label;
    this.value = attributes.value || attributes.label;
  }
  var _proto = Choice.prototype;
  _proto.toJSON = function toJSON() {
    return {
      label: this.label,
      value: this.value
    };
  };
  return Choice;
}();
exports["default"] = Choice;
//# sourceMappingURL=choice.js.map