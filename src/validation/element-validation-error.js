export default class ElementValidationError {
  constructor(element) {
    this.element = element;
  }

  get label() {
    const parents = [];

    let iterator = this.element.parent;

    while (iterator) {
      parents.push(iterator.label);

      iterator = iterator.parent;
    }

    const parentLabels = parents.reverse().concat([this.element.label]);

    return parentLabels.join(' / ');
  }
}
