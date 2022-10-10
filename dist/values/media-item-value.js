"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var MediaItemValue =
/*#__PURE__*/
function () {
  function MediaItemValue(mediaValue, attributes) {
    this.mediaValue = mediaValue;
    this.caption = attributes.caption;
    this.mediaID = attributes[this.mediaKey];
  }

  var _proto = MediaItemValue.prototype;

  _proto.toJSON = function toJSON() {
    var json = {};
    json.caption = this.caption || null;
    json[this.mediaKey] = this.mediaID || null;
    return json;
  };

  return MediaItemValue;
}();

exports["default"] = MediaItemValue;
//# sourceMappingURL=media-item-value.js.map