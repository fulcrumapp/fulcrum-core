'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _videoItemValue = require('./video-item-value');

var _videoItemValue2 = _interopRequireDefault(_videoItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VideoValue extends _mediaValue2.default {
  get ItemClass() {
    return _videoItemValue2.default;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Video';
    } else {
      return `${ this.length } Videos`;
    }
  }
}
exports.default = VideoValue;
//# sourceMappingURL=video-value.js.map