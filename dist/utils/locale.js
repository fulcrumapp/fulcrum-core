"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var Locale =
/*#__PURE__*/
function () {
  function Locale() {}

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

exports["default"] = Locale;
//# sourceMappingURL=locale.js.map