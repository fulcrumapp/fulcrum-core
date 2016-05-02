'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locale = function () {
  function Locale() {
    _classCallCheck(this, Locale);
  }

  Locale.currentLocale = function currentLocale() {
    return Locale.__currentLocale();
  };

  Locale.__currentLocale = function __currentLocale() {
    return 'en-US';
  };

  Locale.supportsECMA402 = function supportsECMA402() {
    if (typeof Intl !== 'undefined') {
      return true;
    }

    return false;
  };

  return Locale;
}();

exports.default = Locale;
//# sourceMappingURL=locale.js.map