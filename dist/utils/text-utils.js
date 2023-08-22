"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const includes_1 = __importDefault(require("lodash/includes"));
const startswith_1 = __importDefault(require("lodash/startswith"));
const trim_1 = __importDefault(require("lodash/trim"));
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
        return (0, includes_1.default)(haystack.toLowerCase(), needle.toLowerCase());
    }
    static startsWith(haystack, needle) {
        if (needle == null) {
            return false;
        }
        return (0, startswith_1.default)(haystack, needle);
    }
    static trim(value) {
        return (0, trim_1.default)(value);
    }
}
exports.default = TextUtils;
//# sourceMappingURL=text-utils.js.map