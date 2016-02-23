'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixmatch = require('mixmatch');

var _mixmatch2 = _interopRequireDefault(_mixmatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ElementFactory = null;

class ChildElements extends _mixmatch2.default {
  createChildElements(elements) {
    this.elements = [];

    for (let element of elements) {
      // hack for circular dependency, not ideal
      ElementFactory = ElementFactory || require('./element-factory').default;
      this.elements.push(ElementFactory.create(this, element));
    }
  }

  get allElements() {
    return this._flattenElements(this.elements);
  }

  get elementsByKey() {
    if (this._elementsByKey == null) {
      this._elementsByKey = this._flattenElementsByAttribute(this.elements, 'key');
    }

    return this._elementsByKey;
  }

  get elementsByDataName() {
    if (this._elementsByDataName == null) {
      this._elementsByDataName = this._flattenElementsByAttribute(this.elements, 'dataName');
    }

    return this._elementsByDataName;
  }

  elementsOfType(type) {
    const result = [];

    for (const element of this.allElements) {
      if (element.type === type) {
        result.push(element);
      }
    }

    return result;
  }

  _flattenElements(elements) {
    let flat = [];

    for (let element of elements) {
      flat.push(element);

      if (element.elements) {
        flat = flat.concat(this._flattenElements(element.elements));
      }
    }

    return flat;
  }

  _flattenElementsByAttribute(elements, attr) {
    const flat = {};

    for (let element of elements) {
      flat[element[attr]] = element;

      if (element.elements) {
        const children = this._flattenElementsByAttribute(element.elements, attr);

        for (let key of Object.keys(children)) {
          flat[key] = children[key];
        }
      }
    }

    return flat;
  }
}
exports.default = ChildElements;
//# sourceMappingURL=child-elements.js.map