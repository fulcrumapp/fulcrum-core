'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaItemValue = require('./media-item-value');

var _mediaItemValue2 = _interopRequireDefault(_mediaItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PhotoItemValue extends _mediaItemValue2.default {
  get mediaKey() {
    return 'photo_id';
  }
}
exports.default = PhotoItemValue;
//# sourceMappingURL=photo-item-value.js.map