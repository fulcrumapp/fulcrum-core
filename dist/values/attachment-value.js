"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaValue = _interopRequireDefault(require("./media-value"));

var _attachmentItemValue = _interopRequireDefault(require("./attachment-item-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AttachmentValue =
/*#__PURE__*/
function (_MediaValue) {
  _inheritsLoose(AttachmentValue, _MediaValue);

  function AttachmentValue() {
    return _MediaValue.apply(this, arguments) || this;
  }

  _createClass(AttachmentValue, [{
    key: "ItemClass",
    get: function get() {
      return _attachmentItemValue["default"];
    }
  }, {
    key: "displayValue",
    get: function get() {
      if (this.length === 1) {
        return '1 Attachment';
      }

      return this.length + " Attachments";
    }
  }]);

  return AttachmentValue;
}(_mediaValue["default"]);

exports["default"] = AttachmentValue;
//# sourceMappingURL=attachment-value.js.map