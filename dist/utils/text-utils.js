"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class TextUtils {
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
        return (0, lodash_1.includes)(haystack.toLowerCase(), needle.toLowerCase());
    }
    static startsWith(haystack, needle) {
        if (needle == null) {
            return false;
        }
        return (0, lodash_1.startsWith)(haystack, needle);
    }
    static trim(value) {
        return (0, lodash_1.trim)(value);
    }
}
exports.default = TextUtils;
//# sourceMappingURL=text-utils.js.map