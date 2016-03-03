'use strict';

exports.__esModule = true;

var _choiceValue = require('./choice-value');

var _choiceValue2 = _interopRequireDefault(_choiceValue);

var _textValue = require('./text-value');

var _textValue2 = _interopRequireDefault(_textValue);

var _dateValue = require('./date-value');

var _dateValue2 = _interopRequireDefault(_dateValue);

var _timeValue = require('./time-value');

var _timeValue2 = _interopRequireDefault(_timeValue);

var _photoValue = require('./photo-value');

var _photoValue2 = _interopRequireDefault(_photoValue);

var _videoValue = require('./video-value');

var _videoValue2 = _interopRequireDefault(_videoValue);

var _audioValue = require('./audio-value');

var _audioValue2 = _interopRequireDefault(_audioValue);

var _signatureValue = require('./signature-value');

var _signatureValue2 = _interopRequireDefault(_signatureValue);

var _classificationValue = require('./classification-value');

var _classificationValue2 = _interopRequireDefault(_classificationValue);

var _repeatableValue = require('./repeatable-value');

var _repeatableValue2 = _interopRequireDefault(_repeatableValue);

var _addressValue = require('./address-value');

var _addressValue2 = _interopRequireDefault(_addressValue);

var _yesNoValue = require('./yes-no-value');

var _yesNoValue2 = _interopRequireDefault(_yesNoValue);

var _hyperlinkValue = require('./hyperlink-value');

var _hyperlinkValue2 = _interopRequireDefault(_hyperlinkValue);

var _barcodeValue = require('./barcode-value');

var _barcodeValue2 = _interopRequireDefault(_barcodeValue);

var _calculatedValue = require('./calculated-value');

var _calculatedValue2 = _interopRequireDefault(_calculatedValue);

var _recordLinkValue = require('./record-link-value');

var _recordLinkValue2 = _interopRequireDefault(_recordLinkValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constructors = {
  ChoiceField: _choiceValue2.default,
  TextField: _textValue2.default,
  DateTimeField: _dateValue2.default,
  DateField: _dateValue2.default,
  TimeField: _timeValue2.default,
  PhotoField: _photoValue2.default,
  VideoField: _videoValue2.default,
  AudioField: _audioValue2.default,
  SignatureField: _signatureValue2.default,
  ClassificationField: _classificationValue2.default,
  Repeatable: _repeatableValue2.default,
  AddressField: _addressValue2.default,
  YesNoField: _yesNoValue2.default,
  HyperlinkField: _hyperlinkValue2.default,
  BarcodeField: _barcodeValue2.default,
  CalculatedField: _calculatedValue2.default,
  RecordLinkField: _recordLinkValue2.default
};

var FormValueFactory = function () {
  function FormValueFactory() {
    _classCallCheck(this, FormValueFactory);
  }

  FormValueFactory.create = function create(element, attributes) {
    var constructor = Constructors[element.type];

    if (constructor == null) {
      throw new Error('Unsupported element ' + element.type);
    }

    return new constructor(element, attributes);
  };

  FormValueFactory.classes = function classes() {
    return Constructors;
  };

  return FormValueFactory;
}();

exports.default = FormValueFactory;
//# sourceMappingURL=form-value-factory.js.map