"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _choice = _interopRequireDefault(require("./choice"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var StatusChoice = /*#__PURE__*/function (_Choice) {
  _inheritsLoose(StatusChoice, _Choice);
  function StatusChoice(attributes) {
    var _this;
    _this = _Choice.call(this, attributes) || this;
    _this.color = attributes.color;
    return _this;
  }
  return StatusChoice;
}(_choice["default"]);
exports["default"] = StatusChoice;
//# sourceMappingURL=status-choice.js.map