"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _textualElement = _interopRequireDefault(require("./textual-element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DEFAULT_PROJECT_ELEMENT = {
  label: 'Project',
  key: '@project',
  data_name: 'project',
  disabled: false,
  hidden: false,
  choices: []
};

var ProjectElement =
/*#__PURE__*/
function (_TextualElement) {
  _inheritsLoose(ProjectElement, _TextualElement);

  function ProjectElement(parent, attributes) {
    var _this;

    attributes.type = 'ProjectField';
    var attrs = Object.assign({}, DEFAULT_PROJECT_ELEMENT, attributes);
    _this = _TextualElement.call(this, parent, attrs) || this;
    _this._disabled = !!attrs.disabled;
    _this._hidden = !!attrs.hidden;
    return _this;
  }

  var _proto = ProjectElement.prototype;

  _proto.projectForValue = function projectForValue(value) {
    for (var _iterator = this.choices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var choice = _ref;

      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  };

  _createClass(ProjectElement, [{
    key: "isEnabled",
    get: function get() {
      return !this._disabled;
    }
  }, {
    key: "isReadOnly",
    get: function get() {
      return this._overrideIsDisabled != null ? this._overrideIsDisabled : this._readOnly;
    }
  }]);

  return ProjectElement;
}(_textualElement["default"]);

exports["default"] = ProjectElement;
//# sourceMappingURL=project-element.js.map