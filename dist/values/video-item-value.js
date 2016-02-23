'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaItemValue = require('./media-item-value');

var _mediaItemValue2 = _interopRequireDefault(_mediaItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VideoItemValue extends _mediaItemValue2.default {
  get mediaKey() {
    return 'video_id';
  }
}
exports.default = VideoItemValue;
//# sourceMappingURL=video-item-value.js.map