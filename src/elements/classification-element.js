import Element from './element';
import ElementFactory from './element-factory';
import Classification from './classification';

export default class ClassificationElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.allowOther = !!attributes.allowOther;
    this.choiceFilter = null;

    this._overrideClassificationItems = null;

    this._classificationSetID = attributes.classification_set_id;

    if (this._classificationSetID) {
      this.classificationSet = ElementFactory.getProvider().getClassificationSet(this._classificationSetID);
    }
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
      const classification = new Classification(null, classificationAttributes);

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
