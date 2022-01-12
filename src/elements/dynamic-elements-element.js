import Element from './element';

export default class DynamicElementsElement extends Element {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.positiveChoice = attributes.positive;

    this.negativeChoice = attributes.negative;

    this.neutralChoice = attributes.neutral;

    this.neutralEnabled = !!attributes.neutral_enabled;
  }
}
