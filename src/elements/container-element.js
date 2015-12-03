import Element from './element';
import ChildElements from './child-elements';

export default class ContainerElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.createChildElements(attributes.elements);
  }
}

ChildElements.includeInto(ContainerElement);
