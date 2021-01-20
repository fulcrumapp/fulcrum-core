"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _elementTypes = _interopRequireDefault(require("./element-types"));

var _condition2 = _interopRequireDefault(require("./condition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Element = /*#__PURE__*/function () {
  function Element(parent, attributes) {
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
      for (var _iterator = _createForOfIteratorHelperLoose(attributes.visible_conditions), _step; !(_step = _iterator()).done;) {
        var condition = _step.value;

        this._visibleConditions.push(new _condition2["default"](this, condition));
      }
    }

    this._requiredConditionsType = attributes.required_conditions_type;
    this._requiredConditions = [];

    if (attributes.required_conditions) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(attributes.required_conditions), _step2; !(_step2 = _iterator2()).done;) {
        var _condition = _step2.value;

        this._requiredConditions.push(new _condition2["default"](this, _condition));
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

  var _proto = Element.prototype;

  _proto.resetOverrides = function resetOverrides() {
    this._overrideLabel = null;
    this._overrideDescription = null;
    this._overrideIsRequired = null;
    this._overrideIsHidden = null;
    this._overrideIsDisabled = null;
    this._overrideMinLength = null;
    this._overrideMaxLength = null;
  };

  _proto.isType = function isType(type) {
    return this.type === type;
  };

  _createClass(Element, [{
    key: "parent",
    get: function get() {
      return this._parent;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "key",
    get: function get() {
      return this._key;
    }
  }, {
    key: "label",
    get: function get() {
      return this._overrideLabel != null ? this._overrideLabel : this._label;
    }
  }, {
    key: "description",
    get: function get() {
      return this._overrideDescription != null ? this._overrideDescription : this._description;
    }
  }, {
    key: "dataName",
    get: function get() {
      return this._dataName;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      return this._defaultValue;
    }
  }, {
    key: "isDefaultPreviousValueEnabled",
    get: function get() {
      return this._defaultPreviousValue;
    }
  }, {
    key: "isRequired",
    get: function get() {
      return this._overrideIsRequired != null ? this._overrideIsRequired : this._isRequired;
    }
  }, {
    key: "isHidden",
    get: function get() {
      return this._overrideIsHidden != null ? this._overrideIsHidden : this._isHidden;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._isDisabled;
    }
  }, {
    key: "visibleConditionsType",
    get: function get() {
      return this._visibleConditionsType;
    }
  }, {
    key: "visibleConditions",
    get: function get() {
      return this._visibleConditions;
    }
  }, {
    key: "requiredConditionsType",
    get: function get() {
      return this._requiredConditionsType;
    }
  }, {
    key: "requiredConditions",
    get: function get() {
      return this._requiredConditions;
    }
  }, {
    key: "minLength",
    get: function get() {
      return this._overrideMinLength != null ? this._overrideMinLength : this._minLength;
    }
  }, {
    key: "maxLength",
    get: function get() {
      return this._overrideMaxLength != null ? this._overrideMinLength : this._maxLength;
    }
  }, {
    key: "overrideLabel",
    get: function get() {
      return this._overrideLabel;
    },
    set: function set(value) {
      this._overrideLabel = value;
    }
  }, {
    key: "overrideDescription",
    get: function get() {
      return this._overrideDescription;
    },
    set: function set(value) {
      this._overrideDescription = value;
    }
  }, {
    key: "overrideIsRequired",
    get: function get() {
      return this._overrideIsRequired;
    },
    set: function set(value) {
      this._overrideIsRequired = value != null ? !!value : null;
    }
  }, {
    key: "overrideIsHidden",
    get: function get() {
      return this._overrideIsHidden;
    },
    set: function set(value) {
      this._overrideIsHidden = value != null ? !!value : null;
    }
  }, {
    key: "overrideIsDisabled",
    get: function get() {
      return this._overrideIsDisabled;
    },
    set: function set(value) {
      this._overrideIsDisabled = value != null ? !!value : null;
    }
  }, {
    key: "overrideMinLength",
    get: function get() {
      return this._overrideMinLength;
    },
    set: function set(value) {
      this._overrideMinLength = value != null ? +value : null;
    }
  }, {
    key: "overrideMaxLength",
    get: function get() {
      return this._overrideMaxLength;
    },
    set: function set(value) {
      this._overrideMaxLength = value != null ? +value : null;
    }
  }, {
    key: "overrideValues",
    get: function get() {
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
  }, {
    key: "isLengthValidationSupported",
    get: function get() {
      return false;
    }
  }, {
    key: "hasMinLength",
    get: function get() {
      return this.minLength > 0;
    }
  }, {
    key: "hasMaxLength",
    get: function get() {
      return this.maxLength > 0;
    }
  }, {
    key: "hasRequiredConditions",
    get: function get() {
      return this.requiredConditions.length !== 0;
    }
  }, {
    key: "hasVisibilityConditions",
    get: function get() {
      return this.visibleConditions.length !== 0;
    }
  }, {
    key: "hasHiddenParent",
    get: function get() {
      if (this.parent == null || this.isHidden) {
        return this.isHidden;
      }

      return this.parent.hasHiddenParent;
    }
  }, {
    key: "preserveValueWhenConditionallyHidden",
    get: function get() {
      return this._visibleConditionsBehavior === 'preserve';
    }
  }, {
    key: "isPreserved",
    get: function get() {
      if (this.parent == null || this.preserveValueWhenConditionallyHidden) {
        return this.preserveValueWhenConditionallyHidden;
      }

      return this.parent.isPreserved;
    }
  }, {
    key: "isSectionElement",
    get: function get() {
      return this.isType(_elementTypes["default"].SectionElement);
    }
  }, {
    key: "isChoiceElement",
    get: function get() {
      return this.isType(_elementTypes["default"].ChoiceElement);
    }
  }, {
    key: "isTextElement",
    get: function get() {
      return this.isType(_elementTypes["default"].TextElement);
    }
  }, {
    key: "isDateElement",
    get: function get() {
      return this.isType(_elementTypes["default"].DateElement);
    }
  }, {
    key: "isTimeElement",
    get: function get() {
      return this.isType(_elementTypes["default"].TimeElement);
    }
  }, {
    key: "isPhotoElement",
    get: function get() {
      return this.isType(_elementTypes["default"].PhotoElement);
    }
  }, {
    key: "isVideoElement",
    get: function get() {
      return this.isType(_elementTypes["default"].VideoElement);
    }
  }, {
    key: "isAudioElement",
    get: function get() {
      return this.isType(_elementTypes["default"].AudioElement);
    }
  }, {
    key: "isClassificationElement",
    get: function get() {
      return this.isType(_elementTypes["default"].ClassificationElement);
    }
  }, {
    key: "isSignatureElement",
    get: function get() {
      return this.isType(_elementTypes["default"].SignatureElement);
    }
  }, {
    key: "isRepeatableElement",
    get: function get() {
      return this.isType(_elementTypes["default"].RepeatableElement);
    }
  }, {
    key: "isAddressElement",
    get: function get() {
      return this.isType(_elementTypes["default"].AddressElement);
    }
  }, {
    key: "isLabelElement",
    get: function get() {
      return this.isType(_elementTypes["default"].LabelElement);
    }
  }, {
    key: "isYesNoElement",
    get: function get() {
      return this.isType(_elementTypes["default"].YesNoElement);
    }
  }, {
    key: "isHyperlinkElement",
    get: function get() {
      return this.isType(_elementTypes["default"].HyperlinkElement);
    }
  }, {
    key: "isBarcodeElement",
    get: function get() {
      return this.isType(_elementTypes["default"].BarcodeElement);
    }
  }, {
    key: "isCalculatedElement",
    get: function get() {
      return this.isType(_elementTypes["default"].CalculatedElement);
    }
  }, {
    key: "isRecordLinkElement",
    get: function get() {
      return this.isType(_elementTypes["default"].RecordLinkElement);
    }
  }, {
    key: "isStatusElement",
    get: function get() {
      return this.isType(_elementTypes["default"].StatusElement);
    }
  }]);

  return Element;
}();

exports["default"] = Element;
//# sourceMappingURL=element.js.map