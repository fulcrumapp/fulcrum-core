import ContainerElement from './container-element';

export default class RepeatableElement extends ContainerElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.titleFieldKeys = attributes.title_field_keys || [attributes.title_field_key];

    this._geometryTypes = attributes.geometry_types;

    this._geometryRequired = !!attributes.geometry_required;
  }

  get isGeometryEnabled() {
    return this._geometryTypes && this._geometryTypes.length > 0;
  }

  get isGeometryRequired() {
    return this.isGeometryEnabled && this._geometryRequired;
  }

  get isLengthValidationSupported() {
    return true;
  }
}
