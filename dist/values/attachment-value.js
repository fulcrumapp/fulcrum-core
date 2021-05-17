"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaValue = _interopRequireDefault(require("./media-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

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
  }, {
    key: "searchableValue",
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var ids = [];

      for (var _iterator = this._items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var item = _ref;

        if (_textUtils["default"].isPresent(item.name)) {
          ids.push(item.name);
        }
      }

      return ids.join(' ');
    }
  }]);

  return AttachmentValue;
}(_mediaValue["default"]);

exports["default"] = AttachmentValue;
//# sourceMappingURL=attachment-value.js.map