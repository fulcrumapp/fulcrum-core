"use strict";

exports.__esModule = true;
exports["default"] = void 0;
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Classification = /*#__PURE__*/function () {
  function Classification(parent, attributes) {
    this.parent = parent;
    this.label = attributes.label;
    this.value = attributes.value || attributes.label;
    this._items = [];
    if (attributes.child_classifications) {
      for (var _iterator = _createForOfIteratorHelperLoose(attributes.child_classifications), _step; !(_step = _iterator()).done;) {
        var child = _step.value;
        this._items.push(new Classification(this, child));
      }
    }
  }
  var _proto = Classification.prototype;
  _proto.toJSON = function toJSON() {
    var values = [];
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.exploded), _step2; !(_step2 = _iterator2()).done;) {
      var item = _step2.value;
      if (item.value) {
        values.push(item.value);
      }
    }
    return values;
  };
  _createClass(Classification, [{
    key: "items",
    get: function get() {
      return this._items.slice();
    }
  }, {
    key: "exploded",
    get: function get() {
      // return an array of all classifications including all parent items
      var classifications = [];

      /* eslint-disable consistent-this */
      var iterator = this;
      /* eslint-enable consistent-this */

      while (iterator && iterator.parent) {
        classifications.push(iterator);
        iterator = iterator.parent;
      }
      if (iterator) {
        classifications.push(iterator);
      }
      return classifications.reverse();
    }
  }]);
  return Classification;
}();
exports["default"] = Classification;
//# sourceMappingURL=classification.js.map