"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _choiceValue = _interopRequireDefault(require("./choice-value"));

var _textValue = _interopRequireDefault(require("./text-value"));

var _dateValue = _interopRequireDefault(require("./date-value"));

var _timeValue = _interopRequireDefault(require("./time-value"));

var _photoValue = _interopRequireDefault(require("./photo-value"));

var _videoValue = _interopRequireDefault(require("./video-value"));

var _audioValue = _interopRequireDefault(require("./audio-value"));

var _attachmentValue = _interopRequireDefault(require("./attachment-value"));

var _signatureValue = _interopRequireDefault(require("./signature-value"));

var _classificationValue = _interopRequireDefault(require("./classification-value"));

var _repeatableValue = _interopRequireDefault(require("./repeatable-value"));

var _addressValue = _interopRequireDefault(require("./address-value"));

var _yesNoValue = _interopRequireDefault(require("./yes-no-value"));

var _hyperlinkValue = _interopRequireDefault(require("./hyperlink-value"));

var _barcodeValue = _interopRequireDefault(require("./barcode-value"));

var _calculatedValue = _interopRequireDefault(require("./calculated-value"));

var _recordLinkValue = _interopRequireDefault(require("./record-link-value"));

var _checkboxValue = _interopRequireDefault(require("./checkbox-value"));

var _dynamicValue = _interopRequireDefault(require("./dynamic-value"));

var _locationValue = _interopRequireDefault(require("./location-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Constructors = {
  ChoiceField: _choiceValue["default"],
  TextField: _textValue["default"],
  DateTimeField: _dateValue["default"],
  DateField: _dateValue["default"],
  TimeField: _timeValue["default"],
  PhotoField: _photoValue["default"],
  VideoField: _videoValue["default"],
  AudioField: _audioValue["default"],
  AttachmentField: _attachmentValue["default"],
  SignatureField: _signatureValue["default"],
  ClassificationField: _classificationValue["default"],
  Repeatable: _repeatableValue["default"],
  AddressField: _addressValue["default"],
  YesNoField: _yesNoValue["default"],
  HyperlinkField: _hyperlinkValue["default"],
  BarcodeField: _barcodeValue["default"],
  CalculatedField: _calculatedValue["default"],
  RecordLinkField: _recordLinkValue["default"],
  CheckboxField: _checkboxValue["default"],
  DynamicField: _dynamicValue["default"],
  LocationField: _locationValue["default"]
};

var FormValueFactory = /*#__PURE__*/function () {
  function FormValueFactory() {}

  FormValueFactory.create = function create(element, attributes) {
    var constructor = Constructors[element.type];

    if (constructor == null) {
      return null;
    }

    return new constructor(element, attributes);
  };

  FormValueFactory.classes = function classes() {
    return Constructors;
  };

  return FormValueFactory;
}();

exports["default"] = FormValueFactory;
//# sourceMappingURL=form-value-factory.js.map