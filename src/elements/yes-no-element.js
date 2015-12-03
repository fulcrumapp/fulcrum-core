import TextualElement from './textual-element';

export default class YesNoElement extends TextualElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.positiveChoice = attributes.positive;

    this.negativeChoice = attributes.negative;

    this.neutralChoice = attributes.neutral;

    this.neutralEnabled = !!attributes.neutral_enabled;
  }
}
