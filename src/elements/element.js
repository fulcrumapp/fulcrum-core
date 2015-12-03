import Types from './element-types';
import Condition from './condition';

let ElementFactory = null;

export default class Element {
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
        this.visibleConditions.push(new Condition(this, condition));
      }
    }

    this.requiredConditionsType = this.attributes.required_conditions_type;

    this.requiredConditions = [];

    if (attributes.required_conditions) {
      for (let condition of attributes.required_conditions) {
        this.requiredConditions.push(new Condition(this, condition));
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
    return (ElementFactory = ElementFactory || require('./element-factory').default);
  }

  static create(parent, attributes) {
    return Element.factory().create(parent, attributes);
  }

  static classes() {
    if (Element._classes == null) {
      Element._classes = {};

      for (let klass of Object.keys(Types)) {
        Element._classes[klass] = Element.factory().classes()[Types[klass]];
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
    return this.isType(Types.SectionElement);
  }

  get isChoiceElement() {
    return this.isType(Types.ChoiceElement);
  }

  get isTextElement() {
    return this.isType(Types.TextElement);
  }

  get isDateElement() {
    return this.isType(Types.DateElement);
  }

  get isTimeElement() {
    return this.isType(Types.TimeElement);
  }

  get isPhotoElement() {
    return this.isType(Types.PhotoElement);
  }

  get isVideoElement() {
    return this.isType(Types.VideoElement);
  }

  get isAudioElement() {
    return this.isType(Types.AudioElement);
  }

  get isClassificationElement() {
    return this.isType(Types.ClassificationElement);
  }

  get isSignatureElement() {
    return this.isType(Types.SignatureElement);
  }

  get isRepeatableElement() {
    return this.isType(Types.RepeatableElement);
  }

  get isAddressElement() {
    return this.isType(Types.AddressElement);
  }

  get isLabelElement() {
    return this.isType(Types.LabelElement);
  }

  get isYesNoElement() {
    return this.isType(Types.YesNoElement);
  }

  get isHyperlinkElement() {
    return this.isType(Types.HyperlinkElement);
  }

  get isBarcodeElement() {
    return this.isType(Types.BarcodeElement);
  }

  get isCalculatedElement() {
    return this.isType(Types.CalculatedElement);
  }

  get isRecordLinkElement() {
    return this.isType(Types.RecordLinkElement);
  }
}
