"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualValue = _interopRequireDefault(require("./textual-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var StatusValue =
/*#__PURE__*/
function (_TextualValue) {
  _inheritsLoose(StatusValue, _TextualValue);

  function StatusValue() {
    return _TextualValue.apply(this, arguments) || this;
  }

  _createClass(StatusValue, [{
    key: "displayValue",
    get: function get() {
      var choice = this.element.statusForValue(this.textValue);
      return choice ? choice.label : this.textValue || '';
    }
  }, {
    key: "searchableValue",
    get: function get() {
      return this.displayValue;
    }
  }]);

  return StatusValue;
}(_textualValue["default"]);

exports["default"] = StatusValue;
//# sourceMappingURL=status-value.js.map