'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _elementFactory = require('./element-factory');

var _elementFactory2 = _interopRequireDefault(_elementFactory);

var _classification = require('./classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

class ClassificationElement extends _element2.default {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.allowOther = !!attributes.allowOther;
    this.choiceFilter = null;

    this._overrideClassificationItems = null;

    this._classificationSetID = attributes.classification_set_id;
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // const self = this;

      _this.classificationSet = yield _elementFactory2.default.getProvider().getClassificationSet(_this._classificationSetID);
    })();
  }

  get classificationItems() {
    return this._overrideClassificationItems ? this._overrideClassificationItems : this.filteredClassifications;
  }

  set overrideClassificationItems(overrideClassificationSetItems) {
    if (!overrideClassificationSetItems || overrideClassificationSetItems.length < 1) {
      this._overrideClassificationItems = null;
      return;
    }

    const classificationItems = [];

    for (let classificationAttributes of overrideClassificationSetItems) {
      const classification = new _classification2.default(null, classificationAttributes);

      classificationItems.push(classification);
    }

    this._overrideClassificationItems = classificationItems;
  }

  get filteredClassifications() {
    const items = this.classificationSet.items;

    if (!this.classificationFilter) {
      return items;
    }

    const filteredItems = [];

    for (let item of items) {
      for (let filter of this.classificationFilter) {
        if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
          filteredItems.push(item);
        }
      }
    }

    return filteredItems;
  }
}
exports.default = ClassificationElement;
//# sourceMappingURL=classification-element.js.map