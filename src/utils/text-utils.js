import { includes, startsWith, trim } from 'lodash';

export default class TextUtils {
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
    if (needle == null) {
      return false;
    }

    return includes(haystack.toLowerCase(), needle.toLowerCase());
  }

  static startsWith(haystack, needle) {
    if (needle == null) {
      return false;
    }

    return startsWith(haystack, needle);
  }

  static trim(value) {
    return trim(value);
  }
}
