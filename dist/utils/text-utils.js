"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.includes"));

var _lodash2 = _interopRequireDefault(require("lodash.startswith"));

var _lodash3 = _interopRequireDefault(require("lodash.trim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TextUtils =
/*#__PURE__*/
function () {
  function TextUtils() {}

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
    if (needle == null) {
      return false;
    }

    return (0, _lodash["default"])(haystack.toLowerCase(), needle.toLowerCase());
  };

  TextUtils.startsWith = function startsWith(haystack, needle) {
    if (needle == null) {
      return false;
    }

    return (0, _lodash2["default"])(haystack, needle);
  };

  TextUtils.trim = function trim(value) {
    return (0, _lodash3["default"])(value);
  };

  return TextUtils;
}();

exports["default"] = TextUtils;
//# sourceMappingURL=text-utils.js.map