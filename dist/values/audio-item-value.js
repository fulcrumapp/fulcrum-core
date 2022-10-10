"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _mediaItemValue = _interopRequireDefault(require("./media-item-value"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var AudioItemValue = /*#__PURE__*/function (_MediaItemValue) {
  _inheritsLoose(AudioItemValue, _MediaItemValue);
  function AudioItemValue() {
    return _MediaItemValue.apply(this, arguments) || this;
  }
  _createClass(AudioItemValue, [{
    key: "mediaKey",
    get: function get() {
      return 'audio_id';
    }
  }]);
  return AudioItemValue;
}(_mediaItemValue["default"]);
exports["default"] = AudioItemValue;
//# sourceMappingURL=audio-item-value.js.map