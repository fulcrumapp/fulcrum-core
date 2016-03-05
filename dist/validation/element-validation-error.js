'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementValidationError = function () {
  function ElementValidationError(element) {
    _classCallCheck(this, ElementValidationError);

    this.element = element;
  }

  _createClass(ElementValidationError, [{
    key: 'label',
    get: function get() {
      var parents = [];

      var iterator = this.element.parent;

      while (iterator) {
        if (!(iterator instanceof _form2.default)) {
          parents.push(iterator.label);
        }

        iterator = iterator.parent;
      }

      var parentLabels = parents.reverse().concat([this.element.label]);

      return parentLabels.join(' / ');
    }
  }]);

  return ElementValidationError;
}();

exports.default = ElementValidationError;
//# sourceMappingURL=element-validation-error.js.map