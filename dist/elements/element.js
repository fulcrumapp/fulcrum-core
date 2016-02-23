'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elementTypes = require('./element-types');

var _elementTypes2 = _interopRequireDefault(_elementTypes);

var _condition = require('./condition');

var _condition2 = _interopRequireDefault(_condition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ElementFactory = null;

class Element {
  constructor(parent, attributes) {
    this.parent = parent;

    this.attributes = attributes;

    this.key = attributes.key;

    this.type = attributes.type;

    this.label = attributes.label;

    this.description = attributes.description;

    this.dataName = attributes.data_name;

    this.defaultValue = attributes.default_value;

    this.required = !!attributes.required;

    this.hidden = !!attributes.hidden;

    this.disabled = !!attributes.disabled;

    this.visibleConditionsType = this.attributes.visible_conditions_type;

    this.visibleConditions = [];

    if (attributes.visible_conditions) {
      for (let condition of attributes.visible_conditions) {
        this.visibleConditions.push(new _condition2.default(this, condition));
      }
    }

    this.requiredConditionsType = this.attributes.required_conditions_type;

    this.requiredConditions = [];

    if (attributes.required_conditions) {
      for (let condition of attributes.required_conditions) {
        this.requiredConditions.push(new _condition2.default(this, condition));
      }
    }

    this.minLength = -1;
    this.maxLength = -1;

    if (attributes.min_length != null) {
      this.minLength = +attributes.min_length;
    }

    if (attributes.max_length != null) {
      this.maxLength = +attributes.max_length;
    }
  }

  static factory() {
    return ElementFactory = ElementFactory || require('./element-factory').default;
  }

  static create(parent, attributes) {
    return Element.factory().create(parent, attributes);
  }

  static classes() {
    if (Element._classes == null) {
      Element._classes = {};

      for (let klass of Object.keys(_elementTypes2.default)) {
        Element._classes[klass] = Element.factory().classes()[_elementTypes2.default[klass]];
      }
    }

    return Element._classes;
  }

  get isLengthValidationSupported() {
    return false;
  }

  get hasMinLength() {
    return this.minLength > 0;
  }

  get hasMaxLength() {
    return this.maxLength > 0;
  }

  get hasRequiredConditions() {
    return this.requiredConditions.length !== 0;
  }

  get hasVisibilityConditions() {
    return this.requiredConditions.length !== 0;
  }

  get hasHiddenParent() {
    if (this.parent == null || this.hidden) {
      return this.hidden;
    }
    return this.parent.hasHiddenParent;
  }

  isType(type) {
    return this.type === type;
  }

  get isSectionElement() {
    return this.isType(_elementTypes2.default.SectionElement);
  }

  get isChoiceElement() {
    return this.isType(_elementTypes2.default.ChoiceElement);
  }

  get isTextElement() {
    return this.isType(_elementTypes2.default.TextElement);
  }

  get isDateElement() {
    return this.isType(_elementTypes2.default.DateElement);
  }

  get isTimeElement() {
    return this.isType(_elementTypes2.default.TimeElement);
  }

  get isPhotoElement() {
    return this.isType(_elementTypes2.default.PhotoElement);
  }

  get isVideoElement() {
    return this.isType(_elementTypes2.default.VideoElement);
  }

  get isAudioElement() {
    return this.isType(_elementTypes2.default.AudioElement);
  }

  get isClassificationElement() {
    return this.isType(_elementTypes2.default.ClassificationElement);
  }

  get isSignatureElement() {
    return this.isType(_elementTypes2.default.SignatureElement);
  }

  get isRepeatableElement() {
    return this.isType(_elementTypes2.default.RepeatableElement);
  }

  get isAddressElement() {
    return this.isType(_elementTypes2.default.AddressElement);
  }

  get isLabelElement() {
    return this.isType(_elementTypes2.default.LabelElement);
  }

  get isYesNoElement() {
    return this.isType(_elementTypes2.default.YesNoElement);
  }

  get isHyperlinkElement() {
    return this.isType(_elementTypes2.default.HyperlinkElement);
  }

  get isBarcodeElement() {
    return this.isType(_elementTypes2.default.BarcodeElement);
  }

  get isCalculatedElement() {
    return this.isType(_elementTypes2.default.CalculatedElement);
  }

  get isRecordLinkElement() {
    return this.isType(_elementTypes2.default.RecordLinkElement);
  }
}
exports.default = Element;
//# sourceMappingURL=element.js.map