import Element from './element';
import Classification from './classification';

export default class ClassificationElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.allowOther = !!attributes.allow_other;

    this._classificationFilter = null;

    this._overrideClassificationItems = null;

    this._classificationSetID = attributes.classification_set_id;
  }

  load(dataSource, callback) {
    dataSource.getClassificationSet(this._classificationSetID, (err, classificationSet) => {
      // TODO(zhm) Some forms have orphaned classification sets (life sucks)
      // Maybe we should add a parameter to the load() method to throw
      // errors.
      if (err) {
        return callback(err);
      }

      this.classificationSet = classificationSet;

      return callback();
    });
  }

  get classificationItems() {
    return this._overrideClassificationItems ? this._overrideClassificationItems : this.filteredClassifications;
  }

  get classificationFilter() {
    return this._classificationFilter;
  }

  set classificationFilter(classificationFilter) {
    this._classificationFilter = classificationFilter;
  }

  set overrideClassificationItems(overrideClassificationSetItems) {
    if (!overrideClassificationSetItems || overrideClassificationSetItems.length < 1) {
      this._overrideClassificationItems = null;
      return;
    }

    const classificationItems = [];

    for (const classificationAttributes of overrideClassificationSetItems) {
      const classification = new Classification(null, classificationAttributes);

      classificationItems.push(classification);
    }

    this._overrideClassificationItems = classificationItems;
  }

  get overrideValues() {
    return Object.assign(Object.getOwnPropertyDescriptor(Element.prototype, 'overrideValues').get.call(this), {
      classificationFilter: this._classificationFilter,
      overrideClassificationItems: this._overrideClassificationItems
    });
  }

  resetOverrides() {
    super.resetOverrides();

    this._classificationFilter = null;
    this._overrideClassificationItems = null;
  }

  get filteredClassifications() {
    if (!this.classificationSet) {
      return [];
    }

    const items = this.classificationSet.items;

    if (!this.classificationFilter) {
      return items;
    }

    const filteredItems = [];

    if (items) {
      for (const item of items) {
        for (const filter of this.classificationFilter) {
          if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
            filteredItems.push(item);
          }
        }
      }
    }

    return filteredItems;
  }
}
