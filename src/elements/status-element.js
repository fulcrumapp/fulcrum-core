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

    this._statusFilter = null;

    this._choices = [];

    if (attrs.choices) {
      for (const choice of attrs.choices) {
        this._choices.push(new StatusChoice(choice));
      }
    }

    this._enabled = !!attrs.enabled;
    this._readOnly = !!attrs.read_only;
  }

  get choices() {
    return this.filteredChoices;
  }

  get isEnabled() {
    return this._enabled;
  }

  get isReadOnly() {
    return this._readOnly;
  }

  get statusFilter() {
    return this._statusFilter;
  }

  set statusFilter(statusFilter) {
    this._statusFilter = statusFilter;
  }

  statusForValue(value) {
    for (const choice of this.choices) {
      if (choice.value === value) {
        return choice;
      }
    }

    return null;
  }

  get filteredChoices() {
    const items = this._choices;

    if (!this.statusFilter) {
      return items;
    }

    const filteredItems = [];

    for (const item of items) {
      for (const filter of this.statusFilter) {
        if (item.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
          filteredItems.push(item);
        }
      }
    }

    return filteredItems;
  }

  get overrideValues() {
    return Object.assign(super.overrideValues, {
      statusFilter: this._statusFilter
    });
  }

  resetOverrides() {
    super.resetOverrides();

    this._statusFilter = null;
  }
}
