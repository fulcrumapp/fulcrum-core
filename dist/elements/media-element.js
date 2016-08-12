'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MediaElement = function (_Element) {
  _inherits(MediaElement, _Element);

  function MediaElement() {
    _classCallCheck(this, MediaElement);

    return _possibleConstructorReturn(this, _Element.apply(this, arguments));
  }

  MediaElement.prototype.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    this._overrideMediaGalleryEnabled = null;
  };

  _createClass(MediaElement, [{
    key: 'isLengthValidationSupported',
    get: function get() {
      return true;
    }
  }, {
    key: 'overrideMediaGalleryEnabled',
    set: function set(override) {
      this._overrideMediaGalleryEnabled = override;
    },
    get: function get() {
      return this._overrideMediaGalleryEnabled;
    }
  }, {
    key: 'overrideValues',
    get: function get() {
      return Object.assign(Object.getOwnPropertyDescriptor(_element2.default.prototype, 'overrideValues'), {
        overrideMediaGalleryEnabled: this._overrideMediaGalleryEnabled
      });
    }
  }]);

  return MediaElement;
}(_element2.default);

exports.default = MediaElement;
//# sourceMappingURL=media-element.js.map