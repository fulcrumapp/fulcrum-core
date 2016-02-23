'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Locale {
  static currentLocale() {
    return Locale.__currentLocale();
  }

  static __currentLocale() {
    return 'en-US';
  }

  static supportsECMA402() {
    if (typeof Intl !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }
}
exports.default = Locale;
//# sourceMappingURL=locale.js.map