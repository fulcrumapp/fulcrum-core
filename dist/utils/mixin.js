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
//# sourceMappingURL=mixin.js.map