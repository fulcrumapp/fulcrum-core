"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _choice = _interopRequireDefault(require("./elements/choice"));

var _dateUtils = _interopRequireDefault(require("./utils/date-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChoiceList =
/*#__PURE__*/
function () {
  function ChoiceList(attributes) {
    this.updateFromAPIAttributes(attributes);
  }

  var _proto = ChoiceList.prototype;

  _proto.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};
    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._choicesJSON = attributes.choices || [];
    this._version = attributes.version;
    this._createdAt = _dateUtils["default"].parseISOTimestamp(attributes.created_at);
    this._updatedAt = _dateUtils["default"].parseISOTimestamp(attributes.updated_at);
  };

  _proto.toJSON = function toJSON() {
    var json = {};
    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.choices = this._choicesJSON || null;
    json.version = this.version;
    json.created_at = _dateUtils["default"].formatISOTimestamp(this.createdAt);
    json.updated_at = _dateUtils["default"].formatISOTimestamp(this.updatedAt);
    return json;
  };

  _createClass(ChoiceList, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "description",
    get: function get() {
      return this._description;
    }
  }, {
    key: "version",
    get: function get() {
      return this._version;
    }
  }, {
    key: "createdAt",
    get: function get() {
      return this._createdAt;
    }
  }, {
    key: "updatedAt",
    get: function get() {
      return this._updatedAt;
    }
  }, {
    key: "choices",
    get: function get() {
      if (!this._choices) {
        this._choices = [];

        for (var _iterator = this._choicesJSON, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

          this._choices.push(new _choice["default"](choice));
        }
      }

      return this._choices;
    }
  }]);

  return ChoiceList;
}();

exports["default"] = ChoiceList;
//# sourceMappingURL=choice-list.js.map