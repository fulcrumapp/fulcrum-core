"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _containerElement = _interopRequireDefault(require("./container-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SectionElement = /*#__PURE__*/function (_ContainerElement) {
  _inheritsLoose(SectionElement, _ContainerElement);

  function SectionElement(parent, attributes) {
    var _this;

    _this = _ContainerElement.call(this, parent, attributes) || this;
    _this.display = attributes.display;
    return _this;
  }

  _createClass(SectionElement, [{
    key: "isDrillDown",
    get: function get() {
      return this.display === 'drilldown';
    }
  }, {
    key: "isInline",
    get: function get() {
      return this.display === 'inline';
    }
  }]);

  return SectionElement;
}(_containerElement["default"]);

exports["default"] = SectionElement;
//# sourceMappingURL=section-element.js.map