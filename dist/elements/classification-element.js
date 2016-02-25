'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _elementFactory = require('./element-factory');

var _elementFactory2 = _interopRequireDefault(_elementFactory);

var _classification = require('./classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassificationElement = function (_Element) {
  _inherits(ClassificationElement, _Element);

  function ClassificationElement(parent, attributes) {
    _classCallCheck(this, ClassificationElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClassificationElement).call(this, parent, attributes));

    _this.allowOther = !!attributes.allowOther;
    _this.choiceFilter = null;

    _this._overrideClassificationItems = null;

    _this._classificationSetID = attributes.classification_set_id;
    return _this;
  }

  _createClass(ClassificationElement, [{
    key: 'load',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _elementFactory2.default.getProvider().getClassificationSet(this._classificationSetID);

              case 2:
                this.classificationSet = _context.sent;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function load() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'classificationItems',
    get: function get() {
      return this._overrideClassificationItems ? this._overrideClassificationItems : this.filteredClassifications;
    }
  }, {
    key: 'overrideClassificationItems',
    set: function set(overrideClassificationSetItems) {
      if (!overrideClassificationSetItems || overrideClassificationSetItems.length < 1) {
        this._overrideClassificationItems = null;
        return;
      }

      var classificationItems = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = overrideClassificationSetItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var classificationAttributes = _step.value;

          var classification = new _classification2.default(null, classificationAttributes);

          classificationItems.push(classification);
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

      this._overrideClassificationItems = classificationItems;
    }
  }, {
    key: 'filteredClassifications',
    get: function get() {
      var items = this.classificationSet.items;

      if (!this.classificationFilter) {
        return items;
      }

      var filteredItems = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.classificationFilter[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var filter = _step3.value;

              if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                filteredItems.push(item);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return filteredItems;
    }
  }]);

  return ClassificationElement;
}(_element2.default);

exports.default = ClassificationElement;
//# sourceMappingURL=classification-element.js.map