"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaItemValue {
    constructor(mediaValue, attributes) {
        this.mediaValue = mediaValue;
        this.caption = attributes.caption;
        this.mediaID = attributes[this.mediaKey];
    }
    toJSON() {
        const json = {};
        json.caption = this.caption || null;
        json[this.mediaKey] = this.mediaID || null;
        return json;
    }
}
exports.default = MediaItemValue;
//# sourceMappingURL=media-item-value.js.map