import Element from './element';
import ChildElements from './child-elements';

export default class ContainerElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.createChildElements(attributes.elements);
  }

  resetOverrides() {
    super.resetOverrides();

    for (const element of this.elements) {
      element.resetOverrides();
    }
  }
}

ChildElements.includeInto(ContainerElement);
