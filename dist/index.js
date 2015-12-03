'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressElement = (function (_Element) {
  _inherits(AddressElement, _Element);

  function AddressElement(parent, attributes) {
    _classCallCheck(this, AddressElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddressElement).call(this, parent, attributes));

    _this.autoPopulate = !!attributes.auto_populate;
    return _this;
  }

  return AddressElement;
})(_element2.default);

exports.default = AddressElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaElement = require('./media-element');

var _mediaElement2 = _interopRequireDefault(_mediaElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioElement = (function (_MediaElement) {
  _inherits(AudioElement, _MediaElement);

  function AudioElement(parent, attributes) {
    _classCallCheck(this, AudioElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioElement).call(this, parent, attributes));

    _this.trackEnabled = !!attributes.track_enabled;
    return _this;
  }

  return AudioElement;
})(_mediaElement2.default);

exports.default = AudioElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarcodeElement = (function (_TextualElement) {
  _inherits(BarcodeElement, _TextualElement);

  function BarcodeElement() {
    _classCallCheck(this, BarcodeElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BarcodeElement).apply(this, arguments));
  }

  return BarcodeElement;
})(_element2.default);

exports.default = BarcodeElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

var _displayOptions = require('./display-options');

var _displayOptions2 = _interopRequireDefault(_displayOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalculatedElement = (function (_TextualElement) {
  _inherits(CalculatedElement, _TextualElement);

  function CalculatedElement(parent, attributes) {
    _classCallCheck(this, CalculatedElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalculatedElement).call(this, parent, attributes));

    _this.expression = attributes.expression;
    _this.display = new _displayOptions2.default(attributes.display);
    return _this;
  }

  _createClass(CalculatedElement, null, [{
    key: 'findCalculatedElementRoot',
    value: function findCalculatedElementRoot(form, container) {
      if (container.type != null) {
        if (container.isSectionElement()) {
          return CalculatedElement.findCalculatedElementRoot(form, container.parent);
        } else if (container.isRepeatableElement()) {
          return container;
        }
      }
      return form;
    }
  }, {
    key: 'findCalculatedElementsForContainer',
    value: function findCalculatedElementsForContainer(container) {
      var elements = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = container.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (element.isCalculatedElement()) {
            elements.push(element);
          } else if (element.isSectionElement()) {
            elements = elements.concat(CalculatedElement.findCalculatedElementsForContainer(element));
          }
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

      return elements;
    }
  }]);

  return CalculatedElement;
})(_textualElement2.default);

exports.default = CalculatedElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = require('../utils/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementFactory = null;

var ChildElements = (function (_Mixin) {
  _inherits(ChildElements, _Mixin);

  function ChildElements() {
    _classCallCheck(this, ChildElements);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ChildElements).apply(this, arguments));
  }

  _createClass(ChildElements, [{
    key: 'createChildElements',
    value: function createChildElements(elements) {
      this.elements = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          // hack for circular dependency, not ideal
          ElementFactory = ElementFactory || require('./element-factory').default;
          this.elements.push(ElementFactory.create(this, element));
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
  }, {
    key: '_flattenElements',
    value: function _flattenElements(elements) {
      var flat = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var element = _step2.value;

          flat.push(element);

          if (element.elements) {
            flat = flat.concat(this._flattenElements(element.elements));
          }
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

      return flat;
    }
  }, {
    key: '_flattenElementsByAttribute',
    value: function _flattenElementsByAttribute(elements, attr) {
      var flat = {};

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var element = _step3.value;

          flat[element[attr]] = element;

          if (element.elements) {
            var children = this._flattenElementsByAttribute(element.elements, attr);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = Object.keys(children)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var key = _step4.value;

                flat[key] = children[key];
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
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

      return flat;
    }
  }, {
    key: 'allElements',
    get: function get() {
      return this._flattenElements(this.elements);
    }
  }, {
    key: 'elementsByKey',
    get: function get() {
      if (this._elementsByKey == null) {
        this._elementsByKey = this._flattenElementsByAttribute(this.elements, 'key');
      }

      return this._elementsByKey;
    }
  }, {
    key: 'elementsByDataName',
    get: function get() {
      if (this._elementsByDataName == null) {
        this._elementsByDataName = this._flattenElementsByAttribute(this.elements, 'dataName');
      }

      return this._elementsByDataName;
    }
  }]);

  return ChildElements;
})(_mixin2.default);

exports.default = ChildElements;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoiceElement = (function (_Element) {
  _inherits(ChoiceElement, _Element);

  function ChoiceElement(parent, attributes) {
    _classCallCheck(this, ChoiceElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChoiceElement).call(this, parent, attributes));

    _this.choiceListID = attributes.choice_list_id;
    _this.choices = attributes.choices;
    _this.multiple = !!attributes.multiple;
    _this.allowOther = !!attributes.allow_other;
    return _this;
  }

  return ChoiceElement;
})(_element2.default);

exports.default = ChoiceElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassificationElement = (function (_Element) {
  _inherits(ClassificationElement, _Element);

  function ClassificationElement(parent, attributes) {
    _classCallCheck(this, ClassificationElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClassificationElement).call(this, parent, attributes));

    _this.classificationSetID = attributes.classification_set_id;

    _this.allowOther = !!attributes.allowOther;
    return _this;
  }

  return ClassificationElement;
})(_element2.default);

