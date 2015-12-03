import Element from './element';

export default class ClassificationElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.classificationSetID = attributes.classification_set_id;

    this.allowOther = !!attributes.allowOther;
  }
}
