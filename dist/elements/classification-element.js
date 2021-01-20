"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _classification = _interopRequireDefault(require("./classification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ClassificationElement = /*#__PURE__*/function (_Element) {
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

      for (var _iterator = _createForOfIteratorHelperLoose(overrideClassificationSetItems), _step; !(_step = _iterator()).done;) {
        var classificationAttributes = _step.value;
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
        for (var _iterator2 = _createForOfIteratorHelperLoose(items), _step2; !(_step2 = _iterator2()).done;) {
          var item = _step2.value;

          for (var _iterator3 = _createForOfIteratorHelperLoose(this.classificationFilter), _step3; !(_step3 = _iterator3()).done;) {
            var filter = _step3.value;

            if (filter.toLowerCase() === item.value.toLowerCase()) {
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