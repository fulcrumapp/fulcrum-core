"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _classification = _interopRequireDefault(require("./classification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ClassificationElement =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(ClassificationElement, _Element);

  function ClassificationElement(parent, attributes) {
    var _this;

    _this = _Element.call(this, parent, attributes) || this;
    _this.allowOther = !!attributes.allow_other;
    _this._classificationFilter = null;
    _this._overrideClassificationItems = null;
    _this._classificationSetID = attributes.classification_set_id;
    return _this;
  }

  var _proto = ClassificationElement.prototype;

  _proto.load = function load(dataSource, callback) {
    var _this2 = this;

    dataSource.getClassificationSet(this._classificationSetID, function (err, classificationSet) {
      // TODO(zhm) Some forms have orphaned classification sets (life sucks)
      // Maybe we should add a parameter to the load() method to throw
      // errors.
      if (err) {
        return callback(err);
      }

      _this2.classificationSet = classificationSet;
      return callback();
    });
  };

  _proto.resetOverrides = function resetOverrides() {
    _Element.prototype.resetOverrides.call(this);

    this._classificationFilter = null;
    this._overrideClassificationItems = null;
  };

  _createClass(ClassificationElement, [{
    key: "classificationItems",
    get: function get() {
      return this._overrideClassificationItems ? this._overrideClassificationItems : this.filteredClassifications;
    }
  }, {
    key: "classificationFilter",
    get: function get() {
      return this._classificationFilter;
    },
    set: function set(classificationFilter) {
      this._classificationFilter = classificationFilter;
    }
  }, {
    key: "overrideClassificationItems",
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
        var classification = new _classification["default"](null, classificationAttributes);
        classificationItems.push(classification);
      }

      this._overrideClassificationItems = classificationItems;
    }
  }, {
    key: "overrideValues",
    get: function get() {
      return Object.assign(Object.getOwnPropertyDescriptor(_element["default"].prototype, 'overrideValues').get.call(this), {
        classificationFilter: this._classificationFilter,
        overrideClassificationItems: this._overrideClassificationItems
      });
    }
  }, {
    key: "filteredClassifications",
    get: function get() {
      if (!this.classificationSet) {
        return [];
      }

      var items = this.classificationSet.items;

      if (!this.classificationFilter) {
        return items;
      }

      var filteredItems = [];

      if (items) {
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
      }

      return filteredItems;
    }
  }]);

  return ClassificationElement;
}(_element["default"]);

exports["default"] = ClassificationElement;
//# sourceMappingURL=classification-element.js.map