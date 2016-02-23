'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaElement = require('./media-element');

var _mediaElement2 = _interopRequireDefault(_mediaElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AudioElement extends _mediaElement2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.trackEnabled = !!attributes.track_enabled;
  }
}
exports.default = AudioElement;
//# sourceMappingURL=audio-element.js.map