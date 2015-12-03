"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaItemValue = (function () {
  function MediaItemValue(attributes) {
    _classCallCheck(this, MediaItemValue);

    this.caption = attributes.caption;
    this.mediaID = attributes[this.mediaKey];
  }

  _createClass(MediaItemValue, [{
    key: "toJSON",
    value: function toJSON() {
      var json = {};

      json.caption = this.caption || null;
      json[this.mediaKey] = this.mediaID || null;

      return json;
    }
  }]);

  return MediaItemValue;
})();

exports.default = MediaItemValue;
//# sourceMappingURL=media-item-value.js.map