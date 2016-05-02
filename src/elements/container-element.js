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

  static initialize() {
    // this is a bit of a hack to get around circular dependencies. This gets
    // called once from within the factory to setup the class. Putting this
    // at global scope introduces circular dependency errors because ChildElements
    // ends up loading the factory.
    ChildElements.includeInto(ContainerElement);
  }
}
