'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextUtils = (function () {
  function TextUtils() {
    _classCallCheck(this, TextUtils);
  }

  _createClass(TextUtils, null, [{
    key: 'isEmpty',
    value: function isEmpty(value) {
      if (value == null) {
        return true;
      }

      if (TextUtils.trim(value).length < 1) {
        return true;
      }

      return false;
    }
  }, {
    key: 'isPresent',
    value: function isPresent(value) {
      return !TextUtils.isEmpty(value);
    }
  }, {
    key: 'contains',
    value: function contains(haystack, needle) {
      return _lodash2.default.contains(haystack.toLowerCase(), needle.toLowerCase());
    }
  }, {
    key: 'startsWith',
    value: function startsWith(haystack, needle) {
      return _lodash2.default.startsWith(haystack, needle);
    }
  }, {
    key: 'trim',
    value: function trim(value) {
      return _lodash2.default.trim(value);
    }
  }]);

  return TextUtils;
})();

exports.default = TextUtils;
//# sourceMappingURL=text-utils.js.map