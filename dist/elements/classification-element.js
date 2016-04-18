'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _classification = require('./classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ClassificationElement = function (_Element) {
  _inherits(ClassificationElement, _Element);

  function ClassificationElement(parent, attributes) {
    _classCallCheck(this, ClassificationElement);

    var _this = _possibleConstructorReturn(this, _Element.call(this, parent, attributes));

    _this.allowOther = !!attributes.allow_other;

    _this._choiceFilter = null;

    _this._overrideClassificationItems = null;

    _this._classificationSetID = attributes.classification_set_id;
    return _this;
  }

  ClassificationElement.prototype.load = function load(dataSource, callback) {
    var _this2 = this;

    dataSource.getClassificationSet(this._classificationSetID, function (err, classificationSet) {
      if (err) {
        return callback(err);
      }

      _this2.classificationSet = classificationSet;

      return callback();
    });
  };

  ClassificationElement.prototype.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    this._choiceFilter = null;
    this._overrideClassificationItems = null;
  };

  _createClass(ClassificationElement, [{
    key: 'classificationItems',
    get: function get() {
      return this._overrideClassificationItems ? this._overrideClassificationItems : this.filteredClassifications;
    }
  }, {
    key: 'choiceFilter',
    get: function get() {
      return this._choiceFilter;
    },
    set: function set(choiceFilter) {
      this._choiceFilter = choiceFilter;
    }
  }, {
    key: 'overrideClassificationItems',
    set: function set(overrideClassificationSetItems) {
      if (!overrideClassificationSetItems || overrideClassificationSetItems.length < 1) {
        this._overrideClassificationItems = null;
        return;
      }

      var classificationItems = [];

      for (var _iterator = overrideClassificationSetItems, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var classificationAttributes = _ref;

        var classification = new _classification2.default(null, classificationAttributes);

        classificationItems.push(classification);
      }

      this._overrideClassificationItems = classificationItems;
    }
  }, {
    key: 'overrideValues',
    get: function get() {
      return Object.assign(_Element.prototype.overrideValues, {
        choiceFilter: this._choiceFilter,
        overrideClassificationItems: this._overrideClassificationItems
      });
    }
  }, {
    key: 'filteredClassifications',
    get: function get() {
      var items = this.classificationSet.items;

      if (!this.classificationFilter) {
        return items;
      }

      var filteredItems = [];

      for (var _iterator2 = items, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var item = _ref2;

        for (var _iterator3 = this.classificationFilter, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var filter = _ref3;

          if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            filteredItems.push(item);
          }
        }
      }

      return filteredItems;
    }
  }]);

  return ClassificationElement;
}(_element2.default);

exports.default = ClassificationElement;
//# sourceMappingURL=classification-element.js.map