import Classification from './elements/choice';

export default class ClassificationSet {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.items = [];

    if (attributes.items) {
      for (let item of attributes.items) {
        this.items.push(new Classification(item));
      }
    }
  }
}

