'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _choice = require('./elements/choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChoiceList = function () {
  function ChoiceList(attributes) {
    _classCallCheck(this, ChoiceList);

    this.updateFromAPIAttributes(attributes);
  }

  ChoiceList.prototype.updateFromAPIAttributes = function updateFromAPIAttributes(attrs) {
    var attributes = attrs || {};

    this._id = attributes.id;
    this._name = attributes.name;
    this._description = attributes.description;
    this._choicesJSON = attributes.choices || [];
    this._version = attributes.version;
  };

  ChoiceList.prototype.toJSON = function toJSON() {
    var json = {};

    json.id = this.id || null;
    json.name = this.name || null;
    json.description = this.description || null;
    json.choices = this._choicesJSON || null;
    json.version = this.version;

    return json;
  };

  _createClass(ChoiceList, [{
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'description',
    get: function get() {
      return this._description;
    }
  }, {
    key: 'version',
    get: function get() {
      return this._version;
    }
  }, {
    key: 'choices',
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

          this._choices.push(new _choice2.default(choice));
        }
      }

      return this._choices;
    }
  }]);

  return ChoiceList;
}();

exports.default = ChoiceList;
//# sourceMappingURL=choice-list.js.map