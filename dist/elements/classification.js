"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Classification =
/*#__PURE__*/
function () {
  function Classification(parent, attributes) {
    this.parent = parent;
    this.label = attributes.label;
    this.value = attributes.value || attributes.label;
    this._items = [];

    if (attributes.child_classifications) {
      for (var _iterator = attributes.child_classifications, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var child = _ref;

        this._items.push(new Classification(this, child));
      }
    }
  }

  var _proto = Classification.prototype;

  _proto.toJSON = function toJSON() {
    var values = [];

    for (var _iterator2 = this.exploded, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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