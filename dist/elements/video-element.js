"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaElement = _interopRequireDefault(require("./media-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VideoElement = /*#__PURE__*/function (_MediaElement) {
  _inheritsLoose(VideoElement, _MediaElement);

  function VideoElement(parent, attributes) {
    var _this;

    _this = _MediaElement.call(this, parent, attributes) || this;
    _this.trackEnabled = !!attributes.track_enabled;
    _this.audioEnabled = !!attributes.audio_enabled;
    return _this;
  }

  return VideoElement;
}(_mediaElement["default"]);

exports["default"] = VideoElement;
//# sourceMappingURL=video-element.js.map