exports.default = ClassificationElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Condition = (function () {
  function Condition(element, attributes) {
    _classCallCheck(this, Condition);

    this.element = element;
    this.fieldKey = attributes.field_key;
    this.operator = attributes.operator;
    this.value = attributes.value;
  }

  _createClass(Condition, [{
    key: 'isSatisfied',
    value: function isSatisfied(record, values, cache) {
      var referencedElement = Condition.elementForCondition(this, record);

      var isReferencedFieldSatisfied = true;

      if (referencedElement != null) {
        // If the referenced element or one its parents is explicitly marked as hidden, it's a special
        // case and the referenced element should always be considered satisfied so that it's possible
        // to put conditions on explicitly hidden values.

        var skipElement = referencedElement.hidden || referencedElement.hasHiddenParent;

        if (!skipElement) {
          isReferencedFieldSatisfied = Condition.shouldElementBeVisibleRecursive(referencedElement, record, values, cache);
        }
      }

      return this._isSatisfied(record, values, isReferencedFieldSatisfied);
    }
  }, {
    key: '_isSatisfied',
    value: function _isSatisfied(record, values, isReferencedFieldSatisfied) {
      var formValue = null;

      // if all of this field's conditions aren't also satisfied, treat the value as nil (empty). This has the same
      // effect as 'clearing' invisible values by treating them as blank when their conditions aren't met, regardless
      // of the actual preserved value in the field. If a field is invisible, its value is always nil with respect
      // to condition logic.

      if (isReferencedFieldSatisfied) {
        formValue = Condition.valueForCondition(this, values, record);
      }

      switch (this.operator) {
        case 'equal_to':
          return Condition.isEqual(formValue, this.value);

        case 'not_equal_to':
          return !Condition.isEqual(formValue, this.value);

        case 'is_empty':
          return Condition.isEmpty(formValue);

        case 'is_not_empty':
          return !Condition.isEmpty(formValue);

        case 'contains':
          return Condition.contains(formValue, this.value);

        case 'starts_with':
          return Condition.startsWith(formValue, this.value);

        case 'greater_than':
          return Condition.greaterThan(formValue, this.value);

        case 'less_than':
          return Condition.lessThan(formValue, this.value);

        default:
          break;
      }

      return true;
    }
  }], [{
    key: 'isEqual',
    value: function isEqual(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.isEqual(stringValue);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(formValue) {
      return formValue === null || formValue.isEmpty();
    }
  }, {
    key: 'contains',
    value: function contains(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.contains(stringValue);
    }
  }, {
    key: 'startsWith',
    value: function startsWith(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.startsWith(stringValue);
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.isLessThan(stringValue);
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(formValue, stringValue) {
      if (formValue == null) {
        return _textUtils2.default.isEmpty(stringValue);
      }
      return formValue.isGreaterThan(stringValue);
    }
  }, {
    key: 'shouldElementBeVisible',
    value: function shouldElementBeVisible(element, record, values, cache) {
      if (cache != null && cache[element.key] != null) {
        return cache[element.key];
      }

      cache = cache || {};

      var shouldBeVisible = Condition.shouldElementBeVisibleRecursive(element, record, values, cache);

      if (element.isSectionElement()) {
        var hasVisibleChildren = false;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = element.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var childElement = _step.value;

            var visible = Condition.shouldElementBeVisibleRecursive(childElement, record, values, cache);

            if (visible) {
              hasVisibleChildren = true;
              break;
            }
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

        shouldBeVisible = shouldBeVisible && hasVisibleChildren;
      }

      return shouldBeVisible;
    }
  }, {
    key: 'shouldElementBeVisibleRecursive',
    value: function shouldElementBeVisibleRecursive(element, record, values, cache) {
      if (cache != null && cache[element.key] != null) {
        return cache[element.key];
      }

      // break circular conditions by assigning an early `true` value so if this
      // method is re-entered again for the same element before the recursion
      // ends, it early exits instead of blowing the stack
      cache[element.key] = true;

      if (element.hidden || element.hasHiddenParent) {
        cache[element.key] = false;
        return false;
      }

      var shouldBeVisible = false;

      if (!element.hasVisibilityConditions) {
        shouldBeVisible = true;
      }

      if (element.visibleConditionsType === 'any') {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = element.visibleConditions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var condition = _step2.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (isSatisfied) {
              shouldBeVisible = true;
              break;
            }
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
      } else if (element.visibleConditionsType === 'all') {
        shouldBeVisible = true;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = element.visibleConditions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var condition = _step3.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (!isSatisfied) {
              shouldBeVisible = false;
            }
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

      // Make sure all parent elements are also visible according to these same rules.
      // If a section is hidden because of a rule, all child elements are implicitly hidden
      // and should return NO from this method. This makes it very easy to determine value relevance
      // by looking at only the field values without having to worry about Section elements and
      // dependencies. See clearInvisibleValuesWithConditionValues for usage of this method that
      // relies on this behavior.

      var parentsVisible = true;

      var iterator = element.parent;

      while (iterator != null) {
        var parentVisible = Condition.shouldElementBeVisibleRecursive(iterator, record, values, cache);

        if (!parentVisible) {
          parentsVisible = false;
          break;
        }

        iterator = iterator.parent;
      }

      var result = parentsVisible && shouldBeVisible;

      cache[element.key] = result;

      return result;
    }
  }, {
    key: 'shouldElementBeRequired',
    value: function shouldElementBeRequired(element, record, values) {
      if (!element.hasRequiredConditions) {
        return element.required;
      }

      var cache = {};

      var shouldBeRequired = false;

      if (element.requiredConditionsType === 'any') {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = element.requiredConditions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var condition = _step4.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (isSatisfied) {
              shouldBeRequired = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else if (element.requiredConditionsType === 'all') {
        shouldBeRequired = true;

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = element.requiredConditions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var condition = _step5.value;

            var isSatisfied = condition.isSatisfied(record, values, cache);

            if (!isSatisfied) {
              shouldBeRequired = false;
              break;
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      return shouldBeRequired;
    }
  }, {
    key: 'valueForCondition',
    value: function valueForCondition(condition, values, record) {
      if (condition.fieldKey === '@status') {
        return record.statusValue();
      }
      return values.getFormValue(condition.fieldKey);
    }
  }, {
    key: 'elementForCondition',
    value: function elementForCondition(condition, record) {
      if (condition.fieldKey === '@status') {
        return record.statusValue().statusElement;
      }
      return record.form.elementsByKey[condition.fieldKey];
    }
  }]);

  return Condition;
})();

exports.default = Condition;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _childElements = require('./child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContainerElement = (function (_Element) {
  _inherits(ContainerElement, _Element);

  function ContainerElement(parent, attributes) {
    _classCallCheck(this, ContainerElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContainerElement).call(this, parent, attributes));

    _this.createChildElements(attributes.elements);
    return _this;
  }

  return ContainerElement;
})(_element2.default);

exports.default = ContainerElement;

_childElements2.default.includeInto(ContainerElement);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateElement = (function (_TextualElement) {
  _inherits(DateElement, _TextualElement);

  function DateElement() {
    _classCallCheck(this, DateElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DateElement).apply(this, arguments));
  }

  return DateElement;
})(_textualElement2.default);

exports.default = DateElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DisplayOptions = (function () {
  function DisplayOptions(attributes) {
    _classCallCheck(this, DisplayOptions);

    this.style = attributes.style;
    this.currency = attributes.currency;
  }

  _createClass(DisplayOptions, [{
    key: 'format',
    value: function format(value) {
      if (!_textUtils2.default.isPresent(value)) {
        return value;
      }

      switch (true) {
        case this.isNumber:
          return _numberUtils2.default.localizedStringFromMachineString(value, true);

        case this.isDate:
          var date = _dateUtils2.default.parseDate(value);

          if (date != null) {
            return _dateUtils2.default.formatLocalizedDate(date);
          }

          break;

        case this.isCurrency:
          return _numberUtils2.default.formatCurrency(value, this.currency);

        default:
          break;
      }

      return value;
    }
  }, {
    key: 'isCurrency',
    get: function get() {
      return this.style === 'currency';
    }
  }, {
    key: 'isNumber',
    get: function get() {
      return this.style === 'number';
    }
  }, {
    key: 'isDate',
    get: function get() {
      return this.style === 'date';
    }
  }, {
    key: 'isText',
    get: function get() {
      return this.style === 'text';
    }
  }]);

  return DisplayOptions;
})();

exports.default = DisplayOptions;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sectionElement = require('./section-element');

var _sectionElement2 = _interopRequireDefault(_sectionElement);

var _choiceElement = require('./choice-element');

var _choiceElement2 = _interopRequireDefault(_choiceElement);

var _textElement = require('./text-element');

var _textElement2 = _interopRequireDefault(_textElement);

var _dateElement = require('./date-element');

var _dateElement2 = _interopRequireDefault(_dateElement);

var _timeElement = require('./time-element');

var _timeElement2 = _interopRequireDefault(_timeElement);

var _photoElement = require('./photo-element');

var _photoElement2 = _interopRequireDefault(_photoElement);

var _videoElement = require('./video-element');

var _videoElement2 = _interopRequireDefault(_videoElement);

var _audioElement = require('./audio-element');

var _audioElement2 = _interopRequireDefault(_audioElement);

var _signatureElement = require('./signature-element');

var _signatureElement2 = _interopRequireDefault(_signatureElement);

var _classificationElement = require('./classification-element');

var _classificationElement2 = _interopRequireDefault(_classificationElement);

var _repeatableElement = require('./repeatable-element');

var _repeatableElement2 = _interopRequireDefault(_repeatableElement);

var _addressElement = require('./address-element');

var _addressElement2 = _interopRequireDefault(_addressElement);

var _labelElement = require('./label-element');

var _labelElement2 = _interopRequireDefault(_labelElement);

var _yesNoElement = require('./yes-no-element');

var _yesNoElement2 = _interopRequireDefault(_yesNoElement);

var _hyperlinkElement = require('./hyperlink-element');

var _hyperlinkElement2 = _interopRequireDefault(_hyperlinkElement);

var _barcodeElement = require('./barcode-element');

var _barcodeElement2 = _interopRequireDefault(_barcodeElement);

var _calculatedElement = require('./calculated-element');

var _calculatedElement2 = _interopRequireDefault(_calculatedElement);

var _recordLinkElement = require('./record-link-element');

var _recordLinkElement2 = _interopRequireDefault(_recordLinkElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constructors = {
  Section: _sectionElement2.default,
  ChoiceField: _choiceElement2.default,
  TextField: _textElement2.default,
  DateTimeField: _dateElement2.default,
  DateField: _dateElement2.default,
  TimeField: _timeElement2.default,
  PhotoField: _photoElement2.default,
  VideoField: _videoElement2.default,
  AudioField: _audioElement2.default,
  SignatureField: _signatureElement2.default,
  ClassificationField: _classificationElement2.default,
  Repeatable: _repeatableElement2.default,
  AddressField: _addressElement2.default,
  Label: _labelElement2.default,
  YesNoField: _yesNoElement2.default,
  HyperlinkField: _hyperlinkElement2.default,
  BarcodeField: _barcodeElement2.default,
  CalculatedField: _calculatedElement2.default,
  RecordLinkField: _recordLinkElement2.default
};

var ElementFactory = (function () {
  function ElementFactory() {
    _classCallCheck(this, ElementFactory);
  }

  _createClass(ElementFactory, null, [{
    key: 'create',
    value: function create(parent, attributes) {
      var constructor = Constructors[attributes.type];

      if (constructor == null) {
        throw new Error('Unsupported element ' + attributes.type);
      }

      return new constructor(parent, attributes);
    }
  }, {
    key: 'classes',
    value: function classes() {
      return Constructors;
    }
  }]);

  return ElementFactory;
})();

exports.default = ElementFactory;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  SectionElement: 'Section',

  ChoiceElement: 'ChoiceField',

  TextElement: 'TextField',

  DateElement: 'DateTimeField',

  TimeElement: 'TimeField',

  PhotoElement: 'PhotoField',

  VideoElement: 'VideoField',

  AudioElement: 'AudioField',

  SignatureElement: 'SignatureField',

  ClassificationElement: 'ClassificationField',

  RepeatableElement: 'Repeatable',

  AddressElement: 'AddressField',

  LabelElement: 'Label',

  YesNoElement: 'YesNoField',

  HyperlinkElement: 'HyperlinkElement',

  BarcodeElement: 'BarcodeField',

  CalculatedElement: 'CalculatedField',

  RecordLinkElement: 'RecordLinkField'
};
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elementTypes = require('./element-types');

var _elementTypes2 = _interopRequireDefault(_elementTypes);

var _condition = require('./condition');

var _condition2 = _interopRequireDefault(_condition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementFactory = null;

var Element = (function () {
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
      return this.requiredConditions.length !== 0;
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
})();

exports.default = Element;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HyperlinkElement = (function (_TextualElement) {
  _inherits(HyperlinkElement, _TextualElement);

  function HyperlinkElement(parent, attributes) {
    _classCallCheck(this, HyperlinkElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HyperlinkElement).call(this, parent, attributes));

    _this.defaultURL = attributes.default_url;
    return _this;
  }

  return HyperlinkElement;
})(_textualElement2.default);

exports.default = HyperlinkElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabelElement = (function (_Element) {
  _inherits(LabelElement, _Element);

  function LabelElement() {
    _classCallCheck(this, LabelElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LabelElement).apply(this, arguments));
  }

  return LabelElement;
})(_element2.default);

exports.default = LabelElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaElement = (function (_Element) {
  _inherits(MediaElement, _Element);

  function MediaElement() {
    _classCallCheck(this, MediaElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MediaElement).apply(this, arguments));
  }

  return MediaElement;
})(_element2.default);

exports.default = MediaElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaElement = require('./media-element');

var _mediaElement2 = _interopRequireDefault(_mediaElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoElement = (function (_MediaElement) {
  _inherits(PhotoElement, _MediaElement);

  function PhotoElement() {
    _classCallCheck(this, PhotoElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoElement).apply(this, arguments));
  }

  return PhotoElement;
})(_mediaElement2.default);

exports.default = PhotoElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordLinkElement = (function (_Element) {
  _inherits(RecordLinkElement, _Element);

  function RecordLinkElement(parent, attributes) {
    _classCallCheck(this, RecordLinkElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecordLinkElement).call(this, parent, attributes));

    _this.formID = attributes.form_id;

    _this.allowMultiple = !!attributes.allow_multiple;
    _this.allowExisting = !!attributes.allow_existing;
    _this.allowCreating = !!attributes.allow_creating;
    _this.allowUpdating = !!attributes.allow_updating;

    // TODO(zhm) model these
    _this.recordConditionsType = attributes.record_conditions_type;
    _this.recordConditions = attributes.record_conditions;
    _this.recordDefaults = attributes.record_defaults;
    return _this;
  }

  return RecordLinkElement;
})(_element2.default);

exports.default = RecordLinkElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containerElement = require('./container-element');

var _containerElement2 = _interopRequireDefault(_containerElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepeatableElement = (function (_ContainerElement) {
  _inherits(RepeatableElement, _ContainerElement);

  function RepeatableElement(parent, attributes) {
    _classCallCheck(this, RepeatableElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RepeatableElement).call(this, parent, attributes));

    _this.titleFieldKeys = attributes.title_field_keys;

    _this.geometryTypes = attributes.geometry_types;

    _this.geometryRequired = !!attributes.geometry_required;
    return _this;
  }

  return RepeatableElement;
})(_containerElement2.default);

exports.default = RepeatableElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containerElement = require('./container-element');

var _containerElement2 = _interopRequireDefault(_containerElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionElement = (function (_ContainerElement) {
  _inherits(SectionElement, _ContainerElement);

  function SectionElement(parent, attributes) {
    _classCallCheck(this, SectionElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SectionElement).call(this, parent, attributes));

    _this.display = attributes.display;
    return _this;
  }

  _createClass(SectionElement, [{
    key: 'isDrillDown',
    get: function get() {
      return this.display === 'drill-down';
    }
  }, {
    key: 'isInline',
    get: function get() {
      return this.display === 'inline';
    }
  }]);

  return SectionElement;
})(_containerElement2.default);

exports.default = SectionElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignatureElement = (function (_Element) {
  _inherits(SignatureElement, _Element);

  function SignatureElement(parent, attributes) {
    _classCallCheck(this, SignatureElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SignatureElement).call(this, parent, attributes));

    _this.agreementText = attributes.agreement_text;
    return _this;
  }

  return SignatureElement;
})(_element2.default);

