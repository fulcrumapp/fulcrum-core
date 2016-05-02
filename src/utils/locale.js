export default class Locale {
  static currentLocale() {
    return Locale.__currentLocale();
  }

  static __currentLocale() {
    return 'en-US';
  }

  static supportsECMA402() {
    if (typeof Intl !== 'undefined') {
      return true;
    }

    return false;
  }
}
