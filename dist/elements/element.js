"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_types_1 = __importDefault(require("./element-types"));
const condition_1 = __importDefault(require("./condition"));
class Element {
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
        this._defaultPreviousValue = !!attributes.default_previous_value;
        this._visibleConditionsType = attributes.visible_conditions_type;
        this._visibleConditionsBehavior = attributes.visible_conditions_behavior || 'clear';
        this._visibleConditions = [];
        if (attributes.visible_conditions) {
            for (const condition of attributes.visible_conditions) {
                this._visibleConditions.push(new condition_1.default(this, condition));
            }
        }
        this._requiredConditionsType = attributes.required_conditions_type;
        this._requiredConditions = [];
        if (attributes.required_conditions) {
            for (const condition of attributes.required_conditions) {
                this._requiredConditions.push(new condition_1.default(this, condition));
            }
        }
        this._minLength = null;
        this._maxLength = null;
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
        return this._overrideLabel != null ? this._overrideLabel : this._label;
    }
    get description() {
        return this._overrideDescription != null ? this._overrideDescription : this._description;
    }
    get dataName() {
        return this._dataName;
    }
    get defaultValue() {
        return this._defaultValue;
    }
    get isDefaultPreviousValueEnabled() {
        return this._defaultPreviousValue;
    }
    get isRequired() {
        return this._overrideIsRequired != null ? this._overrideIsRequired : this._isRequired;
    }
    get isHidden() {
        return this._overrideIsHidden != null ? this._overrideIsHidden : this._isHidden;
    }
    get isDisabled() {
        return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._isDisabled;
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
        return this._overrideMinLength != null ? this._overrideMinLength : this._minLength;
    }
    get maxLength() {
        return this._overrideMaxLength != null ? this._overrideMinLength : this._maxLength;
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
        this._overrideIsRequired = value != null ? !!value : null;
    }
    get overrideIsHidden() {
        return this._overrideIsHidden;
    }
    set overrideIsHidden(value) {
        this._overrideIsHidden = value != null ? !!value : null;
    }
    get overrideIsDisabled() {
        return this._overrideIsDisabled;
    }
    set overrideIsDisabled(value) {
        this._overrideIsDisabled = value != null ? !!value : null;
    }
    get overrideMinLength() {
        return this._overrideMinLength;
    }
    set overrideMinLength(value) {
        this._overrideMinLength = value != null ? +value : null;
    }
    get overrideMaxLength() {
        return this._overrideMaxLength;
    }
    set overrideMaxLength(value) {
        this._overrideMaxLength = value != null ? +value : null;
    }
    get overrideValues() {
        return {
            overrideLabel: this._overrideLabel,
            overrideDescription: this._overrideDescription,
            overrideIsRequired: this._overrideIsRequired,
            overrideIsHidden: this._overrideIsHidden,
            overrideIsDisabled: this._overrideIsDisabled,
            overrideMinLength: this._overrideMinLength,
            overrideMaxLength: this._overrideMaxLength
        };
    }
    resetOverrides() {
        this._overrideLabel = null;
        this._overrideDescription = null;
        this._overrideIsRequired = null;
        this._overrideIsHidden = null;
        this._overrideIsDisabled = null;
        this._overrideMinLength = null;
        this._overrideMaxLength = null;
    }
    get isLengthValidationSupported() {
        return false;
    }
    get hasMinLength() {
        return this.minLength != null && this.minLength > 0;
    }
    get hasMaxLength() {
        return this.maxLength != null && this.maxLength > 0;
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
    get preserveValueWhenConditionallyHidden() {
        return this._visibleConditionsBehavior === 'preserve';
    }
    get isPreserved() {
        if (this.parent == null || this.preserveValueWhenConditionallyHidden) {
            return this.preserveValueWhenConditionallyHidden;
        }
        return this.parent.isPreserved;
    }
    toJSON() {
        return {
            type: this._type || null,
            key: this._key,
            label: this._label || null,
            description: this._description || null,
            required: this._isRequired,
            disabled: this._isDisabled,
            hidden: this._isHidden,
            data_name: this._dataName,
            default_value: this._defaultValue || null,
            visible_conditions_type: this._visibleConditionsType || null,
            visible_conditions_behavior: this._visibleConditionsBehavior || null,
            visible_conditions: this._visibleConditions.length > 0 ? this._visibleConditions.map((c) => c.toJSON()) : null,
            required_conditions_type: this._requiredConditionsType || null,
            required_conditions: this._requiredConditions.length > 0 ? this._requiredConditions.map((c) => c.toJSON()) : null
        };
    }
    isType(type) {
        return this.type === type;
    }
    get isSectionElement() {
        return this.isType(element_types_1.default.SectionElement);
    }
    get isChoiceElement() {
        return this.isType(element_types_1.default.ChoiceElement);
    }
    get isTextElement() {
        return this.isType(element_types_1.default.TextElement);
    }
    get isDateElement() {
        return this.isType(element_types_1.default.DateElement);
    }
    get isTimeElement() {
        return this.isType(element_types_1.default.TimeElement);
    }
    get isPhotoElement() {
        return this.isType(element_types_1.default.PhotoElement);
    }
    get isVideoElement() {
        return this.isType(element_types_1.default.VideoElement);
    }
    get isAudioElement() {
        return this.isType(element_types_1.default.AudioElement);
    }
    get isAttachmentElement() {
        return this.isType(element_types_1.default.AttachmentElement);
    }
    get isClassificationElement() {
        return this.isType(element_types_1.default.ClassificationElement);
    }
    get isSignatureElement() {
        return this.isType(element_types_1.default.SignatureElement);
    }
    get isRepeatableElement() {
        return this.isType(element_types_1.default.RepeatableElement);
    }
    get isAddressElement() {
        return this.isType(element_types_1.default.AddressElement);
    }
    get isLabelElement() {
        return this.isType(element_types_1.default.LabelElement);
    }
    get isYesNoElement() {
        return this.isType(element_types_1.default.YesNoElement);
    }
    get isHyperlinkElement() {
        return this.isType(element_types_1.default.HyperlinkElement);
    }
    get isBarcodeElement() {
        return this.isType(element_types_1.default.BarcodeElement);
    }
    get isCalculatedElement() {
        return this.isType(element_types_1.default.CalculatedElement);
    }
    get isRecordLinkElement() {
        return this.isType(element_types_1.default.RecordLinkElement);
    }
    get isStatusElement() {
        return this.isType(element_types_1.default.StatusElement);
    }
    get isCheckboxElement() {
        return this.isType(element_types_1.default.CheckboxElement);
    }
    get isDynamicElement() {
        return this.isType(element_types_1.default.DynamicElement);
    }
    get isLocationElement() {
        return this.isType(element_types_1.default.LocationElement);
    }
}
exports.default = Element;
//# sourceMappingURL=element.js.map