import ContainerElement from './container-element';

export default class RepeatableElement extends ContainerElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.titleFieldKeys = attributes.title_field_keys;

    this.geometryTypes = attributes.geometry_types;

    this.geometryRequired = !!attributes.geometry_required;
  }
}
