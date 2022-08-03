"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaValue = _interopRequireDefault(require("./media-value"));

var _textUtils = _interopRequireDefault(require("../utils/text-utils"));

var _attachmentItemValue = _interopRequireDefault(require("./attachment-item-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AttachmentValue = /*#__PURE__*/function (_MediaValue) {
  _inheritsLoose(AttachmentValue, _MediaValue);

  function AttachmentValue() {
    return _MediaValue.apply(this, arguments) || this;
  }

  var _proto = AttachmentValue.prototype;

  _proto.addItem = function addItem(id, name) {
    var item = new this.ItemClass(this, {
      name: name
    });
    item.mediaID = id;

    this._items.push(item);

    return item;
  };

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

      for (var _iterator = _createForOfIteratorHelperLoose(this._items), _step; !(_step = _iterator()).done;) {
        var item = _step.value;

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