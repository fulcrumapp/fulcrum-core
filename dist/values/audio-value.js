"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mediaValue = _interopRequireDefault(require("./media-value"));

var _audioItemValue = _interopRequireDefault(require("./audio-item-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AudioValue = /*#__PURE__*/function (_MediaValue) {
  _inheritsLoose(AudioValue, _MediaValue);

  function AudioValue() {
    return _MediaValue.apply(this, arguments) || this;
  }

  _createClass(AudioValue, [{
    key: "ItemClass",
    get: function get() {
      return _audioItemValue["default"];
    }
  }, {
    key: "displayValue",
    get: function get() {
      if (this.length === 1) {
        return '1 Audio File';
      }

      return this.length + " Audio Files";
    }
  }]);

  return AudioValue;
}(_mediaValue["default"]);

exports["default"] = AudioValue;
//# sourceMappingURL=audio-value.js.map