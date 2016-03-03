'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementValidationError = require('./element-validation-error');

var _elementValidationError2 = _interopRequireDefault(_elementValidationError);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AT_LEAST = 'at-least';
var AT_MOST = 'at-most';
var BETWEEN = 'between';
var EXACTLY = 'exactly';

var LengthValidationError = function (_ElementValidationErr) {
  _inherits(LengthValidationError, _ElementValidationErr);

  function LengthValidationError(element) {
    _classCallCheck(this, LengthValidationError);

    var _this = _possibleConstructorReturn(this, _ElementValidationErr.call(this, element));

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

  LengthValidationError.prototype.messageWithFormats = function messageWithFormats(singularFormat, pluralFormat, length) {
    if (length === 1) {
      return (0, _util.format)(singularFormat, this.label, length);
    } else {
      return (0, _util.format)(pluralFormat, this.label, length);
    }
  };

  _createClass(LengthValidationError, [{
    key: 'message',
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
    key: 'isAtLeastError',
    get: function get() {
      return this.type === AT_LEAST;
    }
  }, {
    key: 'isAtMostError',
    get: function get() {
      return this.type === AT_MOST;
    }
  }, {
    key: 'isBetweenError',
    get: function get() {
      return this.type === BETWEEN;
    }
  }, {
    key: 'isExactlyError',
    get: function get() {
      return this.type === EXACTLY;
    }
  }, {
    key: 'textElementMessage',
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
    key: 'photoElementMessage',
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
    key: 'videoElementMessage',
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
    key: 'audioElementMessage',
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
    key: 'choiceElementMessage',
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
    key: 'repeatableElementMessage',
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
}(_elementValidationError2.default);

exports.default = LengthValidationError;
//# sourceMappingURL=length-validation-error.js.map