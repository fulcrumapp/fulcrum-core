"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _booleanElement = _interopRequireDefault(require("./boolean-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CheckboxElement =
/*#__PURE__*/
function (_BooleanElement) {
  _inheritsLoose(CheckboxElement, _BooleanElement);

  function CheckboxElement() {
    return _BooleanElement.apply(this, arguments) || this;
  }

  var _proto = CheckboxElement.prototype;

  _proto.toJSON = function toJSON() {
    var json = _BooleanElement.prototype.toJSON.call(this);

    return _extends({}, json, {
      default_previous_value: !!this._defaultPreviousValue
    });
  };

  return CheckboxElement;
}(_booleanElement["default"]);

exports["default"] = CheckboxElement;
//# sourceMappingURL=checkbox-element.js.map