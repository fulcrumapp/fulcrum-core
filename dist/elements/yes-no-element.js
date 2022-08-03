"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

var _choice = _interopRequireDefault(require("./choice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var YesNoElement = /*#__PURE__*/function (_TextualElement) {
  _inheritsLoose(YesNoElement, _TextualElement);

  function YesNoElement(parent, attributes) {
    var _this;

    _this = _TextualElement.call(this, parent, attributes) || this;
    _this.positiveChoice = new _choice["default"](attributes.positive);
    _this.negativeChoice = new _choice["default"](attributes.negative);
    _this.neutralChoice = new _choice["default"](attributes.neutral);
    _this.neutralEnabled = !!attributes.neutral_enabled;
    return _this;
  }

  var _proto = YesNoElement.prototype;

  _proto.toJSON = function toJSON() {
    var json = _TextualElement.prototype.toJSON.call(this);

    return _extends({}, json, {
      positive: this.positiveChoice.toJSON(),
      negative: this.negativeChoice.toJSON(),
      neutral: this.neutralChoice.toJSON(),
      neutral_enabled: !!this.neutralEnabled,
      default_previous_value: !!this._defaultPreviousValue
    });
  };

  return YesNoElement;
}(_textualElement["default"]);

exports["default"] = YesNoElement;
//# sourceMappingURL=yes-no-element.js.map