exports.default = SignatureElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatusElement = (function (_TextualElement) {
  _inherits(StatusElement, _TextualElement);

  function StatusElement(parent, attributes) {
    _classCallCheck(this, StatusElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StatusElement).call(this, parent, attributes));

    _this.choices = attributes.choices;

    _this.enabled = attributes.enabled;

    _this.readOnly = !!attributes.read_only;
    return _this;
  }

  _createClass(StatusElement, [{
    key: 'statusForValue',
    value: function statusForValue(value) {
      throw new Error('Not implemented');
    }
  }]);

  return StatusElement;
})(_textualElement2.default);

exports.default = StatusElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextElement = (function (_TextualElement) {
  _inherits(TextElement, _TextualElement);

  function TextElement(parent, attributes) {
    _classCallCheck(this, TextElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextElement).call(this, parent, attributes));

    _this.numeric = !!attributes.numeric;

    _this.format = attributes.format;

    _this.min = +attributes.min;

    _this.max = +attributes.max;

    if (isNaN(_this.min)) {
      _this.min = null;
    }

    if (isNaN(_this.max)) {
      _this.max = null;
    }

    _this.pattern = attributes.pattern;

    _this.patternDescription = attributes.pattern_description;
    return _this;
  }

  _createClass(TextElement, [{
    key: 'isDecimalFormat',
    get: function get() {
      return this.numeric && this.format === 'decimal';
    }
  }, {
    key: 'isIntegerFormat',
    get: function get() {
      return this.numeric && this.format === 'integer';
    }
  }, {
    key: 'hasMin',
    get: function get() {
      return this.min != null;
    }
  }, {
    key: 'hasMax',
    get: function get() {
      return this.max != null;
    }
  }, {
    key: 'hasPattern',
    get: function get() {
      return this.pattern && this.pattern.length;
    }
  }]);

  return TextElement;
})(_textualElement2.default);

exports.default = TextElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextualElement = (function (_Element) {
  _inherits(TextualElement, _Element);

  function TextualElement() {
    _classCallCheck(this, TextualElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextualElement).apply(this, arguments));
  }

  return TextualElement;
})(_element2.default);

exports.default = TextualElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeElement = (function (_TextualElement) {
  _inherits(TimeElement, _TextualElement);

  function TimeElement() {
    _classCallCheck(this, TimeElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeElement).apply(this, arguments));
  }

  return TimeElement;
})(_textualElement2.default);

exports.default = TimeElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaElement = require('./media-element');

var _mediaElement2 = _interopRequireDefault(_mediaElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoElement = (function (_MediaElement) {
  _inherits(VideoElement, _MediaElement);

  function VideoElement(parent, attributes) {
    _classCallCheck(this, VideoElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoElement).call(this, parent, attributes));

    _this.trackEnabled = !!attributes.track_enabled;
    _this.audioEnabled = !!attributes.audio_enabled;
    return _this;
  }

  return VideoElement;
})(_mediaElement2.default);

exports.default = VideoElement;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualElement = require('./textual-element');

var _textualElement2 = _interopRequireDefault(_textualElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YesNoElement = (function (_TextualElement) {
  _inherits(YesNoElement, _TextualElement);

  function YesNoElement(parent, attributes) {
    _classCallCheck(this, YesNoElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YesNoElement).call(this, parent, attributes));

    _this.positiveChoice = attributes.positive;

    _this.negativeChoice = attributes.negative;

    _this.neutralChoice = attributes.neutral;

    _this.neutralEnabled = !!attributes.neutral_enabled;
    return _this;
  }

  return YesNoElement;
})(_textualElement2.default);

exports.default = YesNoElement;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notImplemented = function notImplemented() {
  throw new Error('Not implemented');
};

var Feature = (function () {
  function Feature() {
    _classCallCheck(this, Feature);
  }

  _createClass(Feature, [{
    key: 'toJSON',
    value: function toJSON() {
      notImplemented();
    }
  }, {
    key: 'updateTimetamps',
    value: function updateTimetamps() {
      notImplemented();
    }
  }, {
    key: 'id',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'createdAt',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'formValues',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'hasCoordinate',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'isGeometryEnabled',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      notImplemented();
    }
  }]);

  return Feature;
})();

exports.default = Feature;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childElements = require('./elements/child-elements');

