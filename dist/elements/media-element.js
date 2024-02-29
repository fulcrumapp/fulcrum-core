"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = __importDefault(require("./element"));
class MediaElement extends element_1.default {
    get isLengthValidationSupported() {
        return true;
    }
    set overrideMediaGalleryEnabled(override) {
        this._overrideMediaGalleryEnabled = override;
    }
    get overrideMediaGalleryEnabled() {
        return this._overrideMediaGalleryEnabled;
    }
    get overrideValues() {
        return Object.assign(Object.getOwnPropertyDescriptor(element_1.default.prototype, 'overrideValues').get.call(this), {
            overrideMediaGalleryEnabled: this._overrideMediaGalleryEnabled
        });
    }
    resetOverrides() {
        super.resetOverrides();
        this._overrideMediaGalleryEnabled = null;
    }
}
exports.default = MediaElement;
//# sourceMappingURL=media-element.js.map