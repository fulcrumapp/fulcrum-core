import TextualElement from './textual-element';
import Choice from './choice';

export default class YesNoElement extends TextualElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.positiveChoice = new Choice(attributes.positive);

    this.negativeChoice = new Choice(attributes.negative);

    this.neutralChoice = new Choice(attributes.neutral);

    this.neutralEnabled = !!attributes.neutral_enabled;
  }

  toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      positive: this.positiveChoice.toJSON(),
      negative: this.negativeChoice.toJSON(),
      neutral: this.neutralChoice.toJSON(),
      neutral_enabled: !!this.neutralEnabled,
      default_previous_value: !!this._defaultPreviousValue
    };
  }
}
