import Types from './element-types';
import Condition from './condition';

let ElementFactory = null;

export default class Element {
  constructor(parent, attributes) {
    this._parent = parent;

    this._attributes = attributes;

    this._key = attributes.key;

    this._type = attributes.type;

    this._label = attributes.label;

    this._description = attributes.description;

    this._dataName = attributes.data_name;

    this._defaultValue = attributes.default_value;

    this._isRequired = !!attributes.required;

    this._isHidden = !!attributes.hidden;

    this._isDisabled = !!attributes.disabled;

    this._visibleConditionsType = attributes.visible_conditions_type;

    this._visibleConditions = [];

    if (attributes.visible_conditions) {
      for (let condition of attributes.visible_conditions) {
        this._visibleConditions.push(new Condition(this, condition));
      }
    }

    this._requiredConditionsType = attributes.required_conditions_type;

    this._requiredConditions = [];

    if (attributes.required_conditions) {
      for (let condition of attributes.required_conditions) {
        this._requiredConditions.push(new Condition(this, condition));
      }
    }

    this._minLength = -1;
    this._maxLength = -1;

    if (attributes.min_length != null) {
      this._minLength = +attributes.min_length;
    }

    if (attributes.max_length != null) {
      this._maxLength = +attributes.max_length;
    }

    this._overrideLabel = null;
    this._overrideDescription = null;
    this._overrideIsRequired = null;
    this._overrideIsHidden = null;
    this._overrideIsDisabled = null;
    this._overrideMinLength = null;
    this._overrideMaxLength = null;
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

  get parent() {
    return this._parent;
  }

  get type() {
    return this._type;
  }

  get key() {
    return this._key;
  }

  get label() {
    return this._overrideLabel ? this._overrideLabel : this._label;
  }

  get description() {
    return this._overrideDescription ? this._overrideDescription : this._description;
  }

  get dataName() {
    return this._dataName;
  }

  get defaultValue() {
    return this._defaultValue;
  }

  get isRequired() {
    return this._overrideIsRequired ? this._overrideIsRequired : this._isRequired;
  }

  get isHidden() {
    return this._overrideIsHidden ? this._overrideIsHidden : this._isHidden;
  }

  get isDisabled() {
    return this._overrideIsDisabled ? this._overrideIsDisabled : this._isDisabled;
  }

  get visibleConditionsType() {
    return this._visibleConditionsType;
  }

  get visibleConditions() {
    return this._visibleConditions;
  }

  get requiredConditionsType() {
    return this._requiredConditionsType;
  }

  get requiredConditions() {
    return this._requiredConditions;
  }

  get minLength() {
    return this._overrideMinLength ? this._overrideMinLength : this._minLength;
  }

  get maxLength() {
    return this._overrideMaxLength ? this._overrideMinLength : this._maxLength;
  }

  get overrideLabel() {
    return this._overrideLabel;
  }

  set overrideLabel(value) {
    this._overrideLabel = value;
  }

  get overrideDescription() {
    return this._overrideDescription;
  }

  set overrideDescription(value) {
    this._overrideDescription = value;
  }

  get overrideIsRequired() {
    return this._overrideIsRequired;
  }

  set overrideIsRequired(value) {
    this._overrideIsRequired = !!value;
  }

  get overrideIsHidden() {
    return this._overrideIsHidden;
  }

  set overrideIsHidden(value) {
    this._overrideIsHidden = !!value;
  }

  get overrideIsDisabled() {
    return this._overrideIsDisabled;
  }

  set overrideIsDisabled(value) {
    this._overrideIsDisabled = !!value;
  }

  get overrideMinLength() {
    return this._overrideMinLength;
  }

  set overrideMinLength(value) {
    this._overrideMinLength = !!value;
  }

  get overrideMaxLength() {
    return this._overrideMaxLength;
  }

  set overrideMaxLength(value) {
    this._overrideMaxLength = !!value;
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
    return this.visibleConditions.length !== 0;
  }

  get hasHiddenParent() {
    if (this.parent == null || this.isHidden) {
      return this.isHidden;
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

  get isStatusElement() {
    return this.isType(Types.StatusElement);
  }
}
