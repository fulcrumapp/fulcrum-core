import TextualElement from './textual-element';
import StatusChoice from './status-choice';

export default class StatusElement extends TextualElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.choices = [];

    for (const choice of attributes.choices) {
      this.choices.push(new StatusChoice(choice));
    }

    this._enabled = !!attributes.enabled;
    this._readOnly = !!attributes.read_only;
  }

  get isEnabled() {
    return this._enabled;
  }

  get isReadOnly() {
    return this._readOnly;
  }

  statusForValue(value) {
    for (const choice of this.choices) {
      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  }
}
