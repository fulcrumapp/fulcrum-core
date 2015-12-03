import ContainerElement from './container-element';

export default class SectionElement extends ContainerElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.display = attributes.display;
  }

  get isDrillDown() {
    return this.display === 'drill-down';
  }

  get isInline() {
    return this.display === 'inline';
  }
}
