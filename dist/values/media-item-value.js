"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaItemValue = function () {
  function MediaItemValue(attributes) {
    _classCallCheck(this, MediaItemValue);

    this.caption = attributes.caption;
    this.mediaID = attributes[this.mediaKey];
  }

  MediaItemValue.prototype.toJSON = function toJSON() {
    var json = {};

    json.caption = this.caption || null;
    json[this.mediaKey] = this.mediaID || null;

    return json;
  };

  return MediaItemValue;
}();

exports.default = MediaItemValue;
//# sourceMappingURL=media-item-value.js.map