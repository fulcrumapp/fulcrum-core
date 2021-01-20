"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaElement = _interopRequireDefault(require("./media-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AudioElement = /*#__PURE__*/function (_MediaElement) {
  _inheritsLoose(AudioElement, _MediaElement);

  function AudioElement(parent, attributes) {
    var _this;

    _this = _MediaElement.call(this, parent, attributes) || this;
    _this.trackEnabled = !!attributes.track_enabled;
    return _this;
  }

  return AudioElement;
}(_mediaElement["default"]);

exports["default"] = AudioElement;
//# sourceMappingURL=audio-element.js.map