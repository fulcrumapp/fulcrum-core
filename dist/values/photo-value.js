'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _photoItemValue = require('./photo-item-value');

var _photoItemValue2 = _interopRequireDefault(_photoItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PhotoValue extends _mediaValue2.default {
  get ItemClass() {
    return _photoItemValue2.default;
  }

  get displayValue() {
    if (this.length === 1) {
      return '1 Photo';
    } else {
      return `${ this.length } Photos`;
    }
  }
}
exports.default = PhotoValue;
//# sourceMappingURL=photo-value.js.map