'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sectionElement = require('./section-element');

var _sectionElement2 = _interopRequireDefault(_sectionElement);

var _choiceElement = require('./choice-element');

var _choiceElement2 = _interopRequireDefault(_choiceElement);

var _textElement = require('./text-element');

var _textElement2 = _interopRequireDefault(_textElement);

var _dateElement = require('./date-element');

var _dateElement2 = _interopRequireDefault(_dateElement);

var _timeElement = require('./time-element');

var _timeElement2 = _interopRequireDefault(_timeElement);

var _photoElement = require('./photo-element');

var _photoElement2 = _interopRequireDefault(_photoElement);

var _videoElement = require('./video-element');

var _videoElement2 = _interopRequireDefault(_videoElement);

var _audioElement = require('./audio-element');

var _audioElement2 = _interopRequireDefault(_audioElement);

var _signatureElement = require('./signature-element');

var _signatureElement2 = _interopRequireDefault(_signatureElement);

var _classificationElement = require('./classification-element');

var _classificationElement2 = _interopRequireDefault(_classificationElement);

var _repeatableElement = require('./repeatable-element');

var _repeatableElement2 = _interopRequireDefault(_repeatableElement);

var _addressElement = require('./address-element');

var _addressElement2 = _interopRequireDefault(_addressElement);

var _labelElement = require('./label-element');

var _labelElement2 = _interopRequireDefault(_labelElement);

var _yesNoElement = require('./yes-no-element');

var _yesNoElement2 = _interopRequireDefault(_yesNoElement);

var _hyperlinkElement = require('./hyperlink-element');

var _hyperlinkElement2 = _interopRequireDefault(_hyperlinkElement);

var _barcodeElement = require('./barcode-element');

var _barcodeElement2 = _interopRequireDefault(_barcodeElement);

var _calculatedElement = require('./calculated-element');

var _calculatedElement2 = _interopRequireDefault(_calculatedElement);

var _recordLinkElement = require('./record-link-element');

var _recordLinkElement2 = _interopRequireDefault(_recordLinkElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaProvider = null;

var Constructors = {
  Section: _sectionElement2.default,
  ChoiceField: _choiceElement2.default,
  TextField: _textElement2.default,
  DateTimeField: _dateElement2.default,
  DateField: _dateElement2.default,
  TimeField: _timeElement2.default,
  PhotoField: _photoElement2.default,
  VideoField: _videoElement2.default,
  AudioField: _audioElement2.default,
  SignatureField: _signatureElement2.default,
  ClassificationField: _classificationElement2.default,
  Repeatable: _repeatableElement2.default,
  AddressField: _addressElement2.default,
  Label: _labelElement2.default,
  YesNoField: _yesNoElement2.default,
  HyperlinkField: _hyperlinkElement2.default,
  BarcodeField: _barcodeElement2.default,
  CalculatedField: _calculatedElement2.default,
  RecordLinkField: _recordLinkElement2.default
};

var ElementFactory = function () {
  function ElementFactory() {
    _classCallCheck(this, ElementFactory);
  }

  _createClass(ElementFactory, null, [{
    key: 'create',
    value: function create(parent, attributes) {
      var constructor = Constructors[attributes.type];

      if (constructor == null) {
        throw new Error('Unsupported element ' + attributes.type);
      }

      return new constructor(parent, attributes);
    }
  }, {
    key: 'classes',
    value: function classes() {
      return Constructors;
    }
  }, {
    key: 'setProvider',
    value: function setProvider(provider) {
      SchemaProvider = provider;
    }
  }, {
    key: 'getProvider',
    value: function getProvider() {
      return SchemaProvider;
    }
  }]);

  return ElementFactory;
}();

exports.default = ElementFactory;
//# sourceMappingURL=element-factory.js.map