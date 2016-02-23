'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextUtils {
  static isEmpty(value) {
    if (value == null) {
      return true;
    }

    if (TextUtils.trim(value).length < 1) {
      return true;
    }

    return false;
  }

  static isPresent(value) {
    return !TextUtils.isEmpty(value);
  }

  static contains(haystack, needle) {
    if (needle === null) {
      return false;
    }

    return _lodash2.default.contains(haystack.toLowerCase(), needle.toLowerCase());
  }

  static startsWith(haystack, needle) {
    if (needle === null) {
      return false;
    }

    return _lodash2.default.startsWith(haystack, needle);
  }

  static trim(value) {
    return _lodash2.default.trim(value);
  }
}
exports.default = TextUtils;
//# sourceMappingURL=text-utils.js.map