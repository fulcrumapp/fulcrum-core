'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = attributes.visible_conditions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var condition = _step.value;

          this.visibleConditions.push(new _condition2.default(this, condition));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    this.requiredConditionsType = this.attributes.required_conditions_type;

    this.requiredConditions = [];

    if (attributes.required_conditions) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = attributes.required_conditions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var condition = _step2.value;

          this.requiredConditions.push(new _condition2.default(this, condition));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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

  _createClass(Element, [{
    key: 'isType',
    value: function isType(type) {
      return this.type === type;
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
  }], [{
    key: 'factory',
    value: function factory() {
      return ElementFactory = ElementFactory || require('./element-factory').default;
    }
  }, {
    key: 'create',
    value: function create(parent, attributes) {
      return Element.factory().create(parent, attributes);
    }
  }, {
    key: 'classes',
    value: function classes() {
      if (Element._classes == null) {
        Element._classes = {};

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(_elementTypes2.default)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var klass = _step3.value;

            Element._classes[klass] = Element.factory().classes()[_elementTypes2.default[klass]];
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return Element._classes;
    }
  }]);

  return Element;
}();

exports.default = Element;
//# sourceMappingURL=element.js.map