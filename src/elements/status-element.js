import TextualElement from './textual-element';
import StatusChoice from './status-choice';

const DEFAULT_STATUS_ELEMENT = {
  label: 'Status',
  key: '@status',
  data_name: 'status',
  enabled: false,
  read_only: false,
  choices: []
};

export default class StatusElement extends TextualElement {
  constructor(parent, attributes) {
    attributes.type = 'StatusField';

    const attrs = Object.assign({}, DEFAULT_STATUS_ELEMENT, attributes);

    super(parent, attrs);

    this.choices = [];

    for (const choice of attrs.choices) {
      this.choices.push(new StatusChoice(choice));
    }

    this._enabled = !!attrs.enabled;
    this._readOnly = !!attrs.read_only;
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
