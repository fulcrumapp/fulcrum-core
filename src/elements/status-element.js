import TextualElement from './textual-element';

export default class StatusElement extends TextualElement {
  constructor(parent, attributes) {
    super(parent, attributes);

    this.choices = attributes.choices;

    this.enabled = attributes.enabled;

    this.readOnly = !!attributes.read_only;
  }

  statusForValue(value) {
    throw new Error('Not implemented');
  }
}