var _childElements2 = _interopRequireDefault(_childElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = (function () {
  function Form(attributes) {
    _classCallCheck(this, Form);

    // TODO(zhm) remove json attr
    this._json = attributes;
    this.createChildElements(attributes.elements);
    this.titleFieldKeys = attributes.titile_field_keys;
  }

  _createClass(Form, [{
    key: 'toJSON',
    value: function toJSON() {
      // TODO(zhm) actually implement this so it returns a copy
      return this._json;
    }
  }]);

  return Form;
})();

exports.default = Form;

_childElements2.default.includeInto(Form);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _element = require('./elements/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  Form: _form2.default,
  Record: _record2.default
  // Condition: require('./elements/condition'),
  // NumberUtils: require('./utils/number-utils'),
  // CalculatedElement: require('./elements/calculated-element')
};

var classes = _element2.default.classes();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(classes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var prop = _step.value;

    api[prop] = classes[prop];
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

exports.default = api;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feature = require('./feature');

var _feature2 = _interopRequireDefault(_feature);

var _formValues = require('./values/form-values');

var _formValues2 = _interopRequireDefault(_formValues);

var _textUtils = require('./utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _dateUtils = require('./utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Record = (function (_Feature) {
  _inherits(Record, _Feature);

  function Record(form, attributes) {
    _classCallCheck(this, Record);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Record).call(this));

    _this._form = form;
    _this._id = attributes.id;
    _this._createdAt = _dateUtils2.default.parseTimestamp(attributes.client_created_at);
    _this._updatedAt = _dateUtils2.default.parseTimestamp(attributes.client_updated_at);
    _this._formValuesJSON = attributes.form_values;
    _this._latitude = attributes.latitude;
    _this._longitude = attributes.longitude;
    return _this;
  }

  _createClass(Record, [{
    key: 'toJSON',
    value: function toJSON() {
      var json = {};

      json.id = this.id;
      json.client_created_at = _dateUtils2.default.formatTimestamp(this.createdAt);
      json.client_updated_at = _dateUtils2.default.formatTimestamp(this.updatedAt);
      json.form_values = this.formValues.toJSON();
      json.latitude = this._latitude;
      json.longitude = this._longitude;

      return json;
    }
  }, {
    key: 'updateTimestamps',
    value: function updateTimestamps() {
      var now = new Date();

      if (this._createdAt == null) {
        this.createdAt = now;
      }

      this.updatedAt = now;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    },
    set: function set(id) {
      this._id = id;
    }
  }, {
    key: 'createdAt',
    get: function get() {
      return this._createdAt;
    },
    set: function set(createdAt) {
      this._createdAt = createdAt;
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._updatedAt;
    },
    set: function set(updatedAt) {
      this._updatedAt = updatedAt;
    }
  }, {
    key: 'formValues',
    get: function get() {
      if (this._formValues == null) {
        this._formValues = new _formValues2.default(this._form.elements, this._formValuesJSON);
      }

      return this._formValues;
    }
  }, {
    key: 'hasCoordinate',
    get: function get() {
      return this._latitude != null && this._longitude != null;
    }
  }, {
    key: 'isGeometryEnabled',
    get: function get() {
      return this.form.isGeometryEnabled;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var titleFieldKeys = this.form.titleFieldKeys;
      var titles = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = titleFieldKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldKey = _step.value;

          var value = this.formValues.getFormValue(fieldKey);

          if (value) {
            var displayValue = value.displayValue;

            if (_textUtils2.default.isPresent(displayValue)) {
              titles.push(displayValue);
            }
          }
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

      return titles.join(', ');
    }
  }]);

  return Record;
})(_feature2.default);

exports.default = Record;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var intl = null;

if (typeof Intl !== 'undefined') {
  intl = (window || global).Intl;
}

var DateUtils = (function () {
  function DateUtils() {
    _classCallCheck(this, DateUtils);
  }

  _createClass(DateUtils, null, [{
    key: 'parseDate',
    value: function parseDate(dateString) {
      return new Date(dateString);
    }
  }, {
    key: 'parseTime',
    value: function parseTime(timeString) {
      if (!(timeString != null && timeString.length === 5)) {
        return null;
      }
      return timeString;
    }
  }, {
    key: 'parseTimestamp',
    value: function parseTimestamp(timestampString) {
      return new Date(parseFloat(timestampString) * 1000);
    }
  }, {
    key: 'formatTimestamp',
    value: function formatTimestamp(date) {
      if (date == null) {
        return null;
      }
      return date.getTime().toFixed(3);
    }
  }, {
    key: 'formatLocalizedDate',
    value: function formatLocalizedDate(date) {
      if (date == null) {
        return null;
      }
      return DateUtils.__formatLocalizedDate(date);
    }
  }, {
    key: '__formatLocalizedDate',
    value: function __formatLocalizedDate(date) {
      if (!_locale2.default.supportsECMA402()) {
        var year = date.getFullYear();
        var month = _lodash2.default.padLeft(date.getMonth() + 1, 2, '0');
        var day = _lodash2.default.padLeft(date.getDate(), 2, '0');
        return year + '-' + month + '-' + day;
      }

      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      return new intl.DateTimeFormat(_locale2.default.currentLocale(), options).format(date);
    }
  }]);

  return DateUtils;
})();

exports.default = DateUtils;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locale = (function () {
  function Locale() {
    _classCallCheck(this, Locale);
  }

  _createClass(Locale, null, [{
    key: 'currentLocale',
    value: function currentLocale() {
      return Locale.__currentLocale();
    }
  }, {
    key: '__currentLocale',
    value: function __currentLocale() {
      return 'en-US';
    }
  }, {
    key: 'supportsECMA402',
    value: function supportsECMA402() {
      if (typeof Intl !== 'undefined') {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Locale;
})();

exports.default = Locale;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-invalid-this: 0*/
/* eslint guard-for-in: 0*/

var ExcludedClassProperties = ['__super__'];
var ExcludedPrototypeProperties = ['constructor', 'extended'];

var Mixin = (function () {
  _createClass(Mixin, null, [{
    key: 'includeInto',
    value: function includeInto(constructor) {
      this.extend(constructor.prototype);

      for (var name in this) {
        if (ExcludedClassProperties.indexOf(name) === -1) {
          if (!constructor.hasOwnProperty(name)) {
            var descriptor = Object.getOwnPropertyDescriptor(constructor, name);

            Object.defineProperty(constructor, name, descriptor);
          }
        }
      }

      if (this.included) {
        this.included(constructor);
      }
    }
  }, {
    key: 'extend',
    value: function extend(object) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.getOwnPropertyNames(this.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          if (ExcludedPrototypeProperties.indexOf(name) === -1) {
            if (!object.hasOwnProperty(name)) {
              var descriptor = Object.getOwnPropertyDescriptor(this.prototype, name);

              Object.defineProperty(object, name, descriptor);
            }
          }
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

      if (this.prototype.extended) {
        this.prototype.extended(object);
      }
    }
  }]);

  function Mixin() {
    _classCallCheck(this, Mixin);

    if (this.extended) {
      this.extended();
    }
  }

  return Mixin;
})();

exports.default = Mixin;

for (var name in Mixin) {
  if (Mixin.hasOwnProperty(name)) {
    ExcludedClassProperties.push(name);
  }
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MachineFormatterOptions = {
  style: 'decimal',
  useGrouping: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 20
};

var intl = null;

if (typeof Intl !== 'undefined') {
  intl = (window || global).Intl;
}

var NumberUtils = (function () {
  function NumberUtils() {
    _classCallCheck(this, NumberUtils);
  }

  _createClass(NumberUtils, null, [{
    key: 'parseDouble',
    value: function parseDouble(input) {
      return +input;
    }
  }, {
    key: 'localizedStringFromMachineString',
    value: function localizedStringFromMachineString(machineString, allowDecimals) {
      return machineString;
    }
  }, {
    key: 'formatMachine',
    value: function formatMachine(number) {
      if (intl) {
        if (NumberUtils.machineFormatter == null) {
          NumberUtils.machineFormatter = new intl.NumberFormat(['en-US'], MachineFormatterOptions);
        }
      }

      return NumberUtils.formatWithFormatter(NumberUtils.machineFormatter, number);
    }
  }, {
    key: 'formatCurrency',
    value: function formatCurrency(number, currency) {
      if (number == null) {
        return null;
      }

      return NumberUtils.__formatCurrency(number, currency);
    }
  }, {
    key: '__formatCurrency',
    value: function __formatCurrency(number, currency) {
      if (!_locale2.default.supportsECMA402()) {
        return number;
      }

      var options = {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };

      var formatter = new (window || global).Intl.NumberFormat(_locale2.default.currentLocale(), options);

      return formatter.format(number);
    }
  }, {
    key: 'formatWithFormatter',
    value: function formatWithFormatter(formatter, number) {
      if (formatter != null) {
        var string = formatter.format(number);

        if (string === 'NaN') {
          return number;
        } else {
          return string;
        }
      } else {
        return number.toString();
      }
    }
  }]);

  return NumberUtils;
})();

exports.default = NumberUtils;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextUtils = (function () {
  function TextUtils() {
    _classCallCheck(this, TextUtils);
  }

  _createClass(TextUtils, null, [{
    key: 'isEmpty',
    value: function isEmpty(value) {
      if (value == null) {
        return true;
      }

      if (TextUtils.trim(value).length < 1) {
        return true;
      }

      return false;
    }
  }, {
    key: 'isPresent',
    value: function isPresent(value) {
      return !TextUtils.isEmpty(value);
    }
  }, {
    key: 'contains',
    value: function contains(haystack, needle) {
      return _lodash2.default.contains(haystack.toLowerCase(), needle.toLowerCase());
    }
  }, {
    key: 'startsWith',
    value: function startsWith(haystack, needle) {
      return _lodash2.default.startsWith(haystack, needle);
    }
  }, {
    key: 'trim',
    value: function trim(value) {
      return _lodash2.default.trim(value);
    }
  }]);

  return TextUtils;
})();

exports.default = TextUtils;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _address = require('./address');

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressValue = (function (_FormValue) {
  _inherits(AddressValue, _FormValue);

  function AddressValue(element, attributes) {
    _classCallCheck(this, AddressValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddressValue).call(this, element));

    _this.address = new _address2.default(attributes);
    return _this;
  }

  _createClass(AddressValue, [{
    key: 'toJSON',
    value: function toJSON() {
      return this.address.toJSON();
    }
  }, {
    key: 'isEqual',
    value: function isEqual(stringValue) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(stringValue) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(stringValue) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(stringValue) {
      return false;
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(stringValue) {
      return false;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this.address.isEmpty();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return this.address.lines().join('\n');
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.address.lines().join(' ');
    }
  }, {
    key: 'length',
    get: function get() {
      return this.displayValue.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      throw new Error('Not implemented');
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      throw new Error('Not implemented');
    }
  }]);

  return AddressValue;
})(_formValue2.default);

exports.default = AddressValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = (function () {
  function Address(attributes) {
    _classCallCheck(this, Address);

    this.streetNumber = attributes.sub_thoroughfare;
    this.streetName = attributes.thoroughfare;
    this.suite = attributes.suite;
    this.city = attributes.locality;
    this.county = attributes.sub_admin_area;
    this.state = attributes.admin_area;
    this.postalCode = attributes.postal_code;
    this.country = attributes.country;
  }

  _createClass(Address, [{
    key: 'toJSON',
    value: function toJSON() {
      var json = {};

      json.sub_thoroughfare = this.streetNumber || null;
      json.thoroughfare = this.streetName || null;
      json.suite = this.suite || null;
      json.locality = this.city || null;
      json.sub_admin_area = this.county || null;
      json.admin_area = this.state || null;
      json.postal_code = this.postalCode || null;
      json.country = this.country || null;

      return json;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.streetNumber = null;
      this.streetName = null;
      this.suite = null;
      this.city = null;
      this.county = null;
      this.state = null;
      this.postalCode = null;
      this.country = null;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return !(_textUtils2.default.isPresent(this.streetNumber) || _textUtils2.default.isPresent(this.streetName) || _textUtils2.default.isPresent(this.suite) || _textUtils2.default.isPresent(this.city) || _textUtils2.default.isPresent(this.county) || _textUtils2.default.isPresent(this.state) || _textUtils2.default.isPresent(this.postalCode) || _textUtils2.default.isPresent(this.country));
    }
  }, {
    key: 'lines',
    value: function lines() {
      var result = [];

      var line1 = this.line1();
      var line2 = this.line2();
      var line3 = this.line3();

      if (_textUtils2.default.isPresent(line1)) {
        result.push(line1);
      }

      if (_textUtils2.default.isPresent(line2)) {
        result.push(line2);
      }

      if (_textUtils2.default.isPresent(line3)) {
        result.push(line3);
      }

      return result;
    }
  }, {
    key: 'line1',
    value: function line1() {
      return this.line(this.streetNumber, this.streetName, this.suite);
    }
  }, {
    key: 'line2',
    value: function line2() {
      return this.line(this.city, this.state, this.postalCode);
    }
  }, {
    key: 'line3',
    value: function line3() {
      return this.line(this.country);
    }
  }, {
    key: 'line',
    value: function line() {
      var result = [];

      for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
        parts[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;

          if (_textUtils2.default.isPresent(part)) {
            result.push(part);
          }
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

      return result.join(' ');
    }
  }]);

  return Address;
})();

exports.default = Address;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaItemValue = require('./media-item-value');

var _mediaItemValue2 = _interopRequireDefault(_mediaItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioItemValue = (function (_MediaItemValue) {
  _inherits(AudioItemValue, _MediaItemValue);

  function AudioItemValue() {
    _classCallCheck(this, AudioItemValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioItemValue).apply(this, arguments));
  }

  _createClass(AudioItemValue, [{
    key: 'mediaKey',
    get: function get() {
      return 'audio_id';
    }
  }]);

  return AudioItemValue;
})(_mediaItemValue2.default);

exports.default = AudioItemValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _audioItemValue = require('./audio-item-value');

var _audioItemValue2 = _interopRequireDefault(_audioItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioValue = (function (_MediaValue) {
  _inherits(AudioValue, _MediaValue);

  function AudioValue() {
    _classCallCheck(this, AudioValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioValue).apply(this, arguments));
  }

  _createClass(AudioValue, [{
    key: 'ItemClass',
    get: function get() {
      return _audioItemValue2.default;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.length === 1) {
        return '1 Audio File';
      } else {
        return this.length + ' Audio Files';
      }
    }
  }]);

  return AudioValue;
})(_mediaValue2.default);

exports.default = AudioValue;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarcodeValue = (function (_TextualValue) {
  _inherits(BarcodeValue, _TextualValue);

  function BarcodeValue() {
    _classCallCheck(this, BarcodeValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BarcodeValue).apply(this, arguments));
  }

  return BarcodeValue;
})(_textualValue2.default);

exports.default = BarcodeValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalculatedValue = (function (_TextualValue) {
  _inherits(CalculatedValue, _TextualValue);

  function CalculatedValue(element, value) {
    _classCallCheck(this, CalculatedValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalculatedValue).call(this, element, value));

    _this.error = null;
    return _this;
  }

  _createClass(CalculatedValue, [{
    key: 'displayValue',
    get: function get() {
      if (this.hasError) {
        return this.error;
      }

      return this.element.display.format(this.textValue);
    }
  }, {
    key: 'hasError',
    get: function get() {
      return this.error != null;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      var display = this.element.display;

      // - for currency or number display, return the numeric value
      // - for date calculations return the UTC epoch seconds
      // - for text (and anything else) just return the string value

      if (display.isCurrency || display.isNumber) {
        return _numberUtils2.default.parseDouble(this.textValue);
      } else if (display.isDate) {
        var date = _dateUtils2.default.parseDate(this.textValue);

        if (date) {
          return date.getTime();
        }
      }

      return this.textValue;
    }
  }]);

  return CalculatedValue;
})(_textualValue2.default);

exports.default = CalculatedValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoiceDisplaySeparator = ', ';
var ChoiceSearchSeparator = ' ';

var ChoiceValue = (function (_FormValue) {
  _inherits(ChoiceValue, _FormValue);

  function ChoiceValue(element, attributes) {
    _classCallCheck(this, ChoiceValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChoiceValue).call(this, element, attributes));

    _this._choiceValues = [];
    _this._otherValues = [];

    if (attributes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = attributes.choice_values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var choice = _step.value;

          if (_textUtils2.default.isPresent(choice)) {
            _this._choiceValues.push(choice);
          }
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = attributes.other_values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var choice = _step2.value;

          if (_textUtils2.default.isPresent(choice)) {
            _this._otherValues.push(choice);
          }
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
    return _this;
  }

  _createClass(ChoiceValue, [{
    key: 'toJSON',
    value: function toJSON() {
      if (this.isEmpty) {
        return null;
      }

      var choiceValues = [];
      var otherValues = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._choiceValues[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var rawValue = _step3.value;

          choiceValues.push(rawValue);
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._otherValues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var otherValue = _step4.value;

          otherValues.push(otherValue);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return {
        choice_values: choiceValues,
        other_values: otherValues
      };
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      if (this._choiceValues.length) {
        return false;
      }
      if (this._otherValues.length) {
        return false;
      }
      return true;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var labels = [];

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._choiceValues[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var rawValue = _step5.value;

          var choice = this.choiceElement.choiceByValue(rawValue);

          var label = choice != null ? choice.label : rawValue;

          if (_textUtils2.default.isPresent(label)) {
            labels.push(label);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this._otherValues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var otherValue = _step6.value;

          labels.push(otherValue);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return labels.join(ChoiceDisplaySeparator);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var values = [];

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this._choiceValues[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var rawValue = _step7.value;

          var choice = this.choiceElement.choiceByValue(rawValue);

          if (choice != null) {
            values.push(choice.label);
            values.push(choice.value);
          } else {
            values.push(rawValue);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this._otherValues[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var otherValue = _step8.value;

          values.push(otherValue);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return values.join(ChoiceSearchSeparator);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._choiceValues.length + this._otherValues.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      var allValues = [];

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this._choiceValues[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var rawValue = _step9.value;

          allValues.push(rawValue);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this._otherValues[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var otherValue = _step10.value;

          allValues.push(otherValue);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      if (allValues.length === 0) {
        return null;
      }

      if (!this.element.multiple) {
        return allValues[0];
      }

      return '\t' + allValues.join('\t') + '\t';
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }, {
    key: 'hasOtherValue',
    get: function get() {
      return this._otherValues.length !== 0;
    }
  }, {
    key: 'selectedValues',
    get: function get() {
      return this._choiceValues.slice();
    },
    set: function set(values) {
      this._choiceValues = (values || []).slice();
    }
  }, {
    key: 'otherValues',
    get: function get() {
      return this._otherValues.slice();
    },
    set: function set(values) {
      this._otherValues = (values || []).slice();
    }
  }, {
    key: 'otherValue',
    get: function get() {
      if (!this.hasOtherValue) {
        return null;
      }

      return this._otherValues[0];
    }
  }]);

  return ChoiceValue;
})(_formValue2.default);

exports.default = ChoiceValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplaySeparator = ' ▸ ';

var SearchSeparator = ' ';

var ClassificationValue = (function (_FormValue) {
  _inherits(ClassificationValue, _FormValue);

  function ClassificationValue(element, attributes) {
    _classCallCheck(this, ClassificationValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClassificationValue).call(this, element, attributes));

    _this._choiceValues = [];
    _this._otherValues = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = attributes.choice_values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var choice = _step.value;

        if (_textUtils2.default.isPresent(choice)) {
          _this._choiceValues.push(choice);
        }
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = attributes.other_values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var choice = _step2.value;

        if (_textUtils2.default.isPresent(choice)) {
          _this._otherValues.push(choice);
        }
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

    return _this;
  }

  _createClass(ClassificationValue, [{
    key: 'toJSON',
    value: function toJSON() {
      if (this.isEmpty()) {
        return null;
      }

      var choiceValues = this._choiceValues.slice();
      var otherValues = this._otherValues.slice();

      return {
        choice_values: choiceValues,
        other_values: otherValues
      };
    }
  }, {
    key: 'columnValue',
    value: function columnValue() {
      var allValues = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._choiceValues[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var value = _step3.value;

          allValues.push(value);
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._otherValues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var value = _step4.value;

          allValues.push(value);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      if (allValues.length === 0) {
        return null;
      }

      if (!this.element.multiple) {
        return allValues[0];
      }

      return allValues.join('\t');
    }
  }, {
    key: 'hasOtherValue',
    value: function hasOtherValue() {
      return this._otherValues.length !== 0;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      if (this._choiceValues.length) {
        return false;
      }

      if (this._otherValues.length) {
        return false;
      }

      return true;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var labels = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._choiceValues[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var rawValue = _step5.value;

          var classification = this.element.classificationByValue(rawValue);
          var label = classification != null ? classification.label : rawValue;

          if (_textUtils2.default.isPresent(label)) {
            labels.push(label);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this._otherValues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var value = _step6.value;

          labels.push(value);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return labels.join(DisplaySeparator);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var values = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this._choiceValues[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var rawValue = _step7.value;

          var classification = this.element.classificationByValue(rawValue);

          if (classification != null) {
            values.push(classification.label);
            values.push(classification.value);
          } else {
            values.push(rawValue);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this._otherValues[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var value = _step8.value;

          values.push(value);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return values.join(SearchSeparator);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._choiceValues.length + this._otherValues.length;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }]);

  return ClassificationValue;
})(_formValue2.default);

exports.default = ClassificationValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateValue = (function (_TextualValue) {
  _inherits(DateValue, _TextualValue);

  function DateValue(element, value) {
    _classCallCheck(this, DateValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DateValue).call(this, element, value));
  }

  _createClass(DateValue, [{
    key: 'isLessThan',
    value: function isLessThan(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      var thisDate = this.dateValue();
      var thatDate = _dateUtils2.default.parseDate(stringValue);

      if (thisDate == null || thatDate == null) {
        return false;
      }

      return thisDate.getTime() < thatDate.getTime();
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      var thisDate = this.dateValue();
      var thatDate = _dateUtils2.default.parseDate(stringValue);

      if (thisDate == null || thatDate == null) {
        return false;
      }

      return thisDate.getTime() > thatDate.getTime();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var date = this.dateValue();

      if (date == null) {
        return null;
      }

      return _dateUtils2.default.formatLocalizedDate(date);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.textValue;
    }
  }, {
    key: 'dateValue',
    get: function get() {
      return _dateUtils2.default.parseDate(this.textValue);
    }
  }]);

  return DateValue;
})(_textualValue2.default);

exports.default = DateValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _choiceValue = require('./choice-value');

var _choiceValue2 = _interopRequireDefault(_choiceValue);

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _dateValue = require('./date-value');

var _dateValue2 = _interopRequireDefault(_dateValue);

var _timeValue = require('./time-value');

var _timeValue2 = _interopRequireDefault(_timeValue);

var _photoValue = require('./photo-value');

var _photoValue2 = _interopRequireDefault(_photoValue);

var _videoValue = require('./video-value');

var _videoValue2 = _interopRequireDefault(_videoValue);

var _audioValue = require('./audio-value');

var _audioValue2 = _interopRequireDefault(_audioValue);

var _signatureValue = require('./signature-value');

var _signatureValue2 = _interopRequireDefault(_signatureValue);

var _classificationValue = require('./classification-value');

var _classificationValue2 = _interopRequireDefault(_classificationValue);

var _repeatableValue = require('./repeatable-value');

var _repeatableValue2 = _interopRequireDefault(_repeatableValue);

var _addressValue = require('./address-value');

var _addressValue2 = _interopRequireDefault(_addressValue);

var _yesNoValue = require('./yes-no-value');

var _yesNoValue2 = _interopRequireDefault(_yesNoValue);

var _hyperlinkValue = require('./hyperlink-value');

var _hyperlinkValue2 = _interopRequireDefault(_hyperlinkValue);

var _barcodeValue = require('./barcode-value');

var _barcodeValue2 = _interopRequireDefault(_barcodeValue);

var _calculatedValue = require('./calculated-value');

var _calculatedValue2 = _interopRequireDefault(_calculatedValue);

var _recordLinkValue = require('./record-link-value');

var _recordLinkValue2 = _interopRequireDefault(_recordLinkValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constructors = {
  ChoiceField: _choiceValue2.default,
  TextField: _textualValue2.default,
  DateTimeField: _dateValue2.default,
  DateField: _dateValue2.default,
  TimeField: _timeValue2.default,
  PhotoField: _photoValue2.default,
  VideoField: _videoValue2.default,
  AudioField: _audioValue2.default,
  SignatureField: _signatureValue2.default,
  ClassificationField: _classificationValue2.default,
  Repeatable: _repeatableValue2.default,
  AddressField: _addressValue2.default,
  YesNoField: _yesNoValue2.default,
  HyperlinkField: _hyperlinkValue2.default,
  BarcodeField: _barcodeValue2.default,
  CalculatedField: _calculatedValue2.default,
  RecordLinkField: _recordLinkValue2.default
};

var FormValueFactory = (function () {
  function FormValueFactory() {
    _classCallCheck(this, FormValueFactory);
  }

  _createClass(FormValueFactory, null, [{
    key: 'create',
    value: function create(element, attributes) {
      var constructor = Constructors[element.type];

      if (constructor == null) {
        throw new Error('Unsupported element ' + element.type);
      }

      return new constructor(element, attributes);
    }
  }, {
    key: 'classes',
    value: function classes() {
      return Constructors;
    }
  }]);

  return FormValueFactory;
})();

exports.default = FormValueFactory;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notImplemented() {
  throw new Error('Not implemented');
}

var FormValue = (function () {
  function FormValue(element, value) {
    _classCallCheck(this, FormValue);

    this._element = element;
    this._rawValue = value;
  }

  _createClass(FormValue, [{
    key: 'toJSON',
    value: function toJSON() {
      notImplemented();
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      notImplemented();
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      notImplemented();
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      notImplemented();
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      notImplemented();
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      notImplemented();
    }
  }, {
    key: 'element',
    get: function get() {
      return this._element;
    },
    set: function set(element) {
      this._element = element;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'displayValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'length',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'columnValue',
    get: function get() {
      notImplemented();
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      notImplemented();
    }
  }]);

  return FormValue;
})();

exports.default = FormValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValueFactory = require('./form-value-factory');

var _formValueFactory2 = _interopRequireDefault(_formValueFactory);

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchValueSeparator = ' ';

var FormValues = (function () {
  function FormValues(elements, attributes) {
    _classCallCheck(this, FormValues);

    this._values = {};
    this.elements = elements;
    this.loadValues(this.elements, attributes);
  }

  _createClass(FormValues, [{
    key: 'getFormValue',
    value: function getFormValue(key) {
      return this._values[key];
    }
  }, {
    key: 'setFormValue',
    value: function setFormValue(key, value) {
      if (value && !(value instanceof _formValue2.default)) {
        throw new Error('Invalid value ' + value);
      }

      if (value != null) {
        this._values[key] = value;
      } else {
        delete this._values[key];
      }
    }
  }, {
    key: 'loadValues',
    value: function loadValues(elements, attributes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          this.loadValue(element, attributes);
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
  }, {
    key: 'loadValue',
    value: function loadValue(element, attributes) {
      if (element.isSectionElement) {
        this.loadValues(element.elements, attributes);
      } else {
        var rawValue = attributes[element.key];

        if (rawValue != null) {
          var formValue = _formValueFactory2.default.create(element, rawValue);

          this.setFormValue(element.key, formValue);
        }
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {};

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(this._values)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          var formValue = this._values[key];

          if (formValue) {
            var jsonValue = formValue.toJSON();

            if (jsonValue) {
              json[key] = jsonValue;
            }
          }
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

      return json;
    }
  }, {
    key: 'copy',
    value: function copy() {
      return new FormValues(this.elements, this.toJSON());
    }
  }, {
    key: 'merge',
    value: function merge(formValues) {
      if (!(formValues instanceof FormValues)) {
        throw new Error('Invalid values');
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.keys(this._values)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var key = _step3.value;

          var formValue = this._values[key];

          this.setFormValue(key, formValue);
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
  }, {
    key: 'createValue',
    value: function createValue(element, rawValue) {
      return _formValueFactory2.default.create(element, rawValue != null ? rawValue : null);
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      var searchValues = [];

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.keys(this._values)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var key = _step4.value;

          var formValue = this._values[key];

          if (formValue) {
            var searchValue = formValue.searchableValue();

            if (searchValue != null) {
              searchValues.push(searchValue);
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return searchValues.join(SearchValueSeparator);
    }
  }]);

  return FormValues;
})();

exports.default = FormValues;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HyperlinkValue = (function (_TextualValue) {
  _inherits(HyperlinkValue, _TextualValue);

  function HyperlinkValue() {
    _classCallCheck(this, HyperlinkValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HyperlinkValue).apply(this, arguments));
  }

  return HyperlinkValue;
})(_textualValue2.default);

exports.default = HyperlinkValue;
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaItemValue = (function () {
  function MediaItemValue(attributes) {
    _classCallCheck(this, MediaItemValue);

    this.caption = attributes.caption;
    this.mediaID = attributes[this.mediaKey];
  }

  _createClass(MediaItemValue, [{
    key: "toJSON",
    value: function toJSON() {
      var json = {};

      json.caption = this.caption || null;
      json[this.mediaKey] = this.mediaID || null;

      return json;
    }
  }]);

  return MediaItemValue;
})();

exports.default = MediaItemValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaValue = (function (_FormValue) {
  _inherits(MediaValue, _FormValue);

  function MediaValue(element, items) {
    _classCallCheck(this, MediaValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MediaValue).call(this, element, items));

    _this._items = [];

    if (items != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _this._items.push(new _this.ItemClass(item));
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
    return _this;
  }

  _createClass(MediaValue, [{
    key: 'columnValue',
    value: function columnValue() {
      var ids = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          ids.push(item.mediaID);
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

      return ids.join(',');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var items = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          items.push(item.toJSON());
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

      return items;
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      return this.length < _numberUtils2.default.parseDouble(value);
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      return this.length > _numberUtils2.default.parseDouble(value);
    }
  }, {
    key: 'mapItems',
    value: function mapItems(callback) {
      return this._items.slice().map(callback);
    }
  }, {
    key: 'addItem',
    value: function addItem(id, caption) {
      var item = new this.ItemClass({ caption: caption });

      item.mediaID = id;

      this._items.push(item);

      return item;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this._items.length === 0;
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var ids = [];

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var item = _step4.value;

          if (_textUtils2.default.isPresent(item.caption)) {
            ids.push(item.caption);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return ids.join(' ');
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      var items = [];

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var item = _step5.value;

          items.push(new _multipleValueItem2.default(this.element, item.mediaID));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return items;
    }
  }]);

  return MediaValue;
})(_formValue2.default);

exports.default = MediaValue;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultipleValueItem = function MultipleValueItem(element, value) {
  _classCallCheck(this, MultipleValueItem);

  this.element = element;
  this.value = value;
};

exports.default = MultipleValueItem;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaItemValue = require('./media-item-value');

var _mediaItemValue2 = _interopRequireDefault(_mediaItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoItemValue = (function (_MediaItemValue) {
  _inherits(PhotoItemValue, _MediaItemValue);

  function PhotoItemValue() {
    _classCallCheck(this, PhotoItemValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoItemValue).apply(this, arguments));
  }

  _createClass(PhotoItemValue, [{
    key: 'mediaKey',
    get: function get() {
      return 'photo_id';
    }
  }]);

  return PhotoItemValue;
})(_mediaItemValue2.default);

exports.default = PhotoItemValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _photoItemValue = require('./photo-item-value');

var _photoItemValue2 = _interopRequireDefault(_photoItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoValue = (function (_MediaValue) {
  _inherits(PhotoValue, _MediaValue);

  function PhotoValue() {
    _classCallCheck(this, PhotoValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoValue).apply(this, arguments));
  }

  _createClass(PhotoValue, [{
    key: 'ItemClass',
    get: function get() {
      return _photoItemValue2.default;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.length === 1) {
        return '1 Photo';
      } else {
        return this.length + ' Photos';
      }
    }
  }]);

  return PhotoValue;
})(_mediaValue2.default);

exports.default = PhotoValue;
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecordLinkItemValue = (function () {
  function RecordLinkItemValue(attributes) {
    _classCallCheck(this, RecordLinkItemValue);

    this._recordID = attributes.record_id;
  }

  _createClass(RecordLinkItemValue, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        record_id: this._recordID
      };
    }
  }]);

  return RecordLinkItemValue;
})();

exports.default = RecordLinkItemValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _recordLinkItemValue = require('./record-link-item-value');

var _recordLinkItemValue2 = _interopRequireDefault(_recordLinkItemValue);

var _multipleValueItem = require('./multiple-value-item');

var _multipleValueItem2 = _interopRequireDefault(_multipleValueItem);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordLinkValue = (function (_FormValue) {
  _inherits(RecordLinkValue, _FormValue);

  function RecordLinkValue(element, items) {
    _classCallCheck(this, RecordLinkValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecordLinkValue).call(this, element, items));

    _this._items = [];

    if (items) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _this._items.push(new _recordLinkItemValue2.default(item));
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
    return _this;
  }

  _createClass(RecordLinkValue, [{
    key: 'toJSON',
    value: function toJSON() {
      var items = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          items.push(item.toJSON());
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

      return items;
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      return this.length < _numberUtils2.default.parseDouble(value);
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      return this.length > _numberUtils2.default.parseDouble(value);
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this.length === 0;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      if (this.length === 1) {
        return '1 record';
      }

      return this.length + ' records';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.displayValue;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      var ids = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          ids.push(new _multipleValueItem2.default(this.element, item.recordID));
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

      return ids;
    }
  }]);

  return RecordLinkValue;
})(_formValue2.default);

exports.default = RecordLinkValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feature = require('../feature');

var _feature2 = _interopRequireDefault(_feature);

var _formValues = require('./form-values');

var _formValues2 = _interopRequireDefault(_formValues);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepeatableItemValue = (function (_Feature) {
  _inherits(RepeatableItemValue, _Feature);

  function RepeatableItemValue(element, item, index) {
    _classCallCheck(this, RepeatableItemValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RepeatableItemValue).call(this));

    _this.index = index;

    _this._element = element;
    _this._id = item.id;
    _this._createdAt = _dateUtils2.default.parseTimestamp(item.created_at);
    _this._updatedAt = _dateUtils2.default.parseTimestamp(item.updated_at);
    _this._formValuesJSON = item.form_values;

    var geometry = item.geometry;

    if (geometry != null && geometry.type === 'Point') {
      _this._latitude = geometry.coordinates[1];
      _this._longitude = geometry.coordinates[0];
    }
    return _this;
  }

  _createClass(RepeatableItemValue, [{
    key: 'toJSON',
    value: function toJSON() {
      var json = {};

      json.id = this.identifier;
      json.created_at = _dateUtils2.default.formatTimestamp(this.createdAt);
      json.updated_at = _dateUtils2.default.formatTimestamp(this.updatedAt);
      json.form_values = this.formValues.toJSON();
      json.geometry = this.geometryAsGeoJSON();

      return json;
    }
  }, {
    key: 'updateTimestamps',
    value: function updateTimestamps() {
      var now = new Date();

      if (!this._createdAt) {
        this._createdAt = now;
      }

      this._updatedAt = now;
    }
  }, {
    key: 'geometryAsGeoJSON',
    value: function geometryAsGeoJSON() {
      if (!this.hasCoordinate) {
        return null;
      }

      return {
        type: 'Point',
        coordinates: [this._longitude, this._latitude]
      };
    }
  }, {
    key: 'identifier',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'createdAt',
    get: function get() {
      return this._createdAt;
    }
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._updatedAt;
    }
  }, {
    key: 'formValues',
    get: function get() {
      if (!this._formValues) {
        this._formValues = new _formValues2.default(this._element.elements, this._formValuesJSON);
      }

      return this._formValues;
    }
  }, {
    key: 'hasCoordinate',
    get: function get() {
      return this._latitude != null && this._longitude != null;
    }
  }, {
    key: 'isGeometryEnabled',
    get: function get() {
      return this._element.isGeometryEnabled;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      var titleFieldKeys = this.repeatableElement.titleFieldKeys;
      var titles = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = titleFieldKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldKey = _step.value;

          var formValue = this.formValues.getFormValue(fieldKey);

          if (formValue) {
            var displayValue = formValue.displayValue;

            if (_textUtils2.default.isPresent(displayValue)) {
              titles.push(displayValue);
            }
          }
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

      return titles.join(', ');
    }
  }]);

  return RepeatableItemValue;
})(_feature2.default);

exports.default = RepeatableItemValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _repeatableItemValue = require('./repeatable-item-value');

var _repeatableItemValue2 = _interopRequireDefault(_repeatableItemValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchSeparator = ' ';

var RepeatableValue = (function (_FormValue) {
  _inherits(RepeatableValue, _FormValue);

  function RepeatableValue(element, items) {
    _classCallCheck(this, RepeatableValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RepeatableValue).call(this, element, items));

    _this._items = [];

    if (items != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _this._items.push(new _repeatableItemValue2.default(_this.element, item));
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
    return _this;
  }

  _createClass(RepeatableValue, [{
    key: 'toJSON',
    value: function toJSON() {
      if (this.isEmpty) {
        return null;
      }

      var items = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          items.push(item.toJSON());
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

      return items;
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      return false;
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      return false;
    }
  }, {
    key: 'mapItems',
    value: function mapItems(callback) {
      return this._items.slice().map(callback);
    }
  }, {
    key: 'forEachItem',
    value: function forEachItem(callback) {
      this.mapItems(callback);
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return this._items.length === 0;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.length === 1) {
        return '1 Item';
      } else {
        return this.length + ' Items';
      }
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var values = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          var searchValue = item.searchableValue();

          if (_textUtils2.default.isPresent(searchValue)) {
            values.push(searchValue);
          }
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

      return values.join(SearchSeparator);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._items.length;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }]);

  return RepeatableValue;
})(_formValue2.default);

exports.default = RepeatableValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignatureValue = (function (_FormValue) {
  _inherits(SignatureValue, _FormValue);

  function SignatureValue(element, attributes) {
    _classCallCheck(this, SignatureValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SignatureValue).call(this, element, attributes));

    _this._identifier = attributes.signature_id;
    _this._timestamp = attributes.timestamp;
    return _this;
  }

  _createClass(SignatureValue, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        signature_id: this._identifier,
        timestamp: this._timestamp
      };
    }
  }, {
    key: 'isEqual',
    value: function isEqual(value) {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'startsWith',
    value: function startsWith(value) {
      return false;
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(value) {
      return false;
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(value) {
      return false;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return false;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return '1 Signature';
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return null;
    }
  }, {
    key: 'length',
    get: function get() {
      return 1;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return this._identifier;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }]);

  return SignatureValue;
})(_formValue2.default);

exports.default = SignatureValue;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatusValue = (function (_TextualValue) {
  _inherits(StatusValue, _TextualValue);

  function StatusValue() {
    _classCallCheck(this, StatusValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StatusValue).apply(this, arguments));
  }

  return StatusValue;
})(_formValue2.default);

exports.default = StatusValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formValue = require('./form-value');

var _formValue2 = _interopRequireDefault(_formValue);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

var _numberUtils = require('../utils/number-utils');

var _numberUtils2 = _interopRequireDefault(_numberUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextualValue = (function (_FormValue) {
  _inherits(TextualValue, _FormValue);

  function TextualValue(element, textValue) {
    _classCallCheck(this, TextualValue);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextualValue).call(this, element, textValue));

    _this.textValue = textValue;
    return _this;
  }

  _createClass(TextualValue, [{
    key: 'toJSON',
    value: function toJSON() {
      if (this.isEmpty) {
        return null;
      }

      return this.textValue;
    }
  }, {
    key: 'isEqual',
    value: function isEqual(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      return this.textValue.toLowerCase() === stringValue.toLowerCase();
    }
  }, {
    key: 'contains',
    value: function contains(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      return _textUtils2.default.contains(this.textValue, stringValue);
    }
  }, {
    key: 'startsWith',
    value: function startsWith(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      return _textUtils2.default.startsWith(this.textValue, stringValue);
    }
  }, {
    key: 'isLessThan',
    value: function isLessThan(stringValue) {
      if (this.textValue == null) {
        return false;
      }

      var thisValue = _numberUtils2.default.parseDouble(this.textValue);
      var thatValue = _numberUtils2.default.parseDouble(stringValue);

      return thisValue < thatValue;
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(stringValue) {
      if (this.textValue == null) {
        return false;
      }

      var thisValue = _numberUtils2.default.parseDouble(this.textValue);
      var thatValue = _numberUtils2.default.parseDouble(stringValue);

      return thisValue > thatValue;
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      return _textUtils2.default.isEmpty(this.textValue);
    }
  }, {
    key: 'displayValue',
    get: function get() {
      return this.textValue;
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.textValue;
    }
  }, {
    key: 'length',
    get: function get() {
      if (this.textValue) {
        return this.textValue.length;
      }

      return 0;
    }
  }, {
    key: 'columnValue',
    get: function get() {
      return this.textValue;
    }
  }, {
    key: 'multipleValues',
    get: function get() {
      return null;
    }
  }, {
    key: 'numericValue',
    get: function get() {
      return _numberUtils2.default.parseDouble(this.textValue);
    }
  }]);

  return TextualValue;
})(_formValue2.default);

exports.default = TextualValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

var _dateUtils = require('../utils/date-utils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _textUtils = require('../utils/text-utils');

var _textUtils2 = _interopRequireDefault(_textUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeValue = (function (_TextualValue) {
  _inherits(TimeValue, _TextualValue);

  function TimeValue() {
    _classCallCheck(this, TimeValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeValue).apply(this, arguments));
  }

  _createClass(TimeValue, [{
    key: 'isLessThan',
    value: function isLessThan(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      var thisTime = this.timeValue();
      var thatTime = _dateUtils2.default.parseTime(stringValue);

      if (thisTime == null || thatTime == null) {
        return false;
      }

      return thisTime.getTime() < thatTime.getTime();
    }
  }, {
    key: 'isGreaterThan',
    value: function isGreaterThan(stringValue) {
      if (this.isEmpty) {
        return _textUtils2.default.isEmpty(stringValue);
      }

      var thisTime = this.timeValue();
      var thatTime = _dateUtils2.default.parseTime(stringValue);

      if (thisTime == null || thatTime == null) {
        return false;
      }

      return thisTime.getTime() > thatTime.getTime();
    }
  }, {
    key: 'timeValue',
    value: function timeValue() {
      return _dateUtils2.default.parseTime(this.textValue);
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.isEmpty) {
        return null;
      }

      var time = this.timeValue();

      if (time == null) {
        return null;
      }

      return time;
    }
  }, {
    key: 'searchableValue',
    get: function get() {
      return this.textValue;
    }
  }]);

  return TimeValue;
})(_textualValue2.default);

exports.default = TimeValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaItemValue = require('./media-item-value');

var _mediaItemValue2 = _interopRequireDefault(_mediaItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoItemValue = (function (_MediaItemValue) {
  _inherits(VideoItemValue, _MediaItemValue);

  function VideoItemValue() {
    _classCallCheck(this, VideoItemValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoItemValue).apply(this, arguments));
  }

  _createClass(VideoItemValue, [{
    key: 'mediaKey',
    get: function get() {
      return 'video_id';
    }
  }]);

  return VideoItemValue;
})(_mediaItemValue2.default);

exports.default = VideoItemValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaValue = require('./media-value');

var _mediaValue2 = _interopRequireDefault(_mediaValue);

var _videoItemValue = require('./video-item-value');

var _videoItemValue2 = _interopRequireDefault(_videoItemValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoValue = (function (_MediaValue) {
  _inherits(VideoValue, _MediaValue);

  function VideoValue() {
    _classCallCheck(this, VideoValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoValue).apply(this, arguments));
  }

  _createClass(VideoValue, [{
    key: 'ItemClass',
    get: function get() {
      return _videoItemValue2.default;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      if (this.length === 1) {
        return '1 Video';
      } else {
        return this.length + ' Videos';
      }
    }
  }]);

  return VideoValue;
})(_mediaValue2.default);

exports.default = VideoValue;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textualValue = require('./textual-value');

var _textualValue2 = _interopRequireDefault(_textualValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YesNoValue = (function (_TextualValue) {
  _inherits(YesNoValue, _TextualValue);

  function YesNoValue() {
    _classCallCheck(this, YesNoValue);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(YesNoValue).apply(this, arguments));
  }

  _createClass(YesNoValue, [{
    key: 'isPositive',
    get: function get() {
      if (this.element.positiveChoice) {
        return this.textValue === this.element.positiveChoice.value;
      }

      return false;
    }
  }, {
    key: 'isNegative',
    get: function get() {
      if (this.element.negativeChoice) {
        return this.textValue === this.element.negativeChoice.value;
      }

      return false;
    }
  }, {
    key: 'isNeutral',
    get: function get() {
      if (this.element.neutralChoice) {
        return this.textValue === this.element.neutralChoice.value;
      }

      return false;
    }
  }, {
    key: 'displayValue',
    get: function get() {
      switch (true) {
        case this.isPositive:
          return this.yesNoElement.positiveChoice.label;
        case this.isNegative:
          return this.yesNoElement.negativeChoice.label;
        case this.isNeutral:
          return this.yesNoElement.neutralChoice.label;
        default:
          return this.textValue;
      }
    }
  }]);

  return YesNoValue;
})(_textualValue2.default);

exports.default = YesNoValue;

//# sourceMappingURL=index.js.map