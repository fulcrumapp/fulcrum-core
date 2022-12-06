import Element from './element';

export default class ButtonElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.buttonType = attributes.button_type;
  }
}
