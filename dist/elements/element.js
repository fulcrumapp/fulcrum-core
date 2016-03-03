'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementTypes = require('./element-types');

var _elementTypes2 = _interopRequireDefault(_elementTypes);

var _condition = require('./condition');

var _condition2 = _interopRequireDefault(_condition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementFactory = null;

var Element = function () {
  function Element(parent, attributes) {
    _classCallCheck(this, Element);

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

        this.visibleConditions.push(new _condition2.default(this, condition));
      }
    }

    this.requiredConditionsType = this.attributes.required_conditions_type;

    this.requiredConditions = [];

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

        var condition = _ref2;

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
      if (this.parent == null || this.hidden) {
        return this.hidden;
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
  }]);

  return Element;
}();

exports.default = Element;
//# sourceMappingURL=element.js.map