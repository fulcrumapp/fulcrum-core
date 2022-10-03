"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _sectionElement = _interopRequireDefault(require("./section-element"));

var _choiceElement = _interopRequireDefault(require("./choice-element"));

var _textElement = _interopRequireDefault(require("./text-element"));

var _dateElement = _interopRequireDefault(require("./date-element"));

var _timeElement = _interopRequireDefault(require("./time-element"));

var _photoElement = _interopRequireDefault(require("./photo-element"));

var _videoElement = _interopRequireDefault(require("./video-element"));

var _audioElement = _interopRequireDefault(require("./audio-element"));

var _attachmentElement = _interopRequireDefault(require("./attachment-element"));

var _signatureElement = _interopRequireDefault(require("./signature-element"));

var _classificationElement = _interopRequireDefault(require("./classification-element"));

var _repeatableElement = _interopRequireDefault(require("./repeatable-element"));

var _addressElement = _interopRequireDefault(require("./address-element"));

var _labelElement = _interopRequireDefault(require("./label-element"));

var _yesNoElement = _interopRequireDefault(require("./yes-no-element"));

var _hyperlinkElement = _interopRequireDefault(require("./hyperlink-element"));

var _barcodeElement = _interopRequireDefault(require("./barcode-element"));

var _calculatedElement = _interopRequireDefault(require("./calculated-element"));

var _recordLinkElement = _interopRequireDefault(require("./record-link-element"));

var _containerElement = _interopRequireDefault(require("./container-element"));

var _checkboxElement = _interopRequireDefault(require("./checkbox-element"));

var _dynamicElement = _interopRequireDefault(require("./dynamic-element"));

var _locationElement = _interopRequireDefault(require("./location-element"));

var _buttonElement = _interopRequireDefault(require("./button-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Constructors = {
  Section: _sectionElement["default"],
  ChoiceField: _choiceElement["default"],
  TextField: _textElement["default"],
  DateTimeField: _dateElement["default"],
  DateField: _dateElement["default"],
  TimeField: _timeElement["default"],
  PhotoField: _photoElement["default"],
  VideoField: _videoElement["default"],
  AudioField: _audioElement["default"],
  AttachmentField: _attachmentElement["default"],
  SignatureField: _signatureElement["default"],
  ClassificationField: _classificationElement["default"],
  Repeatable: _repeatableElement["default"],
  AddressField: _addressElement["default"],
  Label: _labelElement["default"],
  YesNoField: _yesNoElement["default"],
  HyperlinkField: _hyperlinkElement["default"],
  BarcodeField: _barcodeElement["default"],
  CalculatedField: _calculatedElement["default"],
  RecordLinkField: _recordLinkElement["default"],
  CheckboxField: _checkboxElement["default"],
  DynamicField: _dynamicElement["default"],
  LocationField: _locationElement["default"],
  ButtonField: _buttonElement["default"]
};
var initialized = false;

var ElementFactory = /*#__PURE__*/function () {
  function ElementFactory() {}

  ElementFactory.create = function create(parent, attributes) {
    var constructor = Constructors[attributes.type];

    if (!initialized) {
      initialized = true;

      _containerElement["default"].initialize();
    }

    if (constructor == null) {
      return null;
    }

    return new constructor(parent, attributes);
  };

  ElementFactory.classes = function classes() {
    return Constructors;
  };

  return ElementFactory;
}();

exports["default"] = ElementFactory;
//# sourceMappingURL=element-factory.js.map