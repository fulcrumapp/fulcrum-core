import _ from 'lodash';

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

    return _.includes(haystack.toLowerCase(), needle.toLowerCase());
  }

  static startsWith(haystack, needle) {
    if (needle == null) {
      return false;
    }

    return _.startsWith(haystack, needle);
  }

  static trim(value) {
    return _.trim(value);
  }
}
