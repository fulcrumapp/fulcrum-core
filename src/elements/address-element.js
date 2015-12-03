import Element from './element';

export default class AddressElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.autoPopulate = !!attributes.auto_populate;
  }
}
