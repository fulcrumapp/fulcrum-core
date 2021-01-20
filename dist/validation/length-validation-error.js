"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _elementValidationError = _interopRequireDefault(require("./element-validation-error"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AT_LEAST = 'at-least';
var AT_MOST = 'at-most';
var BETWEEN = 'between';
var EXACTLY = 'exactly';

var LengthValidationError = /*#__PURE__*/function (_ElementValidationErr) {
  _inheritsLoose(LengthValidationError, _ElementValidationErr);

  function LengthValidationError(element) {
    var _this;

    _this = _ElementValidationErr.call(this, element) || this;

    if (element.hasMinLength && element.hasMaxLength && element.minLength === element.maxLength) {
      _this.type = EXACTLY;
    } else if (element.hasMinLength && element.hasMaxLength) {
      _this.type = BETWEEN;
    } else if (element.hasMinLength) {
      _this.type = AT_LEAST;
    } else if (element.hasMaxLength) {
      _this.type = AT_MOST;
    }

    return _this;
  }

  var _proto = LengthValidationError.prototype;

  _proto.messageWithFormats = function messageWithFormats(singularFormat, pluralFormat, length) {
    if (length === 1) {
      return (0, _util.format)(singularFormat, this.label, length);
    }

    return (0, _util.format)(pluralFormat, this.label, length);
  };

  _createClass(LengthValidationError, [{
    key: "message",
    get: function get() {
      if (this.element.isTextElement) {
        return this.textElementMessage;
      } else if (this.element.isChoiceElement) {
        return this.choiceElementMessage;
      } else if (this.element.isPhotoElement) {
        return this.photoElementMessage;
      } else if (this.element.isVideoElement) {
        return this.videoElementMessage;
      } else if (this.element.isAudioElement) {
        return this.audioElementMessage;
      } else if (this.element.isRepeatableElement) {
        return this.repeatableElementMessage;
      }

      return '';
    }
  }, {
    key: "isAtLeastError",
    get: function get() {
      return this.type === AT_LEAST;
    }
  }, {
    key: "isAtMostError",
    get: function get() {
      return this.type === AT_MOST;
    }
  }, {
    key: "isBetweenError",
    get: function get() {
      return this.type === BETWEEN;
    }
  }, {
    key: "isExactlyError",
    get: function get() {
      return this.type === EXACTLY;
    }
  }, {
    key: "textElementMessage",
    get: function get() {
      if (this.isAtLeastError) {
        return this.messageWithFormats("The field '%s' must have at least 1 character.", "The field '%s' must have at least %s characters.", this.element.minLength);
      } else if (this.isAtMostError) {
        return this.messageWithFormats("The field '%s' cannot have more than 1 character.", "The field '%s' cannot have more than %s characters.", this.element.maxLength);
      } else if (this.isBetweenError) {
        return (0, _util.format)("The field '%s' must have between %s and %s characters.", this.label, this.element.minLength, this.element.maxLength);
      } else if (this.isExactlyError) {
        return this.messageWithFormats("The field '%s' must have exactly 1 character.", "The field '%s' must have exactly %s characters.", this.element.minLength);
      }

      return '';
    }
  }, {
    key: "photoElementMessage",
    get: function get() {
      if (this.isAtLeastError) {
        return this.messageWithFormats("The field '%s' must have at least 1 photo.", "The field '%s' must have at least %s photos.", this.element.minLength);
      } else if (this.isAtMostError) {
        return this.messageWithFormats("The field '%s' cannot have more than 1 photo.", "The field '%s' cannot have more than %s photos.", this.element.maxLength);
      } else if (this.isBetweenError) {
        return (0, _util.format)("The field '%s' must have between %s and %s photos.", this.label, this.element.minLength, this.element.maxLength);
      } else if (this.isExactlyError) {
        return this.messageWithFormats("The field '%s' must have exactly 1 photo.", "The field '%s' must have exactly %s photos.", this.element.minLength);
      }

      return '';
    }
  }, {
    key: "videoElementMessage",
    get: function get() {
      if (this.isAtLeastError) {
        return this.messageWithFormats("The field '%s' must have at least 1 video.", "The field '%s' must have at least %s videos.", this.element.minLength);
      } else if (this.isAtMostError) {
        return this.messageWithFormats("The field '%s' cannot have more than 1 video.", "The field '%s' cannot have more than %s videos.", this.element.maxLength);
      } else if (this.isBetweenError) {
        return (0, _util.format)("The field '%s' must have between %s and %s videos.", this.label, this.element.minLength, this.element.maxLength);
      } else if (this.isExactlyError) {
        return this.messageWithFormats("The field '%s' must have exactly 1 video.", "The field '%s' must have exactly %s videos.", this.element.minLength);
      }

      return '';
    }
  }, {
    key: "audioElementMessage",
    get: function get() {
      if (this.isAtLeastError) {
        return this.messageWithFormats("The field '%s' must have at least 1 audio file.", "The field '%s' must have at least %s audio files.", this.element.minLength);
      } else if (this.isAtMostError) {
        return this.messageWithFormats("The field '%s' cannot have more than 1 audio file.", "The field '%s' cannot have more than %s audio files.", this.element.maxLength);
      } else if (this.isBetweenError) {
        return (0, _util.format)("The field '%s' must have between %s and %s audio files.", this.label, this.element.minLength, this.element.maxLength);
      } else if (this.isExactlyError) {
        return this.messageWithFormats("The field '%s' must have exactly 1 audio file.", "The field '%s' must have exactly %s audio files.", this.element.minLength);
      }

      return '';
    }
  }, {
    key: "choiceElementMessage",
    get: function get() {
      if (this.isAtLeastError) {
        return this.messageWithFormats("The field '%s' must have at least 1 choice.", "The field '%s' must have at least %s choices.", this.element.minLength);
      } else if (this.isAtMostError) {
        return this.messageWithFormats("The field '%s' cannot have more than 1 choice.", "The field '%s' cannot have more than %s choices.", this.element.maxLength);
      } else if (this.isBetweenError) {
        return (0, _util.format)("The field '%s' must have between %s and %s choices.", this.label, this.element.minLength, this.element.maxLength);
      } else if (this.isExactlyError) {
        return this.messageWithFormats("The field '%s' must have exactly 1 choice.", "The field '%s' must have exactly %s choices.", this.element.minLength);
      }

      return '';
    }
  }, {
    key: "repeatableElementMessage",
    get: function get() {
      if (this.isAtLeastError) {
        return this.messageWithFormats("The field '%s' must have at least 1 item.", "The field '%s' must have at least %s items.", this.element.minLength);
      } else if (this.isAtMostError) {
        return this.messageWithFormats("The field '%s' cannot have more than 1 item.", "The field '%s' cannot have more than %s items.", this.element.maxLength);
      } else if (this.isBetweenError) {
        return (0, _util.format)("The field '%s' must have between %s and %s items.", this.label, this.element.minLength, this.element.maxLength);
      } else if (this.isExactlyError) {
        return this.messageWithFormats("The field '%s' must have exactly 1 item.", "The field '%s' must have exactly %s items.", this.element.minLength);
      }

      return '';
    }
  }]);

  return LengthValidationError;
}(_elementValidationError["default"]);

exports["default"] = LengthValidationError;
//# sourceMappingURL=length-validation-error.js.map