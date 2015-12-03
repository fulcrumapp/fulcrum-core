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
//# sourceMappingURL=classification-element.js.map