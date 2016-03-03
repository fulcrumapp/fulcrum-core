'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextUtils = function () {
  function TextUtils() {
    _classCallCheck(this, TextUtils);
  }

  TextUtils.isEmpty = function isEmpty(value) {
    if (value == null) {
      return true;
    }

    if (TextUtils.trim(value).length < 1) {
      return true;
    }

    return false;
  };

  TextUtils.isPresent = function isPresent(value) {
    return !TextUtils.isEmpty(value);
  };

  TextUtils.contains = function contains(haystack, needle) {
    if (needle === null) {
      return false;
    }

    return _lodash2.default.contains(haystack.toLowerCase(), needle.toLowerCase());
  };

  TextUtils.startsWith = function startsWith(haystack, needle) {
    if (needle === null) {
      return false;
    }

    return _lodash2.default.startsWith(haystack, needle);
  };

  TextUtils.trim = function trim(value) {
    return _lodash2.default.trim(value);
  };

  return TextUtils;
}();

exports.default = TextUtils;
//# sourceMappingURL=text-utils.js.map