import TextualElement from './textual-element';
import DisplayOptions from './display-options';

export default class CalculatedElement extends TextualElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.expression = attributes.expression;
    this.display = new DisplayOptions(attributes.display);
  }

  static findCalculatedElementRoot(form, container) {
    if (container.type != null) {
      if (container.isSectionElement) {
        return CalculatedElement.findCalculatedElementRoot(form, container.parent);
      } else if (container.isRepeatableElement) {
        return container;
      }
    }
    return form;
  }

  static findCalculatedElementsForContainer(container) {
    let elements = [];

    for (let element of container.elements) {
      if (element.isCalculatedElement) {
        elements.push(element);
      } else if (element.isSectionElement) {
        elements = elements.concat(CalculatedElement.findCalculatedElementsForContainer(element));
      }
    }

    return elements;
  }
}
