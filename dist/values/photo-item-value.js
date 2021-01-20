"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaItemValue = _interopRequireDefault(require("./media-item-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var PhotoItemValue = /*#__PURE__*/function (_MediaItemValue) {
  _inheritsLoose(PhotoItemValue, _MediaItemValue);

  function PhotoItemValue() {
    return _MediaItemValue.apply(this, arguments) || this;
  }

  _createClass(PhotoItemValue, [{
    key: "mediaKey",
    get: function get() {
      return 'photo_id';
    }
  }]);

  return PhotoItemValue;
}(_mediaItemValue["default"]);

exports["default"] = PhotoItemValue;
//# sourceMappingURL=photo-item-value.js.map