'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locale = (function () {
  function Locale() {
    _classCallCheck(this, Locale);
  }

  _createClass(Locale, null, [{
    key: 'currentLocale',
    value: function currentLocale() {
      return Locale.__currentLocale();
    }
  }, {
    key: '__currentLocale',
    value: function __currentLocale() {
      return 'en-US';
    }
  }, {
    key: 'supportsECMA402',
    value: function supportsECMA402() {
      if (typeof Intl !== 'undefined') {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Locale;
})();

exports.default = Locale;
//# sourceMappingURL=locale.js.map