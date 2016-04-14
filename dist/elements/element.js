'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementTypes = require('./element-types');

var _elementTypes2 = _interopRequireDefault(_elementTypes);

var _condition2 = require('./condition');

var _condition3 = _interopRequireDefault(_condition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementFactory = null;

var Element = function () {
  function Element(parent, attributes) {
    _classCallCheck(this, Element);

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
      for (var _iterator = attributes.visible_conditions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var condition = _ref;

        this._visibleConditions.push(new _condition3.default(this, condition));
      }
    }

    this._requiredConditionsType = attributes.required_conditions_type;

    this._requiredConditions = [];

    if (attributes.required_conditions) {
      for (var _iterator2 = attributes.required_conditions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _condition = _ref2;

        this._requiredConditions.push(new _condition3.default(this, _condition));
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

  Element.factory = function factory() {
    return ElementFactory = ElementFactory || require('./element-factory').default;
  };

  Element.create = function create(parent, attributes) {
    return Element.factory().create(parent, attributes);
  };

  Element.classes = function classes() {
    if (Element._classes == null) {
      Element._classes = {};

      for (var _iterator3 = Object.keys(_elementTypes2.default), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var klass = _ref3;

        Element._classes[klass] = Element.factory().classes()[_elementTypes2.default[klass]];
      }
    }

    return Element._classes;
  };

  Element.prototype.isType = function isType(type) {
    return this.type === type;
  };

  _createClass(Element, [{
    key: 'parent',
    get: function get() {
      return this._parent;
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }, {
    key: 'key',
    get: function get() {
      return this._key;
    }
  }, {
    key: 'label',
    get: function get() {
      return this._overrideLabel ? this._overrideLabel : this._label;
    }
  }, {
    key: 'description',
    get: function get() {
      return this._overrideDescription ? this._overrideDescription : this._description;
    }
  }, {
    key: 'dataName',
    get: function get() {
      return this._dataName;
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      return this._defaultValue;
    }
  }, {
    key: 'isRequired',
    get: function get() {
      return this._overrideIsRequired ? this._overrideIsRequired : this._isRequired;
    }
  }, {
    key: 'isHidden',
    get: function get() {
      return this._overrideIsHidden ? this._overrideIsHidden : this._isHidden;
    }
  }, {
    key: 'isDisabled',
    get: function get() {
      return this._overrideIsDisabled ? this._overrideIsDisabled : this._isDisabled;
    }
  }, {
    key: 'visibleConditionsType',
    get: function get() {
      return this._visibleConditionsType;
    }
  }, {
    key: 'visibleConditions',
    get: function get() {
      return this._visibleConditions;
    }
  }, {
    key: 'requiredConditionsType',
    get: function get() {
      return this._requiredConditionsType;
    }
  }, {
    key: 'requiredConditions',
    get: function get() {
      return this._requiredConditions;
    }
  }, {
    key: 'minLength',
    get: function get() {
      return this._overrideMinLength ? this._overrideMinLength : this._minLength;
    }
  }, {
    key: 'maxLength',
    get: function get() {
      return this._overrideMaxLength ? this._overrideMinLength : this._maxLength;
    }
  }, {
    key: 'overrideLabel',
    get: function get() {
      return this._overrideLabel;
    },
    set: function set(value) {
      this._overrideLabel = value;
    }
  }, {
    key: 'overrideDescription',
    get: function get() {
      return this._overrideDescription;
    },
    set: function set(value) {
      this._overrideDescription = value;
    }
  }, {
    key: 'overrideIsRequired',
    get: function get() {
      return this._overrideIsRequired;
    },
    set: function set(value) {
      this._overrideIsRequired = value != null ? !!value : null;
    }
  }, {
    key: 'overrideIsHidden',
    get: function get() {
      return this._overrideIsHidden;
    },
    set: function set(value) {
      this._overrideIsHidden = value != null ? !!value : null;
    }
  }, {
    key: 'overrideIsDisabled',
    get: function get() {
      return this._overrideIsDisabled;
    },
    set: function set(value) {
      this._overrideIsDisabled = value != null ? !!value : null;
    }
  }, {
    key: 'overrideMinLength',
    get: function get() {
      return this._overrideMinLength;
    },
    set: function set(value) {
      this._overrideMinLength = value != null ? +value : null;
    }
  }, {
    key: 'overrideMaxLength',
    get: function get() {
      return this._overrideMaxLength;
    },
    set: function set(value) {
      this._overrideMaxLength = value != null ? +value : null;
    }
  }, {
    key: 'overrideValues',
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
    key: 'isLengthValidationSupported',
    get: function get() {
      return false;
    }
  }, {
    key: 'hasMinLength',
    get: function get() {
      return this.minLength > 0;
    }
  }, {
    key: 'hasMaxLength',
    get: function get() {
      return this.maxLength > 0;
    }
  }, {
    key: 'hasRequiredConditions',
    get: function get() {
      return this.requiredConditions.length !== 0;
    }
  }, {
    key: 'hasVisibilityConditions',
    get: function get() {
      return this.visibleConditions.length !== 0;
    }
  }, {
    key: 'hasHiddenParent',
    get: function get() {
      if (this.parent == null || this.isHidden) {
        return this.isHidden;
      }
      return this.parent.hasHiddenParent;
    }
  }, {
    key: 'isSectionElement',
    get: function get() {
      return this.isType(_elementTypes2.default.SectionElement);
    }
  }, {
    key: 'isChoiceElement',
    get: function get() {
      return this.isType(_elementTypes2.default.ChoiceElement);
    }
  }, {
    key: 'isTextElement',
    get: function get() {
      return this.isType(_elementTypes2.default.TextElement);
    }
  }, {
    key: 'isDateElement',
    get: function get() {
      return this.isType(_elementTypes2.default.DateElement);
    }
  }, {
    key: 'isTimeElement',
    get: function get() {
      return this.isType(_elementTypes2.default.TimeElement);
    }
  }, {
    key: 'isPhotoElement',
    get: function get() {
      return this.isType(_elementTypes2.default.PhotoElement);
    }
  }, {
    key: 'isVideoElement',
    get: function get() {
      return this.isType(_elementTypes2.default.VideoElement);
    }
  }, {
    key: 'isAudioElement',
    get: function get() {
      return this.isType(_elementTypes2.default.AudioElement);
    }
  }, {
    key: 'isClassificationElement',
    get: function get() {
      return this.isType(_elementTypes2.default.ClassificationElement);
    }
  }, {
    key: 'isSignatureElement',
    get: function get() {
      return this.isType(_elementTypes2.default.SignatureElement);
    }
  }, {
    key: 'isRepeatableElement',
    get: function get() {
      return this.isType(_elementTypes2.default.RepeatableElement);
    }
  }, {
    key: 'isAddressElement',
    get: function get() {
      return this.isType(_elementTypes2.default.AddressElement);
    }
  }, {
    key: 'isLabelElement',
    get: function get() {
      return this.isType(_elementTypes2.default.LabelElement);
    }
  }, {
    key: 'isYesNoElement',
    get: function get() {
      return this.isType(_elementTypes2.default.YesNoElement);
    }
  }, {
    key: 'isHyperlinkElement',
    get: function get() {
      return this.isType(_elementTypes2.default.HyperlinkElement);
    }
  }, {
    key: 'isBarcodeElement',
    get: function get() {
      return this.isType(_elementTypes2.default.BarcodeElement);
    }
  }, {
    key: 'isCalculatedElement',
    get: function get() {
      return this.isType(_elementTypes2.default.CalculatedElement);
    }
  }, {
    key: 'isRecordLinkElement',
    get: function get() {
      return this.isType(_elementTypes2.default.RecordLinkElement);
    }
  }, {
    key: 'isStatusElement',
    get: function get() {
      return this.isType(_elementTypes2.default.StatusElement);
    }
  }]);

  return Element;
}();

exports.default = Element;
//# sourceMappingURL=element.js